import { Request, Response } from "express";
import ProductService from "../service/product.service";
import { sendResponse } from "../utils/response";

class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      return sendResponse(200, "Products found!", products, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const { name, price } = req.body;

      if (!name || !price) {3
        return res.json({ message: "Something is missing?" });
      }

      const data = await ProductService.saveProduct(req);

      return sendResponse(200, "Added", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
