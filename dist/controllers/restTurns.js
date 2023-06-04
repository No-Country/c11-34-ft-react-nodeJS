"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turnos_1 = __importDefault(require("../models/turnos"));
const reservas_1 = __importDefault(require("../models/reservas"));
const places_1 = require("../helpers/places");
const obtenerFechaAnterior_1 = require("../helpers/obtenerFechaAnterior");
const others_1 = require("../helpers/others");
const getTurns = async (req, res) => {
    try {
        const { id_restaurante, fecha, turno } = req.query;
        const datosTurno = await turnos_1.default.findOne({ id_restaurante });
        if (!datosTurno) {
            return res.status(400).json({
                msg: 'No se encontró el restaurante,verifique el id del restaurant'
            });
        }
        const disponibilidad = await (0, places_1.getPlaces)(datosTurno, fecha, turno);
        if (!datosTurno.reservas[fecha]) {
            datosTurno.reservas[fecha] = datosTurno.reservas['fecha'];
        }
        const fechaCompleta = (0, obtenerFechaAnterior_1.obtenerFechaAnterior)(2);
        if (datosTurno.reservas[fechaCompleta]) {
            delete datosTurno.reservas[fechaCompleta];
        }
        const modelTurnos = await turnos_1.default.findByIdAndUpdate(datosTurno._id, datosTurno);
        if (!modelTurnos) {
            res.status(400).json({
                msg: 'Error al obtener la reserva'
            });
        }
        modelTurnos?.save();
        if (!disponibilidad.disponible) {
            return res.status(400).json({
                msg: 'Turno no disponible'
            });
        }
        res.json(disponibilidad);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener turnos disponibles',
            error
        });
    }
};
const postTurns = async (req, res) => {
    try {
<<<<<<< HEAD
        res.json({
            msg: 'postTurns'
=======
        const { id_restaurante, correoComensal, turno, comensales, fecha } = req.body;
        const data = await turnos_1.default.findOne({ id_restaurante });
        if (!data) {
            return res.status(404).json({
                msg: 'No se encontró el restaurante,verifique el id del restaurant'
            });
        }
        if (!data.reservas[fecha]) {
            return res.status(404).json({
                msg: 'No se encontró la fecha, verifique la fecha'
            });
        }
        const horaNumber = data.horaApertura + data.duracionRes * turno;
        const hora = (0, others_1.getHoursinString)(horaNumber);
        const dataReservas = await reservas_1.default.findOne({
            id_restaurante,
            fecha,
            correoComensal
        });
        if (dataReservas) {
            return res.status(400).json({
                msg: 'Error al reservar, ya tienes una reserva registrada para esa fecha'
            });
        }
        const disponibilidad = await (0, places_1.getPlaces)(data, fecha, turno);
        if (!disponibilidad.disponible) {
            return res.status(400).json({
                msg: 'Error al reservar, no hay lugares disponibles'
            });
        }
        const { disponible } = disponibilidad;
        if (disponible < comensales) {
            return res.status(400).json({
                msg: 'Error al reservar, no hay lugares disponibles'
            });
        }
        const cantPersonasARegistrar = (Math.ceil((comensales / data.personasPorMesa)) * data.personasPorMesa);
        data.reservas[fecha][turno] -= cantPersonasARegistrar;
        const modelTurnos = await turnos_1.default.findByIdAndUpdate(data._id, data);
        modelTurnos?.save();
        const reserva = await reservas_1.default.create({
            hora,
            nombre: data.nombre,
            comensales,
            fecha,
            correoComensal,
            id_restaurante
        });
        await reserva.save();
        const { _id } = reserva;
        res.json({
            msg: 'Reserva creada con éxito',
            reserva: {
                nombreRest: data.nombre,
                hora,
                comensales,
                fecha,
                correoComensal,
                idReserva: _id
            }
>>>>>>> gian
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
};
const restTurns = {
    getTurns,
    postTurns
};
exports.default = restTurns;
//# sourceMappingURL=restTurns.js.map