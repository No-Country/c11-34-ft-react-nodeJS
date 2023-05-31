export interface Usuario {
  nombre: string
  correo: string
  contrasena: string
  rol: string
  estado: boolean
  google: boolean
  imagen: string
  gustos: Array<string> | undefined
}

export interface Restaurant {
  nombre: string
  direccion: string
  telefono: string
  correo: string
  dias: Array<string>
  horarioO: string
  horarioC: string
  tipoComida: Array<string>
  mesas: number
  lugares: number
  duracionRes: number
  descripcion: string
  caracteristicas: Array<string>
  detalles: Array<string>
  costo: number
  id_usuario: string
}

export interface Turno {
  id_restaurante: string
  id_usuario: string
  reservas: { [key: string]: Array<number> }
  capacidadMax: number
  horaApertura: number
  duracionRes: number
  personasPorMesa: number
  horaCierre: number
}

export interface Reservas {
  hora: string
  comensales: number
  fecha: string
  estado: Array<string>
  correoComensal: string
  id_restaurante: string
}
