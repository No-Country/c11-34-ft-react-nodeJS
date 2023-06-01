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
  horarioIn: string
  horarioOut: string
  tipoComida: Array<string>
  mesas: number
  sillasPorMesa: number
  intervaloMesa: number
  descripcion: string
  caracteristicasPrinc: Array<string>
  otrosDetalles: Array<string>
  costoReserva: number
  cantidadComentarios: number
  imagenes: Array<string>
  turnos: Array<number>
}

export interface Turno {
  id_restaurante: string
  correo: string
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
