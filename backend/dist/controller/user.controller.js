"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
const response_1 = require("../utils/response");
class UserController {
    static async createUser(req, res) {
        try {
            const { username, name, email, password } = req.body;
            if (!username || !name || !email || !password) {
                return res.json({ message: "Something is missing?" });
            }
            const data = await user_service_1.default.userCreate(req, res);
            if (data && data[0]?.exists === true)
                return res.status(401).json({
                    message: data.message,
                });
            return (0, response_1.sendResponse)(200, "User added", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: "Something is missing?" });
            }
            const data = await user_service_1.default.loginUser(req);
            if (data?.status === 404) {
                return (0, response_1.sendResponse)(data?.status, "Login Failed", data, res);
            }
            return (0, response_1.sendResponse)(201, "Login Succesfully", data, res);
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
            const data = await user_service_1.default.userAddItemToCart(req);
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
}
exports.default = UserController;
