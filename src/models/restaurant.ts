import { model, Schema } from "mongoose";

interface Restaurant {
    nombre: String,
    direccion: String,
    telefono: number,
    correo: String,
    dias: String[],
    horarioIn: String,
    horarioOut: String,
    tipoComida: String[],
    mesas: number,
    sillasPorMesa: number,
    intervaloMesa: number,
    descripcion: String,
    caracteristicasPrinc: String[],
    otrosDetalles: String[],
    costoReserva: number | undefined,
    // tenedores??: number,
    cantidadComentarios: number,
    imagenes: String[]
    // id_usuario: String
}

const RestaurantSchema: Schema<Restaurant> = new Schema({
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
    // id_usuario: {
    //     type: String
    // }
})

RestaurantSchema.methods.toJSON = function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...restaurant } = this.toObject()
    restaurant.id = _id
    return restaurant
}

export default model('restaurant', RestaurantSchema);