"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservas_1 = __importDefault(require("../models/reservas"));
const getReserv = async (req, res) => {
    try {
        const { correo } = req.query;
        const reservas = await reservas_1.default.find({ correo });
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
const reservController = { getReserv };
exports.default = reservController;
//# sourceMappingURL=reservController.js.map