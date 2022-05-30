import "dotenv/config";

import cors from "cors";

import cookieParser from "cookie-parser";

import express from "express";

import productRouter from "./routes/productRoutes";

import userRouter from "./routes/userRoutes";

const app: express.Express = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.listen(process.env.SERVER_PORT, (): void => {
  console.log("Server running!");
});
