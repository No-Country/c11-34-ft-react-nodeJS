"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const turnoSchema = new mongoose_1.Schema({
    id_restaurante: {
        type: String,
        required: [true, 'El id del restaurante es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El id del usuario es obligatorio']
    },
    reservas: {
        type: Object,
        required: [true, 'Las reservas son obligatorias']
    },
    capacidadMax: {
        type: Number,
        required: [true, 'La capacidad maxima es obligatoria']
    },
    horaApertura: {
        type: Number,
        required: [true, 'La hora de apertura es obligatoria']
    },
    horaCierre: {
        type: Number,
        required: [true, 'La hora de cierre es obligatoria']
    },
    duracionRes: {
        type: Number,
        required: [true, 'La duracion de la reserva es obligatoria']
    },
    personasPorMesa: {
        type: Number,
        required: [true, 'El numero de personas por mesa es obligatorio']
    }
});
exports.default = (0, mongoose_1.model)('Turno', turnoSchema);
//# sourceMappingURL=turnos.js.map