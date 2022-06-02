import User from "../database/models/userModel";

import Product from "../database/models/productModel";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

import IReq from "../types/requestInterface";

import IUser from "../types/userInterface";

import { Request, Response } from "express";

import { validateHandleNewUser, validateHandleUserLogin, validateHandleEditUser, validateHandleOneUser } from "../validators/validateUserData";

const handleNewUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleNewUser(req.body);

  if (error) return res.status(400).json({ error });

  const email: string = req.body.email;

  const password: string = req.body.password;

  try {
    const registeredUser: IUser | null = await User.findOne({
      where: { email }
    });

    if (registeredUser !== null) {
      return res.status(400).json({ error: "Usuario já registrado!" });
    };

    const newUser: IUser = await User.create({
      email,
      password: bcrypt.hashSync(password)
    });

    return res.status(201).json({ newUser });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleUserLogin = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleUserLogin(req.body);

  if (error) return res.status(400).json({ error });

  const email: string = req.body.email;

  const password: string = req.body.password;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email }
    });

    if (isUserRegistered === null) {
      return res.status(400).json({ error: "Falha na autenticação!" });
    }

    const matchingPasswords: boolean = bcrypt.compareSync(
      password,
      isUserRegistered.password
    );

    if (matchingPasswords === false) {
      return res.status(400).json({ error: "Falha na autenticação!" });
    }

    const token: string = jwt.sign(
      {
        id: isUserRegistered.id
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: 300 }
    );

    if (token.length === 0) {
      return res.status(500).json({ error: "Falha na autenticação!" });
    }

    res.cookie("authentication", `Bearer ${token}`, { httpOnly: true });

    return res.status(200).json({ message: "Login realizado com sucesso!" });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleEditUser = async (req: IReq, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleEditUser(req.body);

  if (error) return res.status(400).json({ error });

  const id: string | undefined = req.userId;

  const email: string = req.body.email;

  const password: string = req.body.password;

  try {
    const editedUser: [affectedCount: number] = await User.update(
      { email, password: bcrypt.hashSync(password) },
      {
        where: { id }
      }
    );

    if (editedUser[0] === 0) {
      return res
        .status(500)
        .json({ error: "Falha ao atualizar usuario!" });
    }
    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleDeleteUser = async (req: IReq, res: Response): Promise<Response<any, Record<string, any>>> => {
  const id: string | undefined = req.userId;

  try {
    const deletedUser: number = await User.destroy({
      where: { id }
    });

    if (deletedUser === 0) {
      return res.status(500).json({ error: "Falha ao deletar usuario!" });
    }

    // eslint-disable-next-line no-unused-vars
    const deletedProducts = await Product.destroy({
      where: { userId: id }
    });

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleAllUsers = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const users: IUser[] = await User.findAll({ include: Product });

    return res.status(200).json({ users });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleOneUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleOneUser(req.body);

  if (error) return res.status(400).json({ error });

  const email: string = req.body.email;

  try {
    const user: IUser | null = await User.findOne({
      include: Product,
      where: { email }
    });

    if (user === null) {
      return res.status(500).json({ error: "Falha ao obter dados!" });
    }

    return res.status(200).json({ user });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

export {
  handleNewUser,
  handleUserLogin,
  handleEditUser,
  handleDeleteUser,
  handleOneUser,
  handleAllUsers
};
