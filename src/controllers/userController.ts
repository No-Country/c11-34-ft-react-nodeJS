/*
    * Archivo de controlador de la ruta /api/usuarios
    ? Aquí se definen los metodos para obtener y crear usuarios
*/

import { Request, Response } from 'express'
import UserModel from '../models/usuario'

export async function getUsers(req: Request, res: Response) {
  try {
    // ?buscar por correo a traves del body
    const { correo } = req.query

    if (correo) {
      console.log('----get User by correo----')
      const usuario = await UserModel.findOne({ correo })
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      return res.status(200).json(usuario)
    }

    // ?buscar todos los usuarios
    console.log('----get all Users----')
    const [total, usuarios] = await Promise.all([
      UserModel.countDocuments(),
      UserModel.find({})
    ])

    res.status(200).json({ total, usuarios })
  } catch (error) {
    res.status(400).json({
      data: 'Se presento un error al obtener la lista de Usuarios',
      error
    })
  }
}

export async function createUsers(req: Request, res: Response) {
  try {
    console.log('----create User----')
    const { nombre, correo, contrasena } = req.body

    // Verificar si el correo electrónico ya existe en la base de datos
    const usuarioExistente = await UserModel.findOne({ correo })

    if (usuarioExistente) {
      return res
        .status(409)
        .json({ mensaje: 'El correo electrónico ya está registrado' })
    }

    // Crear el nuevo usuario
    const user = new UserModel({ nombre, correo, contrasena })
    await user.save()

    return res
      .status(201)
      .json({ mensaje: 'El usuario ha sido creado correctamente' })
  } catch (error) {
    res.status(500).json({
      data: 'Se presento un error al crear el usuario',
      error
    })
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { nombre, correo, contrasena } = req.body

    const user = await UserModel.findByIdAndUpdate(
      id,
      { nombre, correo, contrasena },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    console.log('----Update Users----')
    return res
      .status(200)
      .json({ msg: `Usuario con id: ${id} actualizado exitosamente` })
  } catch (error) {
    res.status(500).json({
      data: 'Se presento un error al actualizar el usuario',
      error
    })
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    console.log('----Delete User----')
    const { id } = req.params

    const user = await UserModel.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({
      data: 'Se presento un error al eliminar el usuario',
      error
    })
  }
}


const userController = {
  getUsers,
  createUsers,
  updateUser,
  deleteUser
}

export default userController
