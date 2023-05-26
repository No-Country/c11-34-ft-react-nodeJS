"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("../controllers/userAuth");
const express_validator_1 = require("express-validator");
const checking_1 = __importDefault(require("../middleware/checking"));
const routerAuth = (0, express_1.Router)();
routerAuth.post('/login', [
    (0, express_validator_1.check)('correo', 'el Correo es obligatorio').isEmail().normalizeEmail(),
    (0, express_validator_1.check)('contrasena', 'La contraseña es obligatoria').notEmpty(),
    checking_1.default
], userAuth_1.checkLogin);
routerAuth.post('/google', [(0, express_validator_1.check)('id_token_google', 'el Id_token es necesario').notEmpty()], userAuth_1.googleSignIn);
exports.default = routerAuth;
//# sourceMappingURL=userAuth.routes.js.map