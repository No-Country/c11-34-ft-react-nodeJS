"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGustos = exports.uploadImage = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const usuario_1 = __importDefault(require("../models/usuario"));
const cloudinaryUpload_1 = __importDefault(require("../helpers/cloudinaryUpload"));
async function uploadImage(req, res) {
    const eliminarImagenLocal = promises_1.default.unlink;
    try {
        const dataImg = req.file;
        const { correo } = req.body;
        if (!dataImg?.path) {
            return res.status(400).json({ msg: 'no se ha enviado ninguna imagen' });
        }
        const usuario = await usuario_1.default.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ msg: 'usuario no encontrado' });
        }
        ;
        const result = await cloudinaryUpload_1.default.uploader.upload(dataImg.path);
        const { public_id } = result;
        const transformedUrl = cloudinaryUpload_1.default.url(public_id, {
            width: 100,
            height: 100,
            crop: 'fill'
        });
        usuario.imagen = transformedUrl;
        await usuario.save();
        await eliminarImagenLocal(dataImg.path);
        return res
            .status(200)
            .json({ msg: 'imagen subida correctamente', url: transformedUrl });
    }
    catch (error) {
        return res.status(500).json({ msg: 'error al subir la imagen' });
    }
}
exports.uploadImage = uploadImage;
async function addGustos(req, res) {
    const { gustos, correo } = req.body;
    try {
        const usuario = await usuario_1.default.findOne({ correo });
        console.log("datos de gusto de usuario------" + usuario);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        usuario.gustos = gustos;
        usuario.save();
        res.json({ msg: 'gustos agregados' });
    }
    catch (error) {
        console.error('Error al actualizar los gustos:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar los gustos' });
    }
}
exports.addGustos = addGustos;
const userDetails = {
    uploadImage,
    addGustos
};
exports.default = userDetails;
//# sourceMappingURL=userDetails.js.map