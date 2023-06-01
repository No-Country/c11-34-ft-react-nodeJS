"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantHours = exports.uploadRestaurantImage = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const restaurant_1 = __importDefault(require("../models/restaurant"));
const cloudinaryUpload_1 = __importDefault(require("../helpers/cloudinaryUpload"));
async function uploadRestaurantImage(req, res) {
    const eliminarImagenLocal = promises_1.default.unlink;
    try {
        const dataImg = req.file;
        const { correo } = req.body;
        if (!dataImg?.path) {
            return res.status(400).json({ msg: "no se ha enviado ninguna imagen" });
        }
        console.log("---El restaurant existe---");
        const restaurant = await restaurant_1.default.findOne({ correo });
        if (!restaurant) {
            return res.status(404).json({ msg: "restaurant no encontrado" });
        }
        console.log("------------Cloud uploader-----------");
        const result = await cloudinaryUpload_1.default.uploader.upload(dataImg.path);
        const { public_id } = result;
        const transformedUrl = cloudinaryUpload_1.default.url(public_id, {
            width: 1920,
            height: 1080,
            crop: "fill",
        });
        restaurant.imagenes = [transformedUrl];
        await restaurant.save();
        await eliminarImagenLocal(dataImg.path);
        return res.status(200).json({ msg: "imagen subida correctamente", url: transformedUrl });
    }
    catch (error) {
        return res.status(500).json({ msg: 'error al subir la imagen' });
    }
}
exports.uploadRestaurantImage = uploadRestaurantImage;
async function getRestaurantHours(req, res) {
    try {
        const { correo } = req.body;
        const restaurant = await restaurant_1.default.findOne({ correo });
        if (!restaurant) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }
        const horarioIn = restaurant.horarioIn.split(":");
        const horarioOut = restaurant.horarioOut.split(":");
        let horasAbierto = parseInt(horarioOut[0]) - parseInt(horarioIn[0]);
        if (parseInt(horarioOut[1]) - parseInt(horarioIn[1]) < 0) {
            horasAbierto--;
        }
        console.log(`-------${horasAbierto}---------`);
        const cantidadTurnos = Math.floor(horasAbierto / restaurant.intervaloMesa);
        let reserva = [];
        for (let index = 0; index < cantidadTurnos; index++) {
            reserva.push(restaurant.mesas * restaurant.sillasPorMesa);
        }
        return res.status(200).json({
            "horasAbierto": horasAbierto,
            "cantidadTurnos": cantidadTurnos,
            "reserva": reserva
        });
    }
    catch (error) {
    }
}
exports.getRestaurantHours = getRestaurantHours;
const restaurantDetails = {
    uploadRestaurantImage,
    getRestaurantHours
};
exports.default = restaurantDetails;
//# sourceMappingURL=restaurantDetails.js.map