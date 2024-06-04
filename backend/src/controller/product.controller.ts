import { Request, Response } from "express";
import ProductService from "../service/product.service";
import { sendResponse } from "../utils/response";

class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts(req);
      if ((Array.isArray(products) && products.length < 1) || !products) {
        return sendResponse(404, "Products Not found!", products, res);
      }
      return sendResponse(200, "Products found!", products, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const { title, description, price } = req.body;

      if (!title || !price || !description) {
        return res.json({ message: "Something is missing?" });
      }

      const data: any = await ProductService.saveProduct(req);

      return sendResponse(200, "Added", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
