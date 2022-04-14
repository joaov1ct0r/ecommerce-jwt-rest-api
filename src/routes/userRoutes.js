import express from 'express';

import {
    handleNewUser,
    handleUserLogin,
    handleEditUser,
    handleDeleteUser,
    handleOneUser,
    handleAllUsers
} from '../controllers/userController.js';

import authController from '../controllers/authController.js';

let userRouter = express.Router();

userRouter.get('/user/:id', authController, handleOneUser);
