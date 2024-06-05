import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cloudinary from "../cloudinary.config";

const prisma = new PrismaClient();
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
    const { title, description, price, quantity } = req.body;

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
}

export default ProductService;
