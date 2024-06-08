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
    static async addItemToCart(req, res) {
        try {
            const { product_id, user_id } = req.body;
            if (!product_id || !user_id) {
                return res.json({ message: "Something is missing?" });
            }
            const data = await product_service_1.default.userAddItemToCart(req);
            if (data.error === "OUT_OF_STOCK") {
                return res.status(404).json({
                    message: "Oops! Item out of stock",
                });
            }
            if (data?.status === 404) {
                return (0, response_1.sendResponse)(data?.status, "Oops! Failed to Add Item To Cart!", data, res);
            }
            return (0, response_1.sendResponse)(201, "Item Added Successfully", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getProductsDiscount(req, res) {
        try {
            const productId = parseInt(req.params.id, 10);
            const customerSegment = req.query.customerSegment;
            const product = await product_service_1.default.getProductsDiscount(productId, customerSegment, []);
            res.json(product);
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
exports.default = ProductController;
