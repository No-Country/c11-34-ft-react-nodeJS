import { model, Schema } from 'mongoose'
import { Reservas } from '../interfaces/modelInterfaces'

const reservasSchema = new Schema<Reservas>({
  hora: {
    type: String,
    required: [true, 'La hora es obligatoria']
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  comensales: {
    type: Number,
    required: [true, 'La cantidad de personas es obligatoria']
  },
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria']
  },
  estado: {
    type: [String],
    default: ['confirmada'],
    enum: ['confirmada', 'cancelada']
  },
  correoComensal: {
    type: String,
    required: [true, 'El correo es obligatorio']
  },
  id_restaurante: {
    type: String,
    required: [true, 'El id del restaurante es obligatorio']
  }
})

export default model<Reservas>('Reservas', reservasSchema)
