import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import cors from "cors";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

export default app;
