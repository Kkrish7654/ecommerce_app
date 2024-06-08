"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const types_1 = require("../utils/types");
const prisma = new client_1.PrismaClient();
class OrderService {
    static async createOrder(orderData) {
        // Create order data
        const order = {
            data: {
                user_id: orderData.user_id,
                status: types_1.orderStatus.PENDING,
                total_amount: orderData.total_amount,
                order_items: {
                    create: {
                        product_id: orderData.order_items[0].product_id,
                        quantity: orderData.order_items[0].quantity,
                        price: orderData.order_items[0].price,
                        total: orderData.order_items[0].total,
                    },
                },
            },
        };
        // Create order in database
        const data = await prisma.orders.create(order);
        return data;
    }
    // api for updating order status
    static async updateOrder(orderId, status) {
        const updateOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: status === "SHIPPED" ? types_1.orderStatus.SHIPPED : types_1.orderStatus.CANCELLED,
            },
            select: {
                status: true,
                order_items: {
                    select: { product_id: true, quantity: true },
                },
            },
        });
        if (updateOrder.status === types_1.orderStatus.SHIPPED) {
            await prisma.stocks.update({
                where: {
                    product_id: updateOrder.order_items[0].product_id,
                },
                data: {
                    quantity: {
                        decrement: updateOrder.order_items[0].quantity,
                    },
                },
            });
        }
        return updateOrder;
    }
    // async deleteOrder(orderId) {
    //   // Delete order
    // }
    // async getOrder(orderId) {
    //   // Get order
    // }
    static async getOrders() {
        // Get orders
        const data = await prisma.orders.findMany();
        return data;
    }
}
exports.default = OrderService;
