import { Request, Response } from 'express'
import { Usuario } from '../interfaces/modelInterfaces'
import UsuarioModel from '../models/usuario'

const getFavorites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const usuario: Usuario | null = await UsuarioModel.findById(id)

    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' })

    res.status(200).json({ fav: usuario.favoritos })
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener favoritos' })
  }
}

const putFavorites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { data } = req.body

    const usuario = await UsuarioModel.findById(id)

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' })
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({ msg: 'Datos no validos' })
    }
    usuario.favoritos = data

    await usuario.save()

    res.status(200).json({ msg: true })
  } catch (error) {
    res.status(500).json({ msg: 'Error al agregar favoritos' })
  }
}

const Favorites = {
  getFavorites,
  putFavorites
}

export default Favorites
