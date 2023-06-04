"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turnos_1 = __importDefault(require("../models/turnos"));
const usuario_1 = __importDefault(require("../models/usuario"));
const emailExiste = async (correo) => {
    const existeEmail = await usuario_1.default.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo "${correo}" ya existe`);
    }
};
const idExiste = async (id) => {
    const existeUsuario = await usuario_1.default.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id "${id}" no existe`);
    }
};
const idTurnosExiste = async (id) => {
    const existeTurno = await turnos_1.default.findById(id);
    if (!existeTurno) {
        throw new Error(`El Turno con el id_restaurant="${id}" no existe`);
    }
};
const dataValidator = {
    emailExiste,
    idExiste,
    idTurnosExiste
};
exports.default = dataValidator;
//# sourceMappingURL=dataValidator.js.map