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

const reservController = { getReserv }

export default reservController
