import { Request, Response } from 'express'
import Turnos from '../models/turnos'
import Usuario from '../models/usuario'
import Reservas from '../models/reservas'

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

const postTurns = async (req: Request, res: Response) => {
  try {
    const {
      id_restaurante,
      correoComensal: correo,
      turno,
      comensales,
      fecha
    } = req.body

    console.log({ id_restaurante, correo, turno, comensales, fecha })

    /* TODO 
    1. El usuario ya existe en la base de datos
    2. El negocio ya existe en la base de datos
    3. Verificar que el turno este disponible aún
    4. Verificar que el usuario no tenga una reserva en ese turno
    5. EN caso haya reserva, editar la cantidad de lugares disponibles del array de reservas de modelo TUrnos
    6. Devolver, nombre de restaurant, nombre de usuario, correo de usuario, fecha, hora, cantidad de personas, id de reserva

    */
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
