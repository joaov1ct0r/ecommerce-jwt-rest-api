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

    let user = User.build({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });

    try {
        let savedUser = await user.save();

        if (!savedUser)
            return res.status(500).json({ error: 'Erro ao salvar usuario!' });

        res.status(200).json({ message: 'Usuario cadastrado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleUserLogin = async (req, res) => {
    let { error } = loginValidate(req.body);

    if (error) return res.status(400).json({ error });
};
