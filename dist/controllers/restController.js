"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turnos_1 = __importDefault(require("../models/turnos"));
const others_1 = require("../helpers/others");
const promises_1 = __importDefault(require("fs/promises"));
const restaurant_1 = __importDefault(require("../models/restaurant"));
const cloudinaryUpload_1 = require("../helpers/cloudinaryUpload");
const reservas_1 = __importDefault(require("../models/reservas"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getRestaurant = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const restt = await restaurant_1.default.find({ visible: true })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .exec();
        if (!restt) {
            return res.status(400).json({
                msg: 'No se encontraron restaurantes'
            });
        }
        res.status(200).json({
            msg: 'Lista de restaurantes',
            page,
            limit,
            total: restt.length,
            restt
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Se presento un error al obtener la lista de restaurantes',
            error
        });
    }
};
const getRestaurantbyCorreo = async (req, res) => {
    try {
        const { correo } = req.query;
        const restt = await restaurant_1.default.find({ correo });
        if (!restt) {
            return res.status(400).json({
                msg: 'No se encontrao el restaurant'
            });
        }
        res.status(200).json({
            restt
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Se presento un error al obtener el restaurant',
            error
        });
    }
};
const postRestaurant = async (req, res) => {
    const eliminarImagenLocal = promises_1.default.unlink;
    try {
        const dataImg = req.files;
        const allData = await req.body;
        const { correo } = req.query;
        const usuarioExstente = await usuario_1.default.findOne({ correo });
        if (!usuarioExstente) {
            return res.status(400).json({
                msg: 'El usuario con ese correo no existe'
            });
        }
        const restaurantExistente = await restaurant_1.default.findOne({
            nombre: allData.nombre,
            correo: allData.correo
        });
        if (restaurantExistente) {
            return res.status(409).json({
                msg: 'El restaurante con ese nombre ya existe'
            });
        }
        if (dataImg?.length === 0) {
            return res.status(400).json({
                msg: 'No se subio ninguna imagen'
            });
        }
        allData.dias = (0, others_1.transformarStringtoArray)(allData.dias);
        allData.tipoComida = (0, others_1.transformarStringtoArray)(allData.tipoComida);
        allData.caracteristicasPrinc = (0, others_1.transformarStringtoArray)(allData.caracteristicasPrinc);
        allData.otrosDetalles = (0, others_1.transformarStringtoArray)(allData.otrosDetalles);
        const { horaI, horaO, turnos } = (0, others_1.getTurnsandHours)(allData.horarioIn, allData.horarioOut, allData.intervaloMesa);
        const capacidadMax = allData.sillasPorMesa * allData.mesas;
        const reservas = {
            fecha: Array(turnos).fill(capacidadMax)
        };
        const transformedUrl = await Promise.all(dataImg.map(async (element) => {
            const transformedUrl = await (0, cloudinaryUpload_1.cloudinaryUpload)(element.path, 1000);
            return transformedUrl;
        }));
        allData['imagenes'] = transformedUrl;
        allData['turnos'] = turnos;
        const restaurant = new restaurant_1.default(allData);
        const { _id: id_restaurante } = restaurant;
        await restaurant.save();
        const turno = new turnos_1.default({
            id_restaurante,
            nombre: allData.nombre,
            correo: allData.correo,
            reservas,
            capacidadMax,
            horaApertura: horaI,
            duracionRes: allData.intervaloMesa,
            personasPorMesa: allData.sillasPorMesa,
            horaCierre: horaO
        });
        if (!turno) {
            return res.status(400).json({
                msg: 'No se pudo crear el turnos, hable con soporte tecnico'
            });
        }
        await turno.save();
        await Promise.all(dataImg.map(async (element) => {
            await eliminarImagenLocal(element.path);
        }));
        res.json({
            msg: 'creado correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al crear el restaurante, verificar que los datos sean correctos',
            error
        });
    }
};
const putRestaurant = async (req, res) => {
    try {
        console.log('----Update restaurant----');
        const { id } = req.params;
        const data = req.body;
        const restaurant = await restaurant_1.default.findByIdAndUpdate(id, data, {
            new: true
        });
        if (!restaurant) {
            return res.status(404).json({ mensaje: 'Restautanre no encontrado' });
        }
        return res.status(200).json({
            msg: `Restaurante con id: "${id}" actualizado exitosamente`,
            restaurant
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Se presento un error al actualizar el retaurante',
            error
        });
    }
};
const deleteRestaurant = async (req, res) => {
    try {
        console.log('----Delete Restaurant----');
        const { id } = req.params;
        const reservas = await reservas_1.default.findOne({ id_restaurante: id });
        if (reservas) {
            return res.status(400).json({
                msg: 'No se puede eliminar el restaurante porque tiene reservas, opcion ponerlo quitarle la visibilidad'
            });
        }
        const restaurant = await restaurant_1.default.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurante no encontrado' });
        }
        await turnos_1.default.findOneAndDelete({ id_restaurante: id });
        return res.status(200).json({ msg: 'Restaurante eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Se presento un error al eliminar el restaurante',
            error
        });
    }
};
const restController = {
    getRestaurant,
    postRestaurant,
    putRestaurant,
    deleteRestaurant,
    getRestaurantbyCorreo
};
exports.default = restController;
//# sourceMappingURL=restController.js.map