import User from "../database/models/userModel"

import Product from "../database/models/productModel";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

import IReq from "../types/requestInterface";

import IUser from "../types/userInterface";

import { Request, Response } from "express";

import { validateHandleNewUser, validateHandleUserLogin, validateHandleEditUser, validateHandleOneUser } from "../validators/validateUserData";

const handleNewUser = async (req: Request, res: Response) => {
  const { error } = validateHandleNewUser(req.body);

  if (error) return res.status(400).json({ error });

  const email: string = req.body.email;

  const password: string = req.body.password;

  const registeredUser = await User.findOne({
    where: { email }
  });

  if (registeredUser)
    return res.status(400).json({ error: 'Usuario já registrado!' });

  try {
    let newUser = User.create({
      email,
      password: bcrypt.hashSync(password)
    });

    if (!newUser)
      return res.status(500).json({ error: 'Falha ao salvar usuario!' });

    res.status(200).json({ message: 'Usuario cadastrado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleUserLogin = async (req, res) => {
  let { error } = validateUserData(req.body);

  if (error) return res.status(400).json({ error });

  let { email, password } = req.body;

  let registeredUser = await User.findOne({
    where: { email }
  });

  if (!registeredUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  let comparedPassword = bcrypt.compareSync(
    password,
    registeredUser.password
  );

  if (!comparedPassword)
    return res.status(400).json({ error: 'Falha na autenticação!' });

  try {
    let token = jwt.sign(
      {
        id: registeredUser.id
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

let handleEditUser = async (req, res) => {
  let { error } = validateUserData(req.body);

  if (error) return res.status(400).json({ error });

  let { id } = req.params;

  let { email, password } = req.body;

  let registeredUser = await User.findOne({
    where: { id }
  });

  if (!registeredUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  try {
    let editedUser = await User.update(
      { email, password: bcrypt.hashSync(password) },
      {
        where: { id }
      }
    );

    if (!editedUser)
      return res
        .status(500)
        .json({ error: 'Falha ao atualizar usuario!' });

    res.status(200).json({ message: 'Usuario atualizado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleDeleteUser = async (req, res) => {
  let { id } = req.params;

  let registedUser = await User.findOne({
    where: { id }
  });

  if (!registedUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  try {
    let deletedUser = await User.destroy({
      where: { id }
    });

    if (!deletedUser)
      return res.status(500).json({ error: 'Falha ao deletar usuario!' });

    let deletedProducts = await Product.destroy({
      where: { userId: id }
    });

    res.status(200).json({ message: 'Usuario deletado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({ include: Product });

    if (!users)
      return res.status(500).json({ error: 'Falha ao obter dados!' });

    res.status(200).json({ users });
  } catch (error) {
    throw error;
  }
};

let handleOneUser = async (req, res) => {
  let { id } = req.params;

  if (!id) return res.status(400).json({ error: 'ID não encontrado!' });

  let registeredUser = await User.findOne({
    where: { id }
  });

  if (!registeredUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  try {
    let user = await User.findByPk(id, { include: Product });

    if (!user)
      return res.status(500).json({ error: 'Falha ao obter dados!' });

    res.status(200).json({ user });
  } catch (error) {
    throw error;
  }
};

export {
  handleNewUser,
  handleUserLogin,
  handleEditUser,
  handleDeleteUser,
  handleOneUser,
  handleAllUsers
};
