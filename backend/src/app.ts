import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Routes Import
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import orderRoutes from "./routes/order.route";

import cors from "cors";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

export default app;
