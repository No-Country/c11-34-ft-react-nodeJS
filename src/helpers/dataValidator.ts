
import turnos from '../models/turnos'
import UserModel from '../models/usuario'

const emailExiste = async (correo: string): Promise<void> => {
  const existeEmail = await UserModel.findOne({ correo })
  if (existeEmail) {
    throw new Error(`El correo "${correo}" ya existe`)
  }
}

const idExiste = async (id: string): Promise<void> => {
  const existeUsuario = await UserModel.findById(id)
  if (!existeUsuario) {
    throw new Error(`El id "${id}" no existe`)
  }
}

const idTurnosExiste = async (id: string): Promise<void> => {
  const existeTurno = await turnos.findById(id)
  if (!existeTurno) {
    throw new Error(`El Turno con el id_restaurant="${id}" no existe`)
  }
}


const dataValidator = {
  emailExiste,
  idExiste
  ,idTurnosExiste
}

export default dataValidator
