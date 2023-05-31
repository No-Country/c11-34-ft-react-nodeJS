import { Request, Response } from 'express'
import Turnos from '../models/turnos'

const getTurns = async (req: Request, res: Response) => {
  try {
    const { id_restaurante, fecha, turno } = req.query

    const reservaDis: number = parseInt(turno as string)

    const TURNOS = await Turnos.findOne({ id_restaurante })

    if (!TURNOS) {
      return res.status(400).json({
        msg: 'No se encontró el restaurante,verifique el id del restaurant'
      })
    }

    const cantReserva: Array<number> | undefined =
      TURNOS.reservas[fecha as string]

    if (!cantReserva) {
      return res.json({
        disponible: TURNOS.reservas['fecha'][reservaDis]
      })
    }

    res.json({
      disponible: cantReserva[reservaDis]
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener turnos disponibles',
      error
    })
  }
}

const postTurns = async (_req: Request, res: Response) => {
  try {
    res.json({
      msg: 'postTurns'
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
