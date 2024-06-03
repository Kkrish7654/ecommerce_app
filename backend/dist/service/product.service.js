"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../model/product.model"));
class ProductService {
    static async getAllProducts() {
        return await product_model_1.default.findAll();
    }
    static async saveProduct(req) {
        const { name, price } = req.body;
        const data = await product_model_1.default.create({
            name: name,
            price: price,
        });
        return data;
    }
}
exports.default = ProductService;
