import { Request, Response } from "express";
import OrderService from "../service/order.service";
import { sendResponse } from "../utils/response";
import { orderItem, orderStatus } from "../utils/types";
import ProductService from "../service/product.service";

class OrderController {
  static async createOrder(req: Request, res: Response) {
    const { user_id, order_items } = req.body;

    const { product_id, quantity } = order_items[0];

    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({
        message: "Please provide user_id and order_items",
      });
    }
    const productPrice = await ProductService.getProductAmountById(product_id);
    const total = (productPrice && productPrice * quantity) || 0;

    const orders: orderItem[] = [
      {
        product_id: product_id,
        quantity: quantity,
        price: productPrice || 0,
        total: total,
      },
    ];

    const orderData = {
      user_id,
      total_amount: total,
      status: orderStatus.PENDING,
      order_items: orders,
    };

    try {
      const data: any = await OrderService.createOrder(orderData);

      if (!data)
        return res.status(400).json({
          message: "Order not placed",
        });

      return sendResponse(200, "Order Placed", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getOrders(req: Request, res: Response) {
    try {
      const data = await OrderService.getOrders();

      if (!data)
        return res.status(400).json({
          message: "No orders found",
        });

      return sendResponse(200, "Orders Fetched", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static updateOrder = async (req: Request, res: Response) => {
    const { order_id, status } = req.body;

    if (!order_id || !status) {
      return res.status(400).json({
        message: "Please provide order_id and status",
      });
    }

    try {
      const data = await OrderService.updateOrder(order_id, status);

      if (!data)
        return res.status(400).json({
          message: "Order not updated",
        });

      return sendResponse(200, "Order Updated", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default OrderController;
