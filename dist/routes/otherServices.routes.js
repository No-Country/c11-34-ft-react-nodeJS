"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otherServices_1 = __importDefault(require("../controllers/otherServices"));
const express_1 = require("express");
const routerOtherServices = (0, express_1.Router)();
routerOtherServices.post('/mapcord', otherServices_1.default.getCoordenadas);
exports.default = routerOtherServices;
//# sourceMappingURL=otherServices.routes.js.map