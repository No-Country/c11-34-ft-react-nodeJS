"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoursinString = exports.getTurnsandHours = exports.transformarStringtoArray = void 0;
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
const getHoursinString = (hora) => {
    const horaString = hora.toString();
    const horaString2 = horaString.length === 1 ? `0${horaString}:00` : `${horaString}:00`;
    return horaString2;
};
exports.getHoursinString = getHoursinString;
//# sourceMappingURL=others.js.map