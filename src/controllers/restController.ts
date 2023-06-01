import { Request, Response } from 'express'
//import Turnos from '../models/turnos'
//import fs from 'fs/promises'
//import cloud from '../helpers/cloudinaryUpload'

export const postRestaurant = async (req: Request, res: Response) => {
  // ! LOS DATOS SERAN ENVIADOS POR UN FORMDATA Y NO POR UN JSON
  //const eliminarImagenLocal = fs.unlink

  try {
    const dataImg = req.files
    const allData = req.body

    console.log({ dataImg })

    if (!dataImg) {
      return res.status(400).json({
        msg: 'No se subio ninguna imagen'
      })
    }

    // TRANSFORMAR STRING "[]" A ARRAY []
    const transformarStringtoArray = (cadena: string) => {
      const resultado = JSON.parse(cadena.replace(/'/g, '"'))
      return resultado
    }

    allData.dias = transformarStringtoArray(allData.dias)
    allData.tipoComida = transformarStringtoArray(allData.tipoComida)
    allData.caracteristicasPrinc = transformarStringtoArray(
      allData.caracteristicasPrinc
    )
    allData.otrosDetalles = transformarStringtoArray(allData.otrosDetalles)

    //OBTENER LA CANTIDAD DE TURNOS
    const horaI = parseInt(allData.horarioIn.split(':')[0], 10)
    const horaO = parseInt(allData.horarioOut.split(':')[0], 10)

    const capacidadMax = allData.sillasPorMesa * allData.mesas
    const turnos = Math.trunc((horaO - horaI) / allData.intervaloMesa)

    //CREAR RESERVAS
    const reservas = {
      fecha: Array(turnos).fill(capacidadMax)
    }

    console.log(allData)
    console.log({ horaI, horaO, capacidadMax, turnos, reservas })

    // const turno = new Turnos({
    //   id_restaurante,
    //   correo,
    //   reservas,
    //   capacidadMax,
    //   horaApertura,
    //   duracionRes,
    //   personasPorMesa,
    //   horaCierre
    // })

    // await turno.save()

    res.json({
      msg: 'postRestaurant'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear el restaurante, verificar que los datos sean correctos',
      error
    })
  }
}
