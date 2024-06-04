"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
const requireAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, secretKey, (err) => {
            if (err) {
                return res.status(403).json({
                    status: "unAuthorised",
                });
            }
            if (token) {
                next();
            }
        });
    }
    else {
        res.status(403).json({
            status: "unAuthorised",
        });
    }
};
exports.requireAuth = requireAuth;
