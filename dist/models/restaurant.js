"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RestaurantSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del restaurante es obligatorio"]
    },
    direccion: {
        type: String,
        required: [true, "La direccion del restaurante es obligatoria"]
    },
    telefono: {
        type: Number,
        required: [true, "El telefono del restaurante es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo del ususario es obligatorio"],
        unique: true
    },
    dias: {
        type: [String],
        required: [true, "Se debe abrir al menos un dia a la semana"]
    },
    horarioIn: {
        type: String,
        required: [true, "Debe haber una hora de apertura"]
    },
    horarioOut: {
        type: String,
        required: [true, "Debe haber una hora de cierre"]
    },
    tipoComida: {
        type: [String],
        required: [true, "Debe definirse un tipo de comida"]
    },
    mesas: {
        type: Number,
        required: [true, "Se debe indicar el numero de mesas del restaurante"]
    },
    sillasPorMesa: {
        type: Number,
        required: [true, "Se debe indicar el numero de sillas por mesa"]
    },
    intervaloMesa: {
        type: Number,
        required: [true, "Se debe indicar el intervalo por mesa"]
    },
    descripcion: {
        type: String,
        required: [true, "Se debe dart una descripcion del restaurante"]
    },
    caracteristicasPrinc: {
        type: [String],
        required: [true, "Se debe añadir al menos una caracteristica principal"]
    },
    otrosDetalles: {
        type: [String],
        required: [true, "Se debe indicar otros detalles"]
    },
    costoReserva: {
        type: Number
    },
    cantidadComentarios: {
        type: Number,
        required: [true, "Se requiere la cantidad de comentarios"]
    },
    imagenes: {
        type: [String],
    },
});
RestaurantSchema.methods.toJSON = function () {
    const { __v, _id, ...restaurant } = this.toObject();
    restaurant.id = _id;
    return restaurant;
};
exports.default = (0, mongoose_1.model)('restaurant', RestaurantSchema);
//# sourceMappingURL=restaurant.js.map