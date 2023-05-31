"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerFechaAnterior = void 0;
const obtenerCantidadDias = (month, year) => {
    const date = new Date(year, month, 0);
    return date.getDate();
};
const obtenerFechaAnterior = (dia) => {
    const diaActual = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const anio = new Date().getFullYear();
    let fechaCompleta = '';
    if (diaActual - dia === 0 && mes === 1) {
        fechaCompleta = `${obtenerCantidadDias(12, anio - 1)}/12/${anio - 2001}`;
    }
    else if (diaActual - dia === 0) {
        const m_text = mes - 1 < 10 ? `0${mes - 1}` : mes - 1;
        fechaCompleta = `${obtenerCantidadDias(mes - 1, anio)}/${m_text}/${anio - 2000}`;
    }
    else {
        const d_text = diaActual - dia < 10 ? `0${diaActual - dia}` : diaActual - dia;
        const m_text = mes < 10 ? `0${mes}` : mes;
        fechaCompleta = `${d_text}/${m_text}/${anio - 2000}`;
    }
    return fechaCompleta;
};
exports.obtenerFechaAnterior = obtenerFechaAnterior;
//# sourceMappingURL=obtenerFechaAnterior.js.map