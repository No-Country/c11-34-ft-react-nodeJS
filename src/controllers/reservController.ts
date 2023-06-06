import { Request, Response } from 'express'
import Reservas from '../models/reservas'

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
        msg: 'No se encontró la reserva'
      })
    }

    //const { fecha, hora, id_restaurante, comensales } = reserva

    //definir el turno a tarves de la hora

    //definir la cantidad de personas que se le suamaran al array
    //dependiendo de la mesa y las sillas

    //con el uturno arreglar el array

    await Reservas.findByIdAndDelete(id)
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al eliminar la reserva',
      error
    })
  }
}
const reservController = { getReserv, deleteReserv }

export default reservController
