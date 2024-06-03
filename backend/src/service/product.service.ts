import { Request } from "express";
import Product from "../model/product.model";

class ProductService {
  static async getAllProducts() {
    return await Product.findAll();
  }

  static async saveProduct(req: Request) {
    const { name, price } = req.body;
    const data = await Product.create<any>({
      name: name,
      price: price,
    });

    return data;
  }
}

export default ProductService;
