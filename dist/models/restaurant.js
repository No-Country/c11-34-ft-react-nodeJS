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
        required: [true, 'El correo es obligatorio'],
        unique: true
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
    horarioIn: {
        type: String,
        required: [true, 'El horario de apertura es obligatorio']
    },
    horarioOut: {
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
    sillasPorMesa: {
        type: Number,
        required: [true, 'El numero de sillas por mesa es obligatorio']
    },
    intervaloMesa: {
        type: Number,
        required: [true, 'El intervalo de mesa es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    caracteristicasPrinc: {
        type: [String],
        required: [true, 'Las caracteristicas principales son obligatorias']
    },
    otrosDetalles: {
        type: [String],
        required: [true, 'Los otros detalles son obligatorios']
    },
    costoReserva: {
        type: Number,
        default: 0
    },
    cantidadComentarios: {
        type: Number,
        default: 0
    },
    imagenes: {
        type: [String],
        minlength: 1,
        maxlength: 4,
        required: [true, 'Las imagenes son obligatorias']
    },
    turnos: {
        type: Number,
        required: [true, 'Los turnos son obligatorios']
    }
});
exports.default = (0, mongoose_1.model)('Restaurant', restaurantSchema);
//# sourceMappingURL=restaurant.js.map