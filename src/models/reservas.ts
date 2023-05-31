import { model, Schema } from 'mongoose'
import { Reservas } from '../interfaces/modelInterfaces'

const reservasSchema = new Schema<Reservas>({
  hora: {
    type: Number,
    required: [true, 'La hora es obligatoria']
  },
  personas: {
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
  correo_usuario: {
    type: String,
    required: [true, 'El correo es obligatorio']
  },
  id_restaurante: {
    type: String,
    required: [true, 'El id del restaurante es obligatorio']
  }
})

export default model<Reservas>('Reservas', reservasSchema)
