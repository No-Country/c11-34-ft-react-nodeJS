"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    gustos: {
        type: Array,
        default: []
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: ['BUSS_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    imagen: {
        type: String
    }
});
usuarioSchema.methods.toJSON = function () {
    const { __v, _id, ...usuario } = this.toObject();
    usuario.id = _id;
    return usuario;
};
exports.default = (0, mongoose_1.model)('Usuario', usuarioSchema);
//# sourceMappingURL=usuario.js.map