"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const checking_1 = __importDefault(require("../middleware/checking"));
const restaurantDetails_1 = __importDefault(require("../controllers/restaurantDetails"));
const uploadImg_1 = require("../middleware/uploadImg");
const routerResDetails = (0, express_1.Router)();
routerResDetails.post('/imagen', [
    uploadImg_1.upload.single('img_restaurant'),
    (0, express_validator_1.check)('correo', 'Verifique que el correo sea valido')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    checking_1.default
], restaurantDetails_1.default.uploadRestaurantImage);
routerResDetails.get('/', [
    (0, express_validator_1.check)('correo', 'Verifique que el correo sea valido').notEmpty().isEmail().normalizeEmail(),
    checking_1.default
], restaurantDetails_1.default.getRestaurantHours);
exports.default = routerResDetails;
//# sourceMappingURL=restaurantDetails.routes.js.map