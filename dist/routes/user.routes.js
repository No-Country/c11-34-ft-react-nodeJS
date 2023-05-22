"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const checking_1 = __importDefault(require("../middleware/checking"));
const dataValidator_1 = __importDefault(require("../helpers/dataValidator"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
router.get('/', [
    (0, express_validator_1.check)('correo', 'El correo no es valido')
        .optional()
        .isEmail()
        .normalizeEmail(),
    checking_1.default
], userController_1.default.getUsers);
router.post('/imagen', userController_1.default.uploadImage);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es Obligatorio').notEmpty(),
    (0, express_validator_1.check)('correo', 'Verifique que el correo sea valido')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.check)('contrasena', 'El password debe contener mas de 4 letras')
        .notEmpty()
        .isLength({ min: 4 }),
    (0, express_validator_1.check)('correo').custom(dataValidator_1.default.emailExiste),
    checking_1.default
], userController_1.default.createUsers);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dataValidator_1.default.idExiste),
    checking_1.default
], userController_1.default.updateUser);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dataValidator_1.default.idExiste),
    checking_1.default
], userController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map