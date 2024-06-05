import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CartService from "./cart.service";
const prisma = new PrismaClient();

const cart = new CartService();
class UserService {
  static async userCreate(req: Request, res: Response) {
    const { username, name, email, password } = req.body;

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const vaildateEmail = await prisma.$queryRaw<any[]>`
       SELECT EXISTS (SELECT 1 FROM users WHERE email = ${email});
    `;

    const vaildateUsername = await prisma.$queryRaw<any[]>`
    SELECT EXISTS (SELECT 1 FROM users WHERE username = ${username});
    `;

    if (vaildateEmail[0].exists === true) {
      return {
        ...vaildateEmail,
        message: "Email Already Exist",
      };
    } else if (vaildateUsername[0].exists === true) {
      return {
        ...vaildateUsername,
        message: "Username Already Exist",
      };
    }

    const query: Prisma.usersCreateArgs = {
      data: {
        username: username,
        name: name,
        email: email,
        password: hashPassword,
      },
    };

    const data = await prisma.users.create(query);

    return { data: data };
  }

  static async loginUser(req: Request) {
    const { email, password } = req.body;

    const secretKey: string = process.env.SECRET_KEY as string;

    const user = await prisma.users.findFirst({
      where: { email: email },
    });

    if (user) {
      const val = await bcrypt.compare(password, user.password);

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
      };
      if (val) {
        const token = jwt.sign(payload, secretKey, {
          expiresIn: "1h",
        });

        return { token: token, data: payload };
      } else {
        return { status: 404, message: "Incorrect Password!" };
      }
    } else {
      return { message: "user not found" };
    }
  }

  static async userAddItemToCart(req: Request) {
    const { product_id, user_id, quantity } = req.body;
    const data = await cart.addItem(user_id, product_id, quantity);
    return data;
  }
}

export default UserService;
