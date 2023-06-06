"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../models/usuario"));
const getFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuario_1.default.findById(id);
        if (!usuario)
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.status(200).json({ fav: usuario.favoritos });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener favoritos' });
    }
};
const putFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const usuario = await usuario_1.default.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        if (!Array.isArray(data)) {
            return res.status(400).json({ msg: 'Datos no validos' });
        }
        usuario.favoritos = data;
        await usuario.save();
        res.status(200).json({ msg: true });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al agregar favoritos' });
    }
};
const Favorites = {
    getFavorites,
    putFavorites
};
exports.default = Favorites;
//# sourceMappingURL=favController.js.map