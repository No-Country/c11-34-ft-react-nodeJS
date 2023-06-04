const obtenerCantidadDias = (month: number, year: number) => {
  const date = new Date(year, month, 0)
  return date.getDate()
}


export const obtenerFechaAnterior = (dia: number) => {
  //logica para eliminar las reservas de ayer comparandolas con el dia actual
  // ? obtenemos la fecha actual
  const diaActual = new Date().getDate() // Obtén el día y asegúrate de que tenga dos dígitos
  const mes = new Date().getMonth() + 1 // Obtén el mes (se cuenta desde 0) y asegúrate de que tenga dos dígitos
  const anio = new Date().getFullYear() // Obtén los últimos dos dígitos del año

  // funcion para calcular la cantidad ded dias de un mes

  let fechaCompleta = ''

  // definimos lñas condiciones para eliminar una fecha cada 2 dias
  if (diaActual - dia === 0 && mes === 1) {
    fechaCompleta = `${obtenerCantidadDias(12, anio - 1)}/12/${anio - 2001}`
  } else if (diaActual - dia === 0) {
    const m_text = mes - 1 < 10 ? `0${mes - 1}` : mes - 1
    fechaCompleta = `${obtenerCantidadDias(mes - 1, anio)}/${m_text}/${
      anio - 2000
    }`
  } else {
    const d_text =
      diaActual - dia < 10 ? `0${diaActual - dia}` : diaActual - dia
    const m_text = mes < 10 ? `0${mes}` : mes
    fechaCompleta = `${d_text}/${m_text}/${anio - 2000}`
  }

  return fechaCompleta
}
