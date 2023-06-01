"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restController_1 = require("../controllers/restController");
const uploadImg_1 = require("../middleware/uploadImg");
const routerRest = (0, express_1.Router)();
routerRest.get('/', (_req, res) => {
    res.json({
        msg: 'getRestaurant'
    });
});
routerRest.post('/', uploadImg_1.upload.array("images", 4), restController_1.postRestaurant);
exports.default = routerRest;
//# sourceMappingURL=restController.routes.js.map