import { Turno } from '../interfaces/modelInterfaces'

export const getPlaces = async (
    data: Turno ,
    date: string,
    turn: string
  ) => {
    const reservaDis: number = parseInt(turn as string)
    
    const cantReserva: Array<number> | undefined = data.reservas[date as string]
  
    if (!cantReserva) {
      return {
        disponible: data.reservas['fecha'][reservaDis]
      }
    }
  
    return { disponible: cantReserva[reservaDis] }
  }