"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cloudinary_config_1 = __importDefault(require("../cloudinary.config"));
const prisma = new client_1.PrismaClient();
class ProductService {
    static async getAllProducts(req) {
        const id = Number(req.query.id);
        if (id !== undefined && id) {
            return await prisma.products.findFirst({
                where: {
                    id: id,
                },
            });
        }
        else {
            return await prisma.products.findMany();
        }
    }
    static async saveProduct(req) {
        const { title, description, price, quantity } = req.body;
        const files = req.files;
        const uploadedImages = {};
        for (const field in files) {
            const fieldFiles = files[field];
            if (fieldFiles) {
                for (const file of fieldFiles) {
                    const result = await cloudinary_config_1.default.uploader.upload(file.path);
                    uploadedImages[field] = uploadedImages[field] || [];
                    uploadedImages[field].push(result.secure_url);
                }
            }
        }
        const gallery = [];
        uploadedImages?.gallery?.map((item) => {
            gallery.push(item);
        });
        const query = {
            data: {
                title: title,
                description: description,
                price: parseInt(price),
                image: uploadedImages.image[0],
                thumbnail: uploadedImages.thumbnail[0],
                gallery: gallery,
                stocks: {
                    create: {
                        quantity: parseInt(quantity),
                    },
                },
            },
        };
        const data = await prisma.products.create(query);
        return { data: data };
    }
}
exports.default = ProductService;
