import { Request } from "express";
import { discounts, Prisma, PrismaClient } from "@prisma/client";
import cloudinary from "../cloudinary.config";
import CartService from "./cart.service";
import applyDiscount from "../decorator/applyDiscount";
const prisma = new PrismaClient();

const cart = new CartService();
class ProductService {
  static async getAllProducts(req: Request) {
    const id = Number(req.query.id);

    if (id !== undefined && id) {
      return await prisma.products.findFirst({
        where: {
          id: id,
        },
      });
    } else {
      return await prisma.products.findMany();
    }
  }

  static async saveProduct(req: Request) {
    const { title, description, content, price, quantity } = req.body;

    const files: any = req.files;
    const uploadedImages: any = {};
    for (const field in files) {
      const fieldFiles = files[field];
      if (fieldFiles) {
        for (const file of fieldFiles) {
          const result = await cloudinary.uploader.upload(file.path);
          uploadedImages[field] = uploadedImages[field] || [];
          uploadedImages[field].push(result.secure_url);
        }
      }
    }

    const gallery: any[] = [];
    uploadedImages?.gallery?.map((item: any) => {
      gallery.push(item);
    });

    const query: Prisma.productsCreateArgs = {
      data: {
        title: title,
        description: description,
        price: parseInt(price),
        image: uploadedImages.image[0],
        thumbnail: uploadedImages.thumbnail[0],
        gallery: gallery,
        stocks: {
          create: {
            quantity: parseInt(quantity),
          },
        },
      },
    };

    const data = await prisma.products.create(query);

    return { data: data };
  }

  // get product amount by id
  static async getProductAmountById(id: number) {
    const data = await prisma.products.findFirst({
      where: {
        id: id,
      },
    });
    return data?.price;
  }

  // This method is used to add a product to the cart
  static async userAddItemToCart(req: Request) {
    const { product_id, user_id, quantity } = req.body;
    const data = await cart.addItem(user_id, product_id, quantity);
    return data;
  }

  // This method is used to update the quantity of a product in the cart
  static async userUpdateItemInCart(req: Request) {
    const { product_id, user_id, quantity } = req.body;
    const data = await cart.updateItem(user_id, product_id, quantity);
    return data;
  }

  // This method is used to delete a product from the cart
  static async userDeleteItemFromCart(req: Request) {
    const { product_id, user_id } = req.body;
    const data = await cart.deleteItem(user_id, product_id);
    return data;
  }

  // get products with discount

  @applyDiscount
  static async getProductsDiscount(
    productId: number,
    customer_segment: string,
    discount?: discounts[]
  ) {
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (discount && discount.length > 0) {
      product.price = calculateDiscountedPrice(product.price, discount);
    }

    return product;
  }
}

function calculateDiscountedPrice(price: number, discounts: discounts[]) {
  let finalPrice = price;
  discounts.forEach((item) => {
    finalPrice -= (price * item.discount) / 100;
  });

  return finalPrice;
}

export default ProductService;
