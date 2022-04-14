import User from '../models/userModel.js';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

import { registerValidate, loginValidate } from './validateData.js';

let handleNewUser = (req, res) => {
    let { error } = registerValidate(req.body);

    if (error) return res.status(400).json({ error });
};
