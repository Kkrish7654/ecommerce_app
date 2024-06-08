"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function applyDiscount(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        const productId = args[0];
        const customerSegments = args[1];
        const discount = args[2];
        const currentDate = new Date();
        const discounts = await prisma.discounts.findMany({
            where: {
                product_id: productId,
                start_date: { lte: currentDate },
                end_date: { gte: currentDate },
                OR: [
                    {
                        customer_segment: customerSegments,
                    },
                    {
                        customer_segment: "all",
                    },
                ],
            },
        });
        const result = await originalMethod.apply(this, [
            ...args,
            customerSegments,
            discounts,
        ]);
        return result;
    };
    return descriptor;
}
exports.default = applyDiscount;
