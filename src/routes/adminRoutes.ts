import express from "express";

import { handleAdminDeleteProduct, handleAdminDeleteUser, handleAdminEditUser } from "../controllers/adminController";

import auth from "../middlewares/auth";

import admin from "../middlewares/admin";
