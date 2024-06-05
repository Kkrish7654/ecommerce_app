"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.default.createUser);
router.post("/login", user_controller_1.default.loginUser);
router.post("/add-cart", auth_middleware_1.requireAuth, user_controller_1.default.addItemToCart);
exports.default = router;
