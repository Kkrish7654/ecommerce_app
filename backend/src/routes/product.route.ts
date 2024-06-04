import { Router } from "express";
import ProductController from "../controller/product.controller";
import { requireAuth } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 8,
    },
  ]),
  ProductController.createProduct
);

export default router;
