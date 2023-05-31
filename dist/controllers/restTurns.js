"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turnos_1 = __importDefault(require("../models/turnos"));
const getTurns = async (req, res) => {
    try {
        const { id_restaurante, fecha, turno } = req.query;
        const reservaDis = parseInt(turno);
        const TURNOS = await turnos_1.default.findOne({ id_restaurante });
        if (!TURNOS) {
            return res.status(400).json({
                msg: 'No se encontró el restaurante,verifique el id del restaurant'
            });
        }
        const cantReserva = TURNOS.reservas[fecha];
        if (!cantReserva) {
            return res.json({
                disponible: TURNOS.reservas['fecha'][reservaDis]
            });
        }
        res.json({
            disponible: cantReserva[reservaDis]
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener turnos disponibles',
            error
        });
    }
};
const postTurns = async (_req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al crear reserva',
            error
        });
    }
};
const restTurns = {
    getTurns,
    postTurns
};
exports.default = restTurns;
//# sourceMappingURL=restTurns.js.map