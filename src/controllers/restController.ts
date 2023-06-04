import { Request, Response } from 'express'
import Turnos from '../models/turnos'
import { transformarStringtoArray, getTurnsandHours } from '../helpers/others'
import fs from 'fs/promises'
import Restaurant from '../models/restaurant'
import { ImageMulter } from '../interfaces/modelInterfaces'
import { cloudinaryUpload } from '../helpers/cloudinaryUpload'
import Reservas from '../models/reservas'

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 100 } = req.query
    const restt = await Restaurant.find({ visible: true })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec()

    if (!restt) {
      return res.status(400).json({
        msg: 'No se encontraron restaurantes'
      })
    }
    res.status(200).json({
      msg: 'Lista de restaurantes',
      page,
      limit,
      total: restt.length,
      restt
    })
  } catch (error) {
    res.status(400).json({
      msg: 'Se presento un error al obtener la lista de restaurantes',
      error
    })
  }
}

const getRestaurantbyCorreo = async (req: Request, res: Response) => {
  try {
    const { correo } = req.query
    const restt = await Restaurant.find({ correo })

    if (!restt) {
      return res.status(400).json({
        msg: 'No se encontrao el restaurant'
      })
    }
    res.status(200).json({
      restt
    })
  } catch (error) {
    res.status(400).json({
      msg: 'Se presento un error al obtener el restaurant',
      error
    })
  }
}

const postRestaurant = async (req: Request, res: Response) => {
  // ! LOS DATOS SERAN ENVIADOS POR UN FORMDATA Y NO POR UN JSON
  const eliminarImagenLocal = fs.unlink

  try {
    const dataImg = req.files as Array<ImageMulter>
    const allData = await req.body

    //verificar que no exista
    const restaurantExistente = await Restaurant.findOne({
      nombre: allData.nombre,
      correo: allData.correo
    })

    if (restaurantExistente) {
      return res.status(409).json({
        msg: 'El restaurante con ese nombre ya existe'
      })
    }

    if (dataImg?.length === 0) {
      return res.status(400).json({
        msg: 'No se subio ninguna imagen'
      })
    }

    // TODO TRANSFORMAR STRING "[]" A ARRAY []
    allData.dias = transformarStringtoArray(allData.dias)
    allData.tipoComida = transformarStringtoArray(allData.tipoComida)
    allData.caracteristicasPrinc = transformarStringtoArray(
      allData.caracteristicasPrinc
    )
    allData.otrosDetalles = transformarStringtoArray(allData.otrosDetalles)

    // TODO OBTENER LA CANTIDAD DE TURNOS
    const { horaI, horaO, turnos } = getTurnsandHours(
      allData.horarioIn,
      allData.horarioOut,
      allData.intervaloMesa
    )

    // TODO CREAR RESERVAS
    const capacidadMax = allData.sillasPorMesa * allData.mesas
    const reservas = {
      fecha: Array(turnos).fill(capacidadMax)
    }

    // TODO SUBIR IMAGENES A CLOUDINARY
    const transformedUrl = await Promise.all(
      dataImg.map(async (element: ImageMulter) => {
        const transformedUrl = await cloudinaryUpload(element.path, 1000)
        return transformedUrl
      })
    )

    allData['imagenes'] = transformedUrl

    // TODO CREAR RESTAURANTE EN LA BASE DE DATOS
    // añadir turnos al modelo de restaurantes
    allData['turnos'] = turnos
    const restaurant = new Restaurant(allData)
    const { _id: id_restaurante } = restaurant

    await restaurant.save()

    // TODO CREAR TURNOS

    const turno = new Turnos({
      id_restaurante,
      nombre: allData.nombre,
      correo: allData.correo,
      reservas,
      capacidadMax,
      horaApertura: horaI,
      duracionRes: allData.intervaloMesa,
      personasPorMesa: allData.sillasPorMesa,
      horaCierre: horaO
    })

    // !esto no tiene nada que ver con el frontend
    if (!turno) {
      return res.status(400).json({
        msg: 'No se pudo crear el turnos, hable con soporte tecnico'
      })
    }

    await turno.save()

    // TODO ELIMINAR IMAGENES LOCALES
    await Promise.all(
      dataImg.map(async (element: ImageMulter) => {
        await eliminarImagenLocal(element.path)
      })
    )

    res.json({
      msg: 'creado correctamente'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear el restaurante, verificar que los datos sean correctos',
      error
    })
  }
}

const putRestaurant = async (req: Request, res: Response) => {
  try {
    console.log('----Update restaurant----')
    const { id } = req.params
    const data = req.body

    const restaurant = await Restaurant.findByIdAndUpdate(id, data, {
      new: true
    })

    if (!restaurant) {
      return res.status(404).json({ mensaje: 'Restautanre no encontrado' })
    }

    return res.status(200).json({
      msg: `Restaurante con id: "${id}" actualizado exitosamente`,
      restaurant
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al actualizar el retaurante',
      error
    })
  }
}

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    console.log('----Delete Restaurant----')
    const { id } = req.params

    // verificar si tiene reservas
    const reservas = await Reservas.findOne({ id_restaurante: id })
    if (reservas) {
      return res.status(400).json({
        msg: 'No se puede eliminar el restaurante porque tiene reservas, opcion ponerlo quitarle la visibilidad'
      })
    }

    const restaurant = await Restaurant.findByIdAndDelete(id)
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurante no encontrado' })
    }
    // eliminar turnos
    await Turnos.findOneAndDelete({ id_restaurante: id })
    return res.status(200).json({ msg: 'Restaurante eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({
      msg: 'Se presento un error al eliminar el restaurante',
      error
    })
  }
}

const restController = {
  getRestaurant,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
  getRestaurantbyCorreo
}

export default restController
