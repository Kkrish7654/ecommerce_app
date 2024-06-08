"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CartService {
    async addItem(user_id, product_id, quantity) {
        const productStock = await prisma.$queryRawUnsafe(`
      SELECT COUNT(product_id) FROM stocks where product_id = ${product_id};
   `);
        if (productStock[0].count < quantity) {
            return {
                error: "OUT_OF_STOCK",
            };
        }
        const query = {
            data: {
                user_id: user_id,
                product_id: product_id,
                quantity: quantity,
            },
        };
        const data = await prisma.user_cart.create(query);
        return data;
    }
    async updateItem(user_id, product_id, quantity) {
        // TODO -> IF ITEM ALREADY EXIST INCREASE "QUANTITY"
        const query = {
            data: {
                quantity: quantity,
            },
            where: {
                user_id: user_id,
                product_id: product_id,
            },
        };
        const data = await prisma.user_cart.updateMany(query);
        return data;
    }
    async deleteItem(user_id, product_id) {
        const query = {
            where: {
                user_id: user_id,
                product_id: product_id,
            },
        };
        const data = await prisma.user_cart.deleteMany(query);
        return data;
    }
}
exports.default = CartService;
