import { model, Schema } from 'mongoose'
import { Turno } from '../interfaces/modelInterfaces'

const turnoSchema: Schema<Turno> = new Schema({
  id_restaurante: {
    type: String,
    required: [true, 'El id del restaurante es obligatorio']
  },
  id_usuario: {
    type: String,
    required: [true, 'El id del usuario es obligatorio']
  },
  reservas: {
    type: Object,
    required: [true, 'Las reservas son obligatorias']
  },
  capacidadMax: {
    type: Number,
    required: [true, 'La capacidad maxima es obligatoria']
  },
  horaApertura: {
    type: Number,
    required: [true, 'La hora de apertura es obligatoria']
  },
  horaCierre: {
    type: Number,
    required: [true, 'La hora de cierre es obligatoria']
  },
  duracionRes: {
    type: Number,
    required: [true, 'La duracion de la reserva es obligatoria']
  },
  personasPorMesa: {
    type: Number,
    required: [true, 'El numero de personas por mesa es obligatorio']
  }
})

export default model<Turno>('Turno', turnoSchema)
