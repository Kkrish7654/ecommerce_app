"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../service/order.service"));
const response_1 = require("../utils/response");
const types_1 = require("../utils/types");
const product_service_1 = __importDefault(require("../service/product.service"));
class OrderController {
    static async createOrder(req, res) {
        const { user_id, order_items } = req.body;
        const { product_id, quantity } = order_items[0];
        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({
                message: "Please provide user_id and order_items",
            });
        }
        const productPrice = await product_service_1.default.getProductAmountById(product_id);
        const total = (productPrice && productPrice * quantity) || 0;
        const orders = [
            {
                product_id: product_id,
                quantity: quantity,
                price: productPrice || 0,
                total: total,
            },
        ];
        const orderData = {
            user_id,
            total_amount: total,
            status: types_1.orderStatus.PENDING,
            order_items: orders,
        };
        try {
            const data = await order_service_1.default.createOrder(orderData);
            if (!data)
                return res.status(400).json({
                    message: "Order not placed",
                });
            return (0, response_1.sendResponse)(200, "Order Placed", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getOrders(req, res) {
        try {
            const data = await order_service_1.default.getOrders();
            if (!data)
                return res.status(400).json({
                    message: "No orders found",
                });
            return (0, response_1.sendResponse)(200, "Orders Fetched", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
_a = OrderController;
OrderController.updateOrder = async (req, res) => {
    const { order_id, status } = req.body;
    if (!order_id || !status) {
        return res.status(400).json({
            message: "Please provide order_id and status",
        });
    }
    try {
        const data = await order_service_1.default.updateOrder(order_id, status);
        if (!data)
            return res.status(400).json({
                message: "Order not updated",
            });
        return (0, response_1.sendResponse)(200, "Order Updated", data, res);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.default = OrderController;
