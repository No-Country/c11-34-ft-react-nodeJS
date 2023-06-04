"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingParams = void 0;
const express_validator_1 = require("express-validator");
const checking = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: errors });
    }
    next();
};
const checkingParams = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req.query);
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: errors });
    }
    next();
};
exports.checkingParams = checkingParams;
exports.default = checking;
//# sourceMappingURL=checking.js.map