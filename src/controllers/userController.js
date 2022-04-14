import User from '../models/userModel.js';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

import { registerValidate, loginValidate } from './validateData.js';

let handleNewUser = async (req, res) => {
    let { error } = registerValidate(req.body);

    if (error) return res.status(400).json({ error });

    let registeredUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (registeredUser)
        return res.status(400).json({ error: 'Usuario já registrado!' });
};
