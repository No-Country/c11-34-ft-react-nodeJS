import { Request, Response } from 'express'
import Turnos from '../models/turnos'

export const postRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      id_restaurante,
      id_usuario,
      reservas,
      capacidadMax,
      horaApertura,
      duracionRes,
      personasPorMesa,
      horaCierre
    } = req.body

    const turno = new Turnos({
      id_restaurante,
      id_usuario,
      reservas,
      capacidadMax,
      horaApertura,
      duracionRes,
      personasPorMesa,
      horaCierre
    })

    await turno.save()

    res.json({
      msg: 'postRestaurant'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error interno del servidor',
      error
    })
  }
}
