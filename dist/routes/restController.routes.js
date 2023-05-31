"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restController_1 = require("../controllers/restController");
const routerRest = (0, express_1.Router)();
routerRest.get('/', (_req, res) => {
    res.json({
        msg: 'getRestaurant'
    });
});
routerRest.post('/', restController_1.postRestaurant);
exports.default = routerRest;
//# sourceMappingURL=restController.routes.js.map