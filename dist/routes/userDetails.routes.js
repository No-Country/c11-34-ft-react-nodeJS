"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const checking_1 = __importDefault(require("../middleware/checking"));
const userDetails_1 = __importDefault(require("../controllers/userDetails"));
const uploadImg_1 = require("../middleware/uploadImg");
const routerDetails = (0, express_1.Router)();
routerDetails.post('/imagen', [
    uploadImg_1.upload.single('img_perfil'),
    (0, express_validator_1.check)('correo', 'Verifique que el correo sea valido')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    checking_1.default
], userDetails_1.default.uploadImage);
routerDetails.post('/gustos', userDetails_1.default.addGustos);
exports.default = routerDetails;
//# sourceMappingURL=userDetails.routes.js.map