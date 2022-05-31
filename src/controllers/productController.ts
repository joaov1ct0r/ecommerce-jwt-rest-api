import User from "../database/models/userModel";

import Product from "../database/models/productModel";

import { validateHandleDeleteProduct, validateHandleEditProduct, validateHandleGetOneProduct, validateHandleNewProduct } from "../validators/validateProductData";

import IReq from "../types/requestInterface";

import { Request, Response } from "express";

import { Model } from "sequelize";

const handleNewProduct = async (req: IReq, res: Response) => {
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

let handleEditProduct = async (req, res) => {
  let { id, productId } = req.params;

  let { error } = validateProductData(req.body);

  if (error) return res.status(400).json({ error });

  let registeredUser = await User.findOne({
    where: { id }
  });

  if (!registeredUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  let { title, description, amount, price } = req.body;

  try {
    let editedProduct = await Product.update(
      { title, description, amount, price, userId: registeredUser.id },
      {
        where: { id: productId }
      }
    );

    if (!editedProduct)
      return res.status(500).json({ error: 'Falha ao editar produto!' });

    res.status(200).json({ message: 'Produto editado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleDeleteProduct = async (req, res) => {
  let { id, productId } = req.params;

  let registeredUser = await User.findOne({
    where: { id }
  });

  if (!registeredUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  let registeredProduct = await Product.findOne({
    where: { id: productId }
  });

  if (!registeredProduct)
    return res.status(400).json({ error: 'Produto não encontrado!' });

  try {
    let deletedProduct = await Product.destroy({
      where: { id: productId }
    });

    if (!deletedProduct)
      return res.status(500).json({ error: 'Falha ao deletar produto!' });

    res.status(200).json({ message: 'Produto deletado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleGetAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll({ include: User });

    if (!products)
      return res.status(500).json({ error: 'Falha ao obter dados!' });

    res.status(200).json({ products });
  } catch (error) {
    throw error;
  }
};

let handleGetOneProduct = async (req, res) => {
  let { id, productId } = req.params;

  let registeredUser = await User.findOne({
    where: { id }
  });

  if (!registeredUser)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  let registeredProduct = await Product.findOne({
    where: { id: productId }
  });

  if (!registeredProduct)
    return res.status(400).json({ error: 'Produto não encontrado!' });

  try {
    let product = await Product.findByPk(productId, { include: User });

    if (!product)
      return res
        .status(500)
        .json({ error: 'Falha ao obter dados do produto!' });

    res.status(200).json({ product });
  } catch (error) {
    throw error;
  }
};

export {
  handleNewProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleGetOneProduct,
  handleGetAllProducts
};
