"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const checking_1 = __importDefault(require("../middleware/checking"));
const dataValidator_1 = __importDefault(require("../helpers/dataValidator"));
const restaurantController_1 = __importDefault(require("../controllers/restaurantController"));
const router = (0, express_1.Router)();
router.get('/', [
    (0, express_validator_1.check)('correo', 'El correo no es valido')
        .optional()
        .isEmail()
        .normalizeEmail(),
    checking_1.default
], restaurantController_1.default.getRestaurants);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es Obligatorio').notEmpty(),
    (0, express_validator_1.check)('direccion', 'la direccion es obligatoria').notEmpty(),
    (0, express_validator_1.check)('telefono', 'El telefono es Obligatorio').notEmpty().isInt(),
    (0, express_validator_1.check)('correo', 'Verifique que el correo sea valido').notEmpty().isEmail().normalizeEmail(),
    (0, express_validator_1.check)('dias', 'debe abrir al menos un dia a la semana').notEmpty(),
    (0, express_validator_1.check)('horarioIn', 'la hora de apertura es obligatoria').notEmpty().isTime({ hourFormat: 'hour24' }),
    (0, express_validator_1.check)('horarioOut', 'la hora de cierre es obligatoria').notEmpty().isTime({ hourFormat: 'hour24' }),
    (0, express_validator_1.check)('tipoComida', 'se debe esteblecer el tipo de comida del restaurante').notEmpty(),
    (0, express_validator_1.check)('mesas', 'se debe establecer el numero de mesas del restaurante').notEmpty().isInt(),
    (0, express_validator_1.check)('sillasPorMesa', 'se debe establecer el numero de sillas por mesa del restaurante').notEmpty().isInt(),
    (0, express_validator_1.check)('intervaloMesa', 'se debe establecer el tiempo de duracion de la reserva del restaurante').notEmpty().isInt(),
    (0, express_validator_1.check)('descripcion', 'se debe proporcionar una descripcion del restaurante').notEmpty(),
    (0, express_validator_1.check)('caracteristicasPrinc', 'se debe las establecer caracteristicas principales del restaurante').notEmpty(),
    (0, express_validator_1.check)('otros detalles').optional(),
    (0, express_validator_1.check)('costoReserva').optional(),
    (0, express_validator_1.check)('cantidadComentarios', 'se debe una cantidad de comentarios para el restaurante').notEmpty().isInt(),
    (0, express_validator_1.check)('descripcion', 'se debe proporcionar una descripcion del restaurante').notEmpty(),
    checking_1.default
], restaurantController_1.default.createRestaurant);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dataValidator_1.default.idExiste),
    checking_1.default
], restaurantController_1.default.updateRestaurant);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dataValidator_1.default.idExiste),
    checking_1.default
], restaurantController_1.default.deleteRestaurant);
exports.default = router;
//# sourceMappingURL=restaurantController.routes.js.map