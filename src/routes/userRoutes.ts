import express from "express";

import {
  handleNewUser,
  handleUserLogin,
  handleEditUser,
  handleDeleteUser,
  handleOneUser,
  handleAllUsers
} from "../controllers/userController";

import auth from "../middlewares/auth";

const userRouter: express.Router = express.Router();

userRouter.post("/register", handleNewUser);

userRouter.post("/login", handleUserLogin);

userRouter.put("/edit/:id", auth, handleEditUser);

userRouter.delete("/delete/:id", auth, handleDeleteUser);

userRouter.get("/all", auth, handleAllUsers);

userRouter.get("/user/:id", auth, handleOneUser);

export default userRouter;
