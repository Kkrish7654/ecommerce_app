"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class UserService {
    static async userCreate(req, res) {
        const { username, name, email, password } = req.body;
        const salt = 10;
        const hashPassword = await bcrypt_1.default.hash(password, salt);
        const vaildateEmail = await prisma.$queryRaw `
       SELECT EXISTS (SELECT 1 FROM users WHERE email = ${email});
    `;
        const vaildateUsername = await prisma.$queryRaw `
    SELECT EXISTS (SELECT 1 FROM users WHERE username = ${username});
    `;
        if (vaildateEmail[0].exists === true) {
            return {
                ...vaildateEmail,
                message: "Email Already Exist",
            };
        }
        else if (vaildateUsername[0].exists === true) {
            return {
                ...vaildateUsername,
                message: "Username Already Exist",
            };
        }
        const query = {
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
    static async loginUser(req) {
        const { email, password } = req.body;
        const secretKey = process.env.SECRET_KEY;
        const user = await prisma.users.findFirst({
            where: { email: email },
        });
        if (user) {
            const val = await bcrypt_1.default.compare(password, user.password);
            const payload = {
                id: user.id,
                email: user.email,
                username: user.username,
                name: user.name,
            };
            if (val) {
                const token = jsonwebtoken_1.default.sign(payload, secretKey, {
                    expiresIn: "1h",
                });
                return { token: token, data: payload };
            }
            else {
                return { status: 404, message: "Incorrect Password!" };
            }
        }
        else {
            return { message: "user not found" };
        }
    }
}
exports.default = UserService;
