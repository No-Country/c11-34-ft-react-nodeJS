"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwqu0ohif',
    api_key: process.env.CLOUDINARY_API_KEY || '529327173831236',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'x3HKx6yJ_QxGCJltsClsq-TL2-k'
});
const cloudinaryUpload = async (path, dimension) => {
    const result = await cloud.uploader.upload(path);
    const { public_id } = result;
    const transformedUrl = cloud.url(public_id, {
        width: dimension,
        height: dimension,
        crop: 'fill'
    });
    return transformedUrl;
};
exports.cloudinaryUpload = cloudinaryUpload;
//# sourceMappingURL=cloudinaryUpload.js.map