import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function applyDiscount(
  target: number,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const productId: number = args[0];
    const customerSegments: string = args[1];
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

export default applyDiscount;
