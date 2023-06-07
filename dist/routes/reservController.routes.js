"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservController_1 = __importDefault(require("../controllers/reservController"));
const routerReserv = (0, express_1.Router)();
routerReserv.get("/", reservController_1.default.getReserv);
routerReserv.put("/", reservController_1.default.editReserv);
exports.default = routerReserv;
//# sourceMappingURL=reservController.routes.js.map