"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../service/product.service"));
const response_1 = require("../utils/response");
class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await product_service_1.default.getAllProducts(req);
            if ((Array.isArray(products) && products.length < 1) || !products) {
                return (0, response_1.sendResponse)(404, "Products Not found!", products, res);
            }
            return (0, response_1.sendResponse)(200, "Products found!", products, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async createProduct(req, res) {
        try {
            const { title, description, price } = req.body;
            if (!title || !price || !description) {
                return res.json({ message: "Something is missing?" });
            }
            const data = await product_service_1.default.saveProduct(req);
            return (0, response_1.sendResponse)(200, "Added", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = ProductController;
