"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../service/order.service"));
const response_1 = require("../utils/response");
class OrderController {
    static async createOrder(req, res) {
        try {
            const data = await order_service_1.default.createOrder(req);
            if (data && data[0]?.exists === true)
                return res.status(401).json({
                    message: data.message,
                });
            return (0, response_1.sendResponse)(200, "Order Placed", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = OrderController;
