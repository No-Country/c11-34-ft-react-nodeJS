"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRestaurant = void 0;
const turnos_1 = __importDefault(require("../models/turnos"));
const others_1 = require("../helpers/others");
const promises_1 = __importDefault(require("fs/promises"));
const restaurant_1 = __importDefault(require("../models/restaurant"));
const cloudinaryUpload_1 = require("../helpers/cloudinaryUpload");
const postRestaurant = async (req, res) => {
    const eliminarImagenLocal = promises_1.default.unlink;
    try {
        const dataImg = req.files;
        const allData = await req.body;
        const restaurantExistente = await restaurant_1.default.findOne({
            nombre: allData.nombre,
            correo: allData.correo
        });
        if (restaurantExistente) {
            return res.status(409).json({
                msg: 'El restaurante ya existe'
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
            const transformedUrl = await (0, cloudinaryUpload_1.cloudinaryUpload)(element.path, 500);
            return transformedUrl;
        }));
        allData['imagenes'] = transformedUrl;
        allData['turnos'] = turnos;
        const restaurant = new restaurant_1.default(allData);
        if (!restaurant) {
            return res.status(400).json({
                msg: 'No se pudo crear el restaurante'
            });
        }
        const { _id: id_restaurante } = restaurant;
        await restaurant.save();
        const turno = new turnos_1.default({
            id_restaurante,
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
exports.postRestaurant = postRestaurant;
//# sourceMappingURL=restController.js.map