/*
    * Archivo de controlador de la ruta /api/auth
    ? Aquí se definen los metodos de acceso de usuarios
*/

import { Request, Response } from 'express'
import UserModel from '../models/usuario'
import { googleVerify } from '../helpers/google-verify'

interface usuarioEntry {
  nombre: string | undefined
  correo: string | undefined
  contrasena: string
  rol?: string
  estado?: boolean
  google?: boolean
  imagen?: string
}

export async function checkLogin(req: Request, res: Response) {
  try {
    const { correo, contrasena } = req.body
    console.log('-------------correo y password-------------')
    console.log(correo)
    console.log('provando provando provando')
    // Buscar el usuario por su correo electrónico
    const user = await UserModel.findOne({ correo })

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    if (contrasena !== user.contrasena) {
      return res
        .status(401)
        .json({ mensaje: 'La contrasena del usuario no coincide' })
    }
    return res.status(200).json({ mensaje: 'Ingreso exitoso' })
  } catch (error) {
    console.log('No se pudo obtener el usuario')
    console.log('-----------------------------')
    console.log(error)
    return res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

export const googleSignIn = async (req: Request, res: Response) => {
  const { id_token_google } = await req.body

  try {
    const { nombre, correo, imagen } = await googleVerify(id_token_google)

    const usuario = await UserModel.findOne({ correo })

    //si el usuario no existe, lo creo
    if (!usuario) {
      const data: usuarioEntry = {
        nombre,
        correo,
        contrasena: '...',
        imagen,
        google: true
      }

      const usuario = new UserModel(data)
      await usuario.save()
    }

    //si el usuario fue eliminado, lo notifico
    if (!usuario?.estado) {
      return res.status(401).json({
        error: 'Usuario bloqueado, contacte al administrador'
      })
    }

    res.status(200).json({
      mensaje: 'Ingreso exitoso',
      id_token_google,
      usuario
    })
  } catch (e) {
    res.json({ error: 'error google' })
  }
}
