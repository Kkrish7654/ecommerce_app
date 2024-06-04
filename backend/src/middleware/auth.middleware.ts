import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey: string = process.env.SECRET_KEY as string;

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err: any) => {
      if (err) {
        return res.status(403).json({
          status: "unAuthorised",
        });
      }

      if (token) {
        next();
      }
    });
  } else {
    res.status(403).json({
      status: "unAuthorised",
    });
  }
};
