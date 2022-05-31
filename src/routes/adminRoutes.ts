import express from "express";

import { handleAdminDeleteProduct, handleAdminDeleteUser, handleAdminEditUser } from "../controllers/adminController";

import auth from "../middlewares/auth";

import admin from "../middlewares/admin";

const adminRouter: express.Router = express.Router();

adminRouter.put("/user/edit", auth, admin, handleAdminEditUser);

adminRouter.delete("/user/delete", auth, admin, handleAdminDeleteUser);

adminRouter.delete("/product/delete", auth, admin, handleAdminDeleteProduct);
