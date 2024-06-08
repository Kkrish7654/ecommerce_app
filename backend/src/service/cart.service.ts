import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CartService {
  async addItem(user_id: number, product_id: number, quantity: number) {
    const productStock = await prisma.$queryRawUnsafe<any[]>(`
      SELECT COUNT(product_id) FROM stocks where product_id = ${product_id};
   `);

    if (productStock[0].count < quantity) {
      return {
        error: "OUT_OF_STOCK",
      };
    }

    const query: Prisma.user_cartCreateArgs = {
      data: {
        user_id: user_id,
        product_id: product_id,
        quantity: quantity,
      },
    };

    const data = await prisma.user_cart.create(query);

    return data;
  }

  async updateItem(user_id: number, product_id: number, quantity: number) {
    // TODO -> IF ITEM ALREADY EXIST INCREASE "QUANTITY"

    const query: Prisma.user_cartUpdateManyArgs = {
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

  async deleteItem(user_id: number, product_id: number) {
    const query: Prisma.user_cartDeleteManyArgs = {
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    };

    const data = await prisma.user_cart.deleteMany(query);
    return data;
  }
}

export default CartService;
