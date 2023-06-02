"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTurnsandHours = exports.transformarStringtoArray = void 0;
const transformarStringtoArray = (cadena) => {
    const resultado = JSON.parse(cadena.replace(/'/g, '"'));
    return resultado;
};
exports.transformarStringtoArray = transformarStringtoArray;
const getTurnsandHours = (horaIn, horaOut, intervaloMesa) => {
    const horaI = parseInt(horaIn.split(':')[0], 10);
    const horaO = parseInt(horaOut.split(':')[0], 10);
    const turnos = Math.trunc((horaO - horaI) / intervaloMesa);
    return { horaI, horaO, turnos };
};
exports.getTurnsandHours = getTurnsandHours;
//# sourceMappingURL=others.js.map