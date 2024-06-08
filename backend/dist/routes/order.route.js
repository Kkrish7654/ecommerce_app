"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const order_controller_1 = __importDefault(require("../controller/order.controller"));
const router = (0, express_1.Router)();
router.post("/create", auth_middleware_1.requireAuth, order_controller_1.default.createOrder);
router.get("/", auth_middleware_1.requireAuth, order_controller_1.default.getOrders);
router.put("/update", auth_middleware_1.requireAuth, order_controller_1.default.updateOrder);
exports.default = router;
