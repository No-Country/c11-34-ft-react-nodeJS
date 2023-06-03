export const transformarStringtoArray = (cadena: string) => {
  const resultado = JSON.parse(cadena.replace(/'/g, '"'))
  return resultado
}


export const getTurnsandHours = (
  horaIn: string,
  horaOut: string,
  intervaloMesa: number
) => {
  const horaI = parseInt(horaIn.split(':')[0], 10)
  const horaO = parseInt(horaOut.split(':')[0], 10)

  const turnos = Math.trunc((horaO - horaI) / intervaloMesa)

  return { horaI, horaO, turnos }
}

export const getHoursinString = (hora: number) => {
  const horaString = hora.toString()
  const horaString2 =
    horaString.length === 1 ? `0${horaString}:00` : `${horaString}:00`
  return horaString2
}
