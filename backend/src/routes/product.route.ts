import { Router } from "express";
import ProductController from "../controller/product.controller";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.createProduct);

export default router;
