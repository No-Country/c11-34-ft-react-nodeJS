import { Request, Response } from 'express'
import Reservas from '../models/reservas'
import turnos from '../models/turnos'

const getReserv = async (req: Request, res: Response) => {
  try {
    const { correo } = req.query
    const reservas = await Reservas.find({ correoComensal: correo })
    if (reservas.length === 0 || !reservas) {
      return res
        .status(404)
        .json({ msg: 'No se encontraron reservas, verificar el correo' })
    }

    res.status(200).json({
      msg: 'Reservas obtenidas exitosamente',
      reservas
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al obtener las reservas',
      error
    })
  }
}

// todo editar reservas
// * al editar la cantidad de personas medir la dimension del array

//todo eliminar reservas
//* al eliminar devolver el valor al array
const deleteReserv = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const reserva = await Reservas.findById(id)

    if (!reserva) {
      return res.status(404).json({
        msg: 'No se encontró la reserva , verifique el ID'
      })
    }

    const { id_restaurante, fecha, turno, comensales } = reserva

    const [turnoRest] = await turnos.find({ id_restaurante })

    if (!turnoRest) {
      return res.status(404).json({
        msg: 'No se encontró el restaurante'
      })
    }

    //definimos la cantidad de sillas que tomo la reserva
    const cantidad = (Math.ceil(
      (comensales / turnoRest.personasPorMesa) as number
    ) * turnoRest.personasPorMesa) as number

    //actualizamos el array de reservas
    turnoRest.reservas[fecha][turno] += cantidad

    //actualizamos las reservas antes de eliminar
    await turnos.findByIdAndUpdate(turnoRest._id, {
      reservas: turnoRest.reservas
    })

    //eliminamos el registro de la reserva
    await Reservas.findByIdAndDelete(id)

    res.status(200).json({ msg: 'reserva eliminada Correctamente' })
    //await Reservas.findByIdAndDelete(id)
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al eliminar la reserva',
      error
    })
  }
}
const reservController = { getReserv, deleteReserv }

export default reservController
