import express from 'express';

import {
    handleNewProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleGetOneProduct,
    handleGetAllProducts
} from '../controllers/productController.js';

import authController from '../controllers/authController';
