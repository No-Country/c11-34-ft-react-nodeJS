"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservasSchema = new mongoose_1.Schema({
    hora: {
        type: String,
        required: [true, 'La hora es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    comensales: {
        type: Number,
        required: [true, 'La cantidad de personas es obligatoria']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    estado: {
        type: [String],
        default: ['confirmada'],
        enum: ['confirmada', 'cancelada']
    },
    correoComensal: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    id_restaurante: {
        type: String,
        required: [true, 'El id del restaurante es obligatorio']
    },
    turno: {
        type: Number,
        required: [true, 'El turno es obligatorio']
    }
});
exports.default = (0, mongoose_1.model)('Reservas', reservasSchema);
//# sourceMappingURL=reservas.js.map