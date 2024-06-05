import { Request, Response } from "express";
import UserService from "../service/user.service";
import { sendResponse } from "../utils/response";

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, name, email, password } = req.body;

      if (!username || !name || !email || !password) {
        return res.json({ message: "Something is missing?" });
      }

      const data: any = await UserService.userCreate(req, res);

      if (data && data[0]?.exists === true)
        return res.status(401).json({
          message: data.message,
        });
      return sendResponse(200, "User added", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: "Something is missing?" });
      }

      const data: any = await UserService.loginUser(req);

      if (data?.status === 404) {
        return sendResponse(data?.status, "Login Failed", data, res);
      }

      return sendResponse(201, "Login Succesfully", data, res);
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

      const data: any = await UserService.userAddItemToCart(req);

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
}

export default UserController;
