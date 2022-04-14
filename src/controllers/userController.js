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

let handleEditUser = async (req, res) => {
    let { id } = req.params;

    if (!id) return res.status(400).json({ error: 'ID não encontrado' });

    let { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: 'Falha ao obter dados!' });

    try {
        let user = await User.update(
            { email, password },
            {
                where: {
                    id
                }
            }
        );

        if (!user)
            return res
                .status(500)
                .json({ error: 'Falha ao atualizar usuario!' });

        res.status(200).json({ message: 'Usuario atualizado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleUserLogin = async (req, res) => {
    let { error } = loginValidate(req.body);

    if (error) return res.status(400).json({ error });

    let selectedUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!selectedUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    let comparedPassword = bcrypt.compareSync(
        req.body.password,
        selectedUser.password
    );

    if (!comparedPassword)
        return res.status(400).json({ error: 'Falha na autenticação!' });

    try {
        let token = jwt.sign(
            {
                id: selectedUser.id
            },
            process.env.JWT_TOKEN_SECRET
        );

        if (!token)
            return res.status(500).json({ error: 'Falha na autenticação!' });

        res.cookie('auth', token, { httpOnly: true });

        res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleAllUsers = async (req, res) => {
    try {
        let users = await User.findAll({});

        if (!users)
            return res.status(500).json({ error: 'Falha ao obter dados!' });

        res.status(200).json(users);
    } catch (error) {
        throw error;
    }
};
