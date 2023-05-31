"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRestaurant = void 0;
const turnos_1 = __importDefault(require("../models/turnos"));
const postRestaurant = async (req, res) => {
    try {
        const { id_restaurante, id_usuario, reservas, capacidadMax, horaApertura, duracionRes, personasPorMesa, horaCierre } = req.body;
        const turno = new turnos_1.default({
            id_restaurante,
            id_usuario,
            reservas,
            capacidadMax,
            horaApertura,
            duracionRes,
            personasPorMesa,
            horaCierre
        });
        await turno.save();
        res.json({
            msg: 'postRestaurant'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error
        });
    }
};
exports.postRestaurant = postRestaurant;
//# sourceMappingURL=restController.js.map