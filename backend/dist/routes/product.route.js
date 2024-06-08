"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const router = (0, express_1.Router)();
router.get("/", product_controller_1.default.getAllProducts);
router.post("/", upload_middleware_1.default.fields([
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
]), product_controller_1.default.createProduct);
router.post("/add-cart", auth_middleware_1.requireAuth, product_controller_1.default.addItemToCart);
exports.default = router;
