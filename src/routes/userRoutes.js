import express from 'express';

import {
    handleNewUser,
    handleUserLogin,
    handleEditUser,
    handleDeleteUser,
    handleOneUser,
    handleAllUsers
} from '../controllers/userController.js';

import authController from '../middlewares/auth.js';

let userRouter = express.Router();

userRouter.post('/register', handleNewUser);

userRouter.post('/login', handleUserLogin);

userRouter.put('/edit/:id', authController, handleEditUser);

userRouter.delete('/delete/:id', authController, handleDeleteUser);

userRouter.get('/all', authController, handleAllUsers);

userRouter.get('/user/:id', authController, handleOneUser);

export default userRouter;
