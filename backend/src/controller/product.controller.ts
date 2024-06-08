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

  static async addItemToCart(req: Request, res: Response) {
    try {
      const { product_id, user_id } = req.body;
      if (!product_id || !user_id) {
        return res.json({ message: "Something is missing?" });
      }

      const data: any = await ProductService.userAddItemToCart(req);

      if (data.error === "OUT_OF_STOCK") {
        return res.status(404).json({
          message: "Oops! Item out of stock",
        });
      }

      if (data?.status === 404) {
        return sendResponse(
          data?.status,
          "Oops! Failed to Add Item To Cart!",
          data,
          res
        );
      }

      return sendResponse(201, "Item Added Successfully", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductsDiscount(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.id, 10);
      const customerSegment = req.query.customerSegment as string;

      const product = await ProductService.getProductsDiscount(
        productId,
        customerSegment,
        []
      );

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default ProductController;
