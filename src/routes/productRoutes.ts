import express from "express";

import {
  handleNewProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleGetOneProduct,
  handleGetAllProducts
} from "../controllers/productController";

import auth from "../middlewares/auth";

const productRouter: express.Router = express.Router();

productRouter.post("/register/:id", auth, handleNewProduct);

productRouter.put("/edit/:id/:productId", auth, handleEditProduct);

productRouter.delete(
  "/delete/:id/:productId",
  auth,
  handleDeleteProduct
);

productRouter.get("/all", auth, handleGetAllProducts);

productRouter.get(
  "/product/:id/:productId",
  auth,
  handleGetOneProduct
);

export default productRouter;
