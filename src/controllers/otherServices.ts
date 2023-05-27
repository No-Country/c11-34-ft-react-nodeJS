import { Request, Response } from 'express'

const getCoordenadas = async (req: Request, res: Response) => {
  try {
    const data = req.body
    if (!data.direccion) {
      return res.status(400).json({
        msg: 'No se ha enviado la direccion'
      })
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      data.direccion
    )}.json?access_token=${process.env.MORFI_MAP_KEY}`
    console.log(url)
    const response = await fetch(url)
    if (!response.ok) {
      return res.status(400).json({
        msg: 'No se ha encontrado la direccion'
      })
    }
    const dir = await response.json()
    const { features } = dir
    const [lng, lat] = features[0].center
    //console.log({ features:features[0], lng, lat })
    res.json({
      lng,
      lat,
      direccion: features[0].place_name
    })
  } catch (error) {
    console.log('error al obtener coordenadas')
    console.log(error);
  }
}

const restController = {
  getCoordenadas
}

export default restController
