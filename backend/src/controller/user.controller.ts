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
}

export default UserController;
