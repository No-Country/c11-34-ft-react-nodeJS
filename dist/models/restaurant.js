"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    dias: {
        type: [String],
        default: [
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
            'Domingo'
        ],
        maxlength: 7,
        minlength: 1,
        required: [true, 'Los dias son obligatorios']
    },
    horarioO: {
        type: String,
        required: [true, 'El horario de apertura es obligatorio']
    },
    horarioC: {
        type: String,
        required: [true, 'El horario de cierre es obligatorio']
    },
    tipoComida: {
        type: [String],
        required: [true, 'El tipo de comida es obligatorio']
    },
    mesas: {
        type: Number,
        required: [true, 'El numero de mesas es obligatorio']
    },
    lugares: {
        type: Number,
        required: [true, 'El numero de lugares es obligatorio']
    },
    duracionRes: {
        type: Number,
        required: [true, 'La duracion de la reserva es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    caracteristicas: {
        type: [String],
        required: [true, 'Las caracteristicas son obligatorias']
    },
    detalles: {
        type: [String],
        required: [true, 'Los detalles son obligatorios']
    },
    costo: {
        type: Number,
        required: [true, 'El costo es obligatorio']
    },
    id_usuario: {
        type: String,
        required: [true, 'El id del usuario es obligatorio']
    }
});
exports.default = (0, mongoose_1.model)('Restaurant', restaurantSchema);
//# sourceMappingURL=restaurant.js.map