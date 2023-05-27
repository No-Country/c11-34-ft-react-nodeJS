"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getCoordenadas = async (req, res) => {
    try {
        const data = req.body;
        if (!data.direccion) {
            return res.status(400).json({
                msg: 'No se ha enviado la direccion'
            });
        }
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(data.direccion)}.json?access_token=${process.env.MORFI_MAP_KEY}`;
        const response = await (0, axios_1.default)(url);
        if (!response.data) {
            return res.status(400).json({
                msg: 'No se ha encontrado la direccion'
            });
        }
        const dir = await response.data;
        const { features } = dir;
        const [lng, lat] = features[0].center;
        res.json({
            lng,
            lat,
            direccion: features[0].place_name
        });
    }
    catch (error) {
        console.log('error al obtener coordenadas', error);
    }
};
const restController = {
    getCoordenadas
};
exports.default = restController;
//# sourceMappingURL=otherServices.js.map