"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restController_1 = __importDefault(require("../controllers/restController"));
const uploadImg_1 = require("../middleware/uploadImg");
const routerRest = (0, express_1.Router)();
routerRest.get('/', restController_1.default.getRestaurant);
routerRest.post('/', uploadImg_1.upload.array('images', 4), restController_1.default.postRestaurant);
routerRest.put('/:id', restController_1.default.putRestaurant);
routerRest.delete('/:id', restController_1.default.deleteRestaurant);
exports.default = routerRest;
//# sourceMappingURL=restController.routes.js.map