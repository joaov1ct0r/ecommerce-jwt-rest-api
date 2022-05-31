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

productRouter.post("/register", auth, handleNewProduct);

productRouter.put("/edit", auth, handleEditProduct);

productRouter.delete(
  "/delete",
  auth,
  handleDeleteProduct
);

productRouter.get("/all", auth, handleGetAllProducts);

productRouter.get(
  "/product",
  auth,
  handleGetOneProduct
);

export default productRouter;
