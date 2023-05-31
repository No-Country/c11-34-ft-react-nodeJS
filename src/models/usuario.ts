import { Schema, model } from 'mongoose'
import { Usuario } from '../interfaces/modelInterfaces'

const usuarioSchema: Schema<Usuario> = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  gustos: {
    type: Array,
    default: []
  },
  rol: {
    type: String,
    default: 'USER_ROLE',
    enum: ['BUSS_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
  imagen: {
    type: String
  }
})

usuarioSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...usuario } = this.toObject()
  usuario.id = _id
  return usuario
}

export default model<Usuario>('Usuario', usuarioSchema)
