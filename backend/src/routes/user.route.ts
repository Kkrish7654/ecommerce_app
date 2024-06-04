import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);

export default router;
