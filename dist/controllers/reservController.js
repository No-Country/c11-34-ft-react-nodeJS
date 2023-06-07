"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservas_1 = __importDefault(require("../models/reservas"));
const restaurant_1 = __importDefault(require("../models/restaurant"));
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
const editReserv = async (req, res) => {
    try {
        const { id } = req.query;
        const { hora, comensales } = req.body;
        const reserva = await reservas_1.default.findById(id);
        if (!reserva) {
            return res.status(404).json({ msg: "No se ha encontrado reserva con ese id" });
        }
        ;
        const restaurante = await restaurant_1.default.findById(reserva.id_restaurante);
        const turno = await turnos_1.default.findOne({ id_restaurante: reserva.id_restaurante });
        if (!restaurante || !turno) {
            return res.status(404).json({ msg: "Se ha presentado un error" });
        }
        ;
        if (hora && comensales) {
            let espacioReserva = -1;
            let espacioReservaPrePut = -1;
            for (let i = 0; i < restaurante.turnos; i++) {
                const limiteInferior = turno.horaApertura + i * turno.duracionRes;
                const limiteSuperior = limiteInferior + turno.duracionRes;
                if (hora >= limiteInferior && hora < limiteSuperior) {
                    espacioReserva = i;
                    break;
                }
                ;
            }
            ;
            for (let i = 0; i < restaurante.turnos; i++) {
                const limiteInferior = turno.horaApertura + i * turno.duracionRes;
                const limiteSuperior = limiteInferior + turno.duracionRes;
                if (parseInt(reserva.hora.split(":")[0]) >= limiteInferior && parseInt(reserva.hora.split(":")[0]) < limiteSuperior) {
                    espacioReservaPrePut = i;
                    break;
                }
                ;
            }
            ;
            if (espacioReserva == -1 || espacioReservaPrePut == -1) {
                return res.status(400).json({ msg: "no se encontro un espacio de reserva" });
            }
            ;
            if (turno.reservas[reserva.fecha][espacioReserva] < comensales) {
                return res.status(400).json({ msg: "no hay espacio disponible para la reserva" });
            }
            ;
            console.log(`turno.reservas[${reserva.fecha}][${espacioReservaPrePut}]`);
            console.log("---------------" + turno.reservas[reserva.fecha][espacioReservaPrePut]);
            turno.reservas[reserva.fecha][espacioReservaPrePut] = (turno.reservas[reserva.fecha][espacioReservaPrePut] + (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
            console.log(`turno.reservas[${reserva.fecha}][${espacioReservaPrePut}]`);
            console.log("---------------" + turno.reservas[reserva.fecha][espacioReservaPrePut]);
            console.log(`turno.reservas[${reserva.fecha}][${espacioReserva}]`);
            console.log("---------------" + turno.reservas[reserva.fecha][espacioReserva]);
            turno.reservas[reserva.fecha][espacioReserva] = (turno.capacidadMax - (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
            console.log(`turno.reservas[${reserva.fecha}][${espacioReserva}]`);
            console.log("---------------" + turno.reservas[reserva.fecha][espacioReserva]);
            reserva.hora = `${hora}:00`;
            reserva.comensales = comensales;
            const reservas = turno.reservas;
            console.log(reservas);
            const turnoUpdate = await turnos_1.default.findByIdAndUpdate(turno._id, { reservas });
            await reserva.save();
            if (!turnoUpdate) {
                res.status(400).json({ msg: "se presento un problema actualizando el turno" });
            }
            ;
            return res.status(200).json({ msg: "Se actualizo la hora y los comensales de la reserva con exito" });
        }
        ;
        if (hora && !comensales) {
            let espacioReserva = -1;
            let espacioReservaPrePut = -1;
            for (let i = 0; i < restaurante.turnos; i++) {
                const limiteInferior = turno.horaApertura + i * turno.duracionRes;
                const limiteSuperior = limiteInferior + turno.duracionRes;
                if (hora >= limiteInferior && hora < limiteSuperior) {
                    espacioReserva = i;
                    break;
                }
                ;
            }
            ;
            for (let i = 0; i < restaurante.turnos; i++) {
                const limiteInferior = turno.horaApertura + i * turno.duracionRes;
                const limiteSuperior = limiteInferior + turno.duracionRes;
                if (parseInt(reserva.hora.split(":")[0]) >= limiteInferior && parseInt(reserva.hora.split(":")[0]) < limiteSuperior) {
                    espacioReservaPrePut = i;
                    break;
                }
                ;
            }
            ;
            if (espacioReserva == -1 || espacioReservaPrePut == -1) {
                return res.status(400).json({ msg: "no se encontro un espacio de reserva" });
            }
            ;
            if (turno.reservas[reserva.fecha][espacioReserva] < reserva.comensales) {
                return res.status(400).json({ msg: "no hay espacio disponible para la reserva" });
            }
            turno.reservas[reserva.fecha][espacioReservaPrePut] = (turno.capacidadMax + (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
            turno.reservas[reserva.fecha][espacioReserva] = (turno.capacidadMax - (Math.ceil((reserva.comensales / turno.personasPorMesa)) * turno.personasPorMesa));
            const reservas = turno.reservas;
            const turnoUpdate = await turnos_1.default.findByIdAndUpdate(turno._id, { reservas });
            reserva.hora = `${hora}:00`;
            await reserva.save();
            if (!turnoUpdate) {
                res.status(400).json({ msg: "se presento un problema actualizando el turno" });
            }
            ;
            return res.status(200).json({ msg: "Se actualizo la hora de la reserva con exito" });
        }
        ;
        if (!hora && comensales) {
            const horaReserva = parseInt(reserva.hora.split(":")[0]);
            let espacioReserva = -1;
            for (let i = 0; i < restaurante.turnos; i++) {
                const limiteInferior = turno.horaApertura + i * turno.duracionRes;
                const limiteSuperior = limiteInferior + turno.duracionRes;
                if (horaReserva >= limiteInferior && horaReserva < limiteSuperior) {
                    espacioReserva = i;
                    break;
                }
                ;
            }
            ;
            if (espacioReserva == -1) {
                return res.status(400).json({ msg: "no se encontro un espacio de reserva" });
            }
            ;
            if (turno.reservas[reserva.fecha][espacioReserva] < comensales) {
                return res.status(400).json({ msg: "no hay espacio disponible para la reserva" });
            }
            ;
            console.log(`turno.reservas[${reserva.fecha}][${espacioReserva}]`);
            console.log("---------------" + turno.reservas[reserva.fecha][espacioReserva]);
            turno.reservas[reserva.fecha][espacioReserva] = (turno.capacidadMax - (Math.ceil((comensales / turno.personasPorMesa)) * turno.personasPorMesa));
            console.log("---------------" + turno.reservas[reserva.fecha][espacioReserva]);
            reserva.comensales = comensales;
            await reserva.save();
            const reservas = turno.reservas;
            const turnoUpdate = await turnos_1.default.findByIdAndUpdate(turno._id, { reservas });
            if (!turnoUpdate) {
                res.status(400).json({ msg: "se presento un problema actualizando el turno" });
            }
            ;
            return res.status(200).json({ msg: "Se actualizo la hora de la reserva con exito" });
        }
        return res.status(400).json({ msg: "No se proporcionaron datos para actualizar" });
    }
    catch (error) {
        res.status(400).json({
            msg: "se presento un problema al actualizar la reserva",
            error
        });
    }
    ;
};
const reservController = {
    getReserv,
    editReserv
};
exports.default = reservController;
//# sourceMappingURL=reservController.js.map