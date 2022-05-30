import express from 'express';

import {
    handleNewProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleGetOneProduct,
    handleGetAllProducts
} from '../controllers/productController.js';

import authController from '../middlewares/authController.js';

let productRouter = express.Router();

productRouter.post('/register/:id', authController, handleNewProduct);

productRouter.put('/edit/:id/:productId', authController, handleEditProduct);

productRouter.delete(
    '/delete/:id/:productId',
    authController,
    handleDeleteProduct
);

productRouter.get('/all', authController, handleGetAllProducts);

productRouter.get(
    '/product/:id/:productId',
    authController,
    handleGetOneProduct
);

export default productRouter;
