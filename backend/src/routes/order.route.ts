import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import OrderController from "../controller/order.controller";

const router = Router();

router.post("/create", requireAuth, OrderController.createOrder);
router.get("/", requireAuth, OrderController.getOrders);
router.put("/update", requireAuth, OrderController.updateOrder);

export default router;
