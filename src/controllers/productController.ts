import User from "../database/models/userModel";

import Product from "../database/models/productModel";

import { validateHandleDeleteProduct, validateHandleEditProduct, validateHandleGetOneProduct, validateHandleNewProduct } from "../validators/validateProductData";

import IReq from "../types/requestInterface";

import { Request, Response } from "express";

import { Model } from "sequelize";

const handleNewProduct = async (req: IReq, res: Response): Promise<Response<any, Record<string, any>>> => {
  const id: string | undefined = req.userId;

  const { error } = validateHandleNewProduct(req.body);

  if (error) return res.status(400).json({ error });

  const title: string = req.body.title;

  const description: string = req.body.description;

  const amount: string = req.body.amount;

  const price: string = req.body.price;

  try {
    const newProduct: Model<any, any> = await Product.create({
      title,
      description,
      amount,
      price,
      userId: id
    });

    return res.status(201).json({ newProduct });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleEditProduct = async (req: IReq, res: Response): Promise<Response<any, Record<string, any>>> => {
  const id: string | undefined = req.userId;

  const productId: string = req.body.productId;

  const { error } = validateHandleEditProduct(req.body);

  if (error) return res.status(400).json({ error });

  const title: string = req.body.title;

  const description: string = req.body.description;

  const amount: string = req.body.amount;

  const price: string = req.body.price;

  try {
    const isProductRegistered: Model<any, any> | null = await Product.findOne({
      where: { id: productId }
    });

    if (isProductRegistered === null) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    };

    const editedProduct = await Product.update(
      { title, description, amount, price, userId: id },
      {
        where: { id: productId }
      }
    );

    if (editedProduct[0] === 0) {
      return res.status(500).json({ error: "Falha ao editar produto!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleDeleteProduct = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleDeleteProduct(req.body);

  if (error) return res.status(400).json({ error });

  const productId: string = req.body.productId;

  try {
    const isProductRegistered: Model<any, any> | null = await Product.findOne({
      where: { id: productId }
    });

    if (isProductRegistered === null) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    };

    const deletedProduct: number = await Product.destroy({
      where: { id: productId }
    });

    if (deletedProduct === 0) {
      return res.status(500).json({ error: "Falha ao deletar produto!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleGetAllProducts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const products: Model<any, any>[] = await Product.findAll({ include: User });

    return res.status(200).json({ products });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleGetOneProduct = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleGetOneProduct(req.body);

  if (error) return res.status(400).json({ error });

  const productId: string = req.body.productId;

  try {
    const product: Model<any, any> | null = await Product.findOne({
      where: { id: productId }
    });

    if (product === null) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    };

    return res.status(200).json({ product });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

export {
  handleNewProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleGetOneProduct,
  handleGetAllProducts
};
