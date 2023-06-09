import dotenv from "dotenv";
import cors from "cors";

import connectToDatabase from "./database.js";
import express from "express";

//Our Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://ecommerce-blush-beta.vercel.app",
  })
);

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
