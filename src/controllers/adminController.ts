import User from "../database/models/userModel";

import Product from "../database/models/productModel";

import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import { validateHandleAdminDeleteProduct, validateHandleAdminDeleteUser, validateHandleAdminEditUser } from "../validators/validateAdminData";

import IUser from "../types/userInterface";

import { Model } from "sequelize";

const handleAdminEditUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAdminEditUser(req.body);

  if (error) return res.status(400).json({ error });

  const userEmail: string = req.body.userEmail;

  const userNewEmail: string = req.body.userNewEmail;

  const userNewPassword: string = req.body.userNewPassword;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail }
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const editedUser: [affectedCount: number] = await User.update(
      {
        userNewEmail, password: bcrypt.hashSync(userNewPassword)
      },
      { where: { email: userEmail } });

    if (editedUser[0] === 0) {
      return res.status(500).json({ error: "Falha ao atualizar usuario!" });
    };

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleAdminDeleteUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAdminDeleteUser(req.body);

  if (error) return res.status(400).json({ error });

  const userEmail: string = req.body.userEmail;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail }
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const deletedUser: number = await User.destroy({
      where: { email: userEmail }
    });

    if (deletedUser === 0) {
      return res.status(500).json({ error: "Falha ao deletar usuario!" });
    };

    // eslint-disable-next-line no-unused-vars
    const deletedPosts: number = await Product.destroy({
      where: {
        userId: isUserRegistered.id
      }
    });

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleAdminDeleteProduct = async (req: Request, res: Response) => {
  const { error } = validateHandleAdminDeleteProduct(req.body);

  if (error) return res.status(400).json({ error });

  const productId: string = req.body.productId;

  try {
    const isProductRegistered: Model<any, any> | null = await Product.findOne({
      where: { id: productId }
    });

    if (isProductRegistered === null) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }

    const deletedProduct: number = await Product.destroy({
      where: { id: productId }
    });

    if (deletedProduct === 0) {
      return res.status(500).json({ error: "Falha ao deletar Produto!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

export { handleAdminEditUser, handleAdminDeleteUser, handleAdminDeleteProduct };
