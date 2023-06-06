"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favController_1 = __importDefault(require("../controllers/favController"));
const routerFav = (0, express_1.Router)();
routerFav.get('/:id', favController_1.default.getFavorites);
routerFav.put('/:id', favController_1.default.putFavorites);
exports.default = routerFav;
//# sourceMappingURL=favController.routes.js.map