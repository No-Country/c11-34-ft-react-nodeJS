"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwqu0ohif',
    api_key: process.env.CLOUDINARY_API_KEY || '529327173831236',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'x3HKx6yJ_QxGCJltsClsq-TL2-k'
});
exports.default = cloud;
//# sourceMappingURL=cloudinaryUpload.js.map