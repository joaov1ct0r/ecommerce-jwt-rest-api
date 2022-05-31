import User from "../database/models/userModel";

import Product from "../database/models/productModel";

import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import { validateHandleAdminDeleteProduct, validateHandleAdminDeleteUser, validateHandleAdminEditUser } from "../validators/validateAdminData";
