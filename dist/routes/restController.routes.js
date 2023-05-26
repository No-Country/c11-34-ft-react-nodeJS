"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restConstroller_1 = __importDefault(require("../controllers/restConstroller"));
const express_1 = require("express");
const routerRestController = (0, express_1.Router)();
routerRestController.post('/mapcord', restConstroller_1.default.getCoordenadas);
exports.default = routerRestController;
//# sourceMappingURL=restController.routes.js.map