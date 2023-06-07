import { Request, Response } from 'express'
import Turnos from '../models/turnos'
import Reservas from '../models/reservas'
import { ParsedQs } from 'qs'
import { getPlaces } from '../helpers/places'
import { obtenerFechaAnterior } from '../helpers/obtenerFechaAnterior'
import { getHoursinString } from '../helpers/others'

const getTurns = async (req: Request, res: Response) => {
  try {
    const { id_restaurante, fecha, turno }: ParsedQs = req.query

    const datosTurno = await Turnos.findOne({ id_restaurante })
    if (!datosTurno) {
      return res.status(400).json({
        msg: 'No se encontró el restaurante,verifique el id del restaurant'
      })
    }

    // obtenemos la disponibilidad de los turnos > {disponibilidad:number}
    const disponibilidad = await getPlaces(
      datosTurno,
      fecha as string,
      turno as string
    )

    // si no existe la fecha en la base reservada en la base de datos, la creamos
    if (!datosTurno.reservas[fecha as string]) {
      datosTurno.reservas[fecha as string] = datosTurno.reservas['fecha']
    }

    // devuelve la fecha de hace 2 dias
    const fechaCompleta = obtenerFechaAnterior(2)

    // elimina las reservas de hace 2 dias
    if (datosTurno.reservas[fechaCompleta]) {
      delete datosTurno.reservas[fechaCompleta]
    }

    // actualizar la base de datos (put )
    const modelTurnos = await Turnos.findByIdAndUpdate(
      datosTurno._id,
      datosTurno
    )

    if (!modelTurnos) {
      res.status(400).json({
        msg: 'Error al obtener la reserva'
      })
    }

    modelTurnos?.save()

    // devolvemos las plazas disponibles
    if (!disponibilidad.disponible) {
      return res.status(400).json({
        msg: 'Turno no disponible'
      })
    }

    res.json(disponibilidad)
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener turnos disponibles',
      error
    })
  }
}

// !-------------------------------------------------------------------
// ?-------------------------------------------------------------------
// !-------------------------------------------------------------------

const postTurns = async (req: Request, res: Response) => {
  try {
    const { id_restaurante, correoComensal, turno, comensales, fecha } =
      req.body

    const data = await Turnos.findOne({ id_restaurante })

    if (!data) {
      return res.status(404).json({
        msg: 'No se encontró el restaurante,verifique el id del restaurant'
      })
    }

    if (!data.reservas[fecha as string]) {
      return res.status(404).json({
        msg: 'No se encontró la fecha, verifique la fecha'
      })
    }

    //obtener la hora de la reserva
    const horaNumber = data.horaApertura + data.duracionRes * turno
    const hora = getHoursinString(horaNumber)

    const existeOtherReserv = await Reservas.findOne({
      hora,
      fecha,
      correoComensal
    })

    if (existeOtherReserv) {
      return res.status(400).json({
        msg: 'Ya tienes una reserva para esa hora'
      })
    }

    //verificar si ya reservo la misma persona a la misma hora
    const dataReservas = await Reservas.findOne({
      id_restaurante,
      fecha,
      correoComensal
    })

    if (dataReservas) {
      return res.status(400).json({
        msg: 'Error al reservar, ya tienes una reserva registrada para esa fecha'
      })
    }

    //objeto con lugar disponible
    const disponibilidad = await getPlaces(
      data,
      fecha as string,
      turno as string
    )

    //verificar que exista .disponible
    if (!disponibilidad.disponible) {
      return res.status(400).json({
        msg: 'Error al reservar, no hay lugares disponibles'
      })
    }

    const { disponible } = disponibilidad

    // verificamos que el lugar disponible sea mayor a la cantidad de personas
    if (disponible < comensales) {
      return res.status(400).json({
        msg: 'Error al reservar, no hay lugares disponibles'
      })
    }

    //actualizamos la cantidad de personas a un multiplo de personas por mesa
    const cantPersonasARegistrar = (Math.ceil(
      (comensales / data.personasPorMesa) as number
    ) * data.personasPorMesa) as number
    //actualizamos la cantidad de lugares disponibles

    data.reservas[fecha as string][turno as number] -= cantPersonasARegistrar

    // actualizar la base de datos (put )
    const modelTurnos = await Turnos.findByIdAndUpdate(data._id, data)
    modelTurnos?.save()

    // registrar la reserva en la base de datos

    const reserva = await Reservas.create({
      hora,
      nombre: data.nombre,
      comensales,
      fecha,
      correoComensal,
      id_restaurante,
      turno
    })

    await reserva.save()

    const { _id } = reserva

    //devolvemos la reserva
    res.json({
      msg: 'Reserva creada con éxito',
      reserva: {
        nombreRest: data.nombre,
        hora,
        comensales,
        fecha,
        correoComensal,
        idReserva: _id
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: error
    })
  }
}

const restTurns = {
  getTurns,
  postTurns
}

export default restTurns
