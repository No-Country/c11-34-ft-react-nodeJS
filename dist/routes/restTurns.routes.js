"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restTurns_1 = __importDefault(require("../controllers/restTurns"));
const routerRestTurns = (0, express_1.Router)();
routerRestTurns.get('/', restTurns_1.default.getTurns);
routerRestTurns.post('/', restTurns_1.default.postTurns);
exports.default = routerRestTurns;
//# sourceMappingURL=restTurns.routes.js.map