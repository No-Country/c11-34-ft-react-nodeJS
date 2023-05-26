/*
    * Archivo de controlador de la ruta /api/details
    ? Aquí se definen los detalles de los usuarios creados
*/

import { Request, Response } from 'express'
import fs from 'fs/promises'
import UserModel from '../models/usuario'
import cloud from '../helpers/cloudinaryUpload'

export async function uploadImage(req: Request, res: Response) {
  const eliminarImagenLocal = fs.unlink

  try {
    // obtener la imagen del formulario
    const dataImg = req.file
    const { correo } = req.body

    // validar que se haya enviado una imagen
    if (!dataImg?.path) {
      return res.status(400).json({ msg: 'no se ha enviado ninguna imagen' })
    }

    // validar que el usuario exista
    const usuario = await UserModel.findOne({ correo })

    if (!usuario) {
      return res.status(404).json({ msg: 'usuario no encontrado' })
    }

    // subir la imagen a cloudinary
    const result = await cloud.uploader.upload(dataImg.path)
    const { public_id } = result

    // transformar la imagen para que sea mas pequeña
    const transformedUrl = cloud.url(public_id, {
      width: 100,
      height: 100,
      crop: 'fill'
    })

    // actualizar el usuario.imagen con la url de la imagen
    usuario.imagen = transformedUrl
    await usuario.save()
    await eliminarImagenLocal(dataImg.path)
    return res
      .status(200)
      .json({ msg: 'imagen subida correctamente', url: transformedUrl })
  } catch (error) {
    return res.status(500).json({ msg: 'error al subir la imagen' })
  }
}

export async function addGustos (req: Request, res: Response) {
  const {gustos, correo} = req.body;

  try {
    const usuario = await UserModel.findOne({correo});
    console.log("datos de gusto de usuario------"+usuario);
    

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    usuario.gustos = gustos;
    usuario.save();

    res.json({ msg: 'gustos agregados' })
    
  } catch (error) {
    
    console.error('Error al actualizar los gustos:', error);
    return res.status(500).json({ mensaje: 'Error al actualizar los gustos' });

  }
}

const userDetails = {
  uploadImage,
  addGustos
}

export default userDetails
