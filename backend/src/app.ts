import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";

dotenv.config();

const app = express();

app.use(bodyParser.json());
// app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);

export default app;
