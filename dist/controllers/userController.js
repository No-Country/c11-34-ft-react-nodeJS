"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUsers = exports.getUsers = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
async function getUsers(req, res) {
    try {
        const { correo } = req.body;
        if (correo) {
            console.log('----get User by correo----');
            const usuario = await usuario_1.default.findOne({ correo });
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            return res.status(200).json(usuario);
        }
        console.log('----get all Users----');
        const [total, usuarios] = await Promise.all([
            usuario_1.default.countDocuments(),
            usuario_1.default.find({})
        ]);
        res.status(200).json({ total, usuarios });
    }
    catch (error) {
        res.status(400).json({
            data: 'Se presento un error al obtener la lista de Usuarios',
            error
        });
    }
}
exports.getUsers = getUsers;
async function createUsers(req, res) {
    try {
        console.log('----create User----');
        const { nombre, correo, contrasena } = req.body;
        const usuarioExistente = await usuario_1.default.findOne({ correo });
        if (usuarioExistente) {
            return res
                .status(409)
                .json({ mensaje: 'El correo electrónico ya está registrado' });
        }
        const user = new usuario_1.default({ nombre, correo, contrasena });
        await user.save();
        return res
            .status(201)
            .json({ mensaje: 'El usuario ha sido creado correctamente' });
    }
    catch (error) {
        res.status(500).json({
            data: 'Se presento un error al crear el usuario',
            error
        });
    }
}
exports.createUsers = createUsers;
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { nombre, correo, contrasena } = req.body;
        const user = await usuario_1.default.findByIdAndUpdate(id, { nombre, correo, contrasena }, { new: true });
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        console.log('----Update Users----');
        return res
            .status(200)
            .json({ msg: `Usuario con id: ${id} actualizado exitosamente` });
    }
    catch (error) {
        res.status(500).json({
            data: 'Se presento un error al actualizar el usuario',
            error
        });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    try {
        console.log('----Delete User----');
        const { id } = req.params;
        const user = await usuario_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({
            data: 'Se presento un error al eliminar el usuario',
            error
        });
    }
}
exports.deleteUser = deleteUser;
const userController = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
};
exports.default = userController;
//# sourceMappingURL=userController.js.map