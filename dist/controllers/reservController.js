"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservas_1 = __importDefault(require("../models/reservas"));
const turnos_1 = __importDefault(require("../models/turnos"));
const getReserv = async (req, res) => {
    try {
        const { correo } = req.query;
        const reservas = await reservas_1.default.find({ correoComensal: correo });
        if (reservas.length === 0 || !reservas) {
            return res
                .status(404)
                .json({ msg: 'No se encontraron reservas, verificar el correo' });
        }
        res.status(200).json({
            msg: 'Reservas obtenidas exitosamente',
            reservas
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Se presento un error al obtener las reservas',
            error
        });
    }
};
const deleteReserv = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservas_1.default.findById(id);
        if (!reserva) {
            return res.status(404).json({
                msg: 'No se encontró la reserva , verifique el ID'
            });
        }
        const { id_restaurante, fecha, turno, comensales } = reserva;
        const [turnoRest] = await turnos_1.default.find({ id_restaurante });
        if (!turnoRest) {
            return res.status(404).json({
                msg: 'No se encontró el restaurante'
            });
        }
        const cantidad = (Math.ceil((comensales / turnoRest.personasPorMesa)) * turnoRest.personasPorMesa);
        turnoRest.reservas[fecha][turno] += cantidad;
        await turnos_1.default.findByIdAndUpdate(turnoRest._id, {
            reservas: turnoRest.reservas
        });
        await reservas_1.default.findByIdAndDelete(id);
        res.status(200).json({ msg: 'reserva eliminada Correctamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Se presento un error al eliminar la reserva',
            error
        });
    }
};
const reservController = { getReserv, deleteReserv };
exports.default = reservController;
//# sourceMappingURL=reservController.js.map