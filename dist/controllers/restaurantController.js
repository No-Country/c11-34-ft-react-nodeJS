"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurants = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
async function getRestaurants(req, res) {
    try {
        const { correo } = req.body;
        if (correo) {
            console.log("----get restaurant by correo----");
            const restaurant = await restaurant_1.default.findOne({ correo });
            if (!restaurant) {
                return res.status(404).json({ mensaje: "Restaurante no encontrado" });
            }
            return res.status(200).json(restaurant);
        }
        console.log("----get all Restaurants----");
        const [total, restaurants] = await Promise.all([
            restaurant_1.default.countDocuments(),
            restaurant_1.default.find({}),
        ]);
        res.status(200).json({ total, restaurants });
    }
    catch (error) {
        res.status(400).json({
            data: "Se presento un error al obtener la lista de restaurantes",
            error,
        });
    }
}
exports.getRestaurants = getRestaurants;
async function createRestaurant(req, res) {
    try {
        console.log("----create Restaurant----");
        const { nombre, direccion, telefono, correo, dias, horarioIn, horarioOut, tipoComida, mesas, sillasPorMesa, intervaloMesa, descripcion, caracteristicasPrinc, otrosDetalles, costoReserva, cantidadComentarios } = req.body;
        const restaurantExistente = await restaurant_1.default.findOne({ correo });
        if (restaurantExistente) {
            return res
                .status(409)
                .json({
                mensaje: "El correo electrónico ya tiene un restaurante registrado",
            });
        }
        const restaurant = new restaurant_1.default({
            nombre, direccion, telefono,
            correo, dias, horarioIn, horarioOut,
            tipoComida, mesas, sillasPorMesa, intervaloMesa,
            descripcion, caracteristicasPrinc, otrosDetalles,
            costoReserva, cantidadComentarios
        });
        await restaurant.save();
        return res.status(201).json({ mensaje: "El restaurante ha sido creado correctamente" });
    }
    catch (error) {
        res.status(500).json({
            data: "Se presento un error al crear el restaurante",
            error,
        });
    }
}
exports.createRestaurant = createRestaurant;
async function updateRestaurant(req, res) {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono, correo, dias, horarioIn, horarioOut, tipoComida, mesas, sillasPorMesa, intervaloMesa, descripcion, caracteristicasPrinc, otrosDetalles, costoReserva, cantidadComentarios, id_usuario, } = req.body;
        const restaurant = await restaurant_1.default.findByIdAndUpdate(id, {
            nombre, direccion, telefono,
            correo, dias, horarioIn, horarioOut,
            tipoComida, mesas, sillasPorMesa, intervaloMesa,
            descripcion, caracteristicasPrinc, otrosDetalles,
            costoReserva, cantidadComentarios, id_usuario
        }, { new: true });
        if (!restaurant) {
            return res.status(404).json({ mensaje: 'Restautanre no encontrado' });
        }
        console.log('----Update restaurant----');
        return res
            .status(200)
            .json({ msg: `Restaurante con id: ${id} actualizado exitosamente` });
    }
    catch (error) {
        res.status(500).json({
            data: 'Se presento un error al actualizar el retaurante',
            error
        });
    }
}
exports.updateRestaurant = updateRestaurant;
async function deleteRestaurant(req, res) {
    try {
        console.log("----Delete Restaurant----");
        const { id } = req.params;
        const restaurant = await restaurant_1.default.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }
        return res
            .status(200)
            .json({ mensaje: "Restaurante eliminado exitosamente" });
    }
    catch (error) {
        res.status(500).json({
            data: "Se presento un error al eliminar el Restaurante",
            error,
        });
    }
}
exports.deleteRestaurant = deleteRestaurant;
const restaurantController = {
    getRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
};
exports.default = restaurantController;
//# sourceMappingURL=restaurantController.js.map