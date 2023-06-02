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
