import { Request, Response } from 'express'
import Turnos from '../models/turnos'
import Reservas from '../models/reservas'
import { ParsedQs } from 'qs'
import { getPlaces } from '../helpers/places'
import { obtenerFechaAnterior } from '../helpers/obtenerFechaAnterior'

const getTurns = async (req: Request, res: Response) => {
  try {
    const { id_restaurante, fecha, turno }: ParsedQs = req.query

    //buscamos los datos de los turnos del restaurante
    const data = await Turnos.findOne({ id_restaurante })

    if (!data) {
      return {
        msg: 'No se encontró el restaurante,verifique el id del restaurant'
      }
    }

    // obtenemos la disponibilidad de los turnos > {disponibilidad:number}
    const disponibilidad = await getPlaces(
      data,
      fecha as string,
      turno as string
    )

    // si no existe la fecha en la base reservada en la base de datos, la creamos
    if (!data.reservas[fecha as string]) {
      data.reservas[fecha as string] = data.reservas['fecha']
    }

    // devuelve la fecha de hace 2 dias
    const fechaCompleta = obtenerFechaAnterior(2)

    // elimina las reservas de hace 2 dias
    if (data.reservas[fechaCompleta]) {
      delete data.reservas[fechaCompleta]
    }

    // actualizar la base de datos (put )
    const modelTurnos = await Turnos.findByIdAndUpdate(data._id, data)
    modelTurnos?.save()

    // devolvemos las plazas disponibles
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
    const {
      id_restaurante,
      correoComensal,
      turno,
      hora,
      capPorMesa,
      comensales,
      fecha
    } = req.body

    const data = await Turnos.findOne({ id_restaurante })

    if (!data) {
      return {
        msg: 'No se encontró el restaurante,verifique el id del restaurant'
      }
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
      (comensales / capPorMesa) as number
    ) * capPorMesa) as number

    //actualizamos la cantidad de lugares disponibles
    data.reservas[fecha as string][turno] -= cantPersonasARegistrar

    // actualizar la base de datos (put )
    const modelTurnos = await Turnos.findByIdAndUpdate(data._id, data)
    modelTurnos?.save()

    // registrar la reserva en la base de datos

    const reserva = await Reservas.create({
      hora,
      comensales,
      fecha,
      correoComensal,
      id_restaurante
    })

    await reserva.save()

    const { _id } = reserva

    //devolvemos la reserva
    res.json({
      msg: 'Reserva creada con éxito',
      reserva: {
        hora,
        comensales,
        fecha,
        correoComensal,
        id: _id
      }
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear reserva',
      error
    })
  }
}

const restTurns = {
  getTurns,
  postTurns
}

export default restTurns
