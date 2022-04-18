import User from '../models/userModel.js';

import Product from '../models/productModel.js';

import { validateProductData } from './validateProductData.js';

let handleNewProduct = async (req, res) => {
    let { id } = req.params;

    if (!id) return res.status(400).json({ error: 'ID não encontrado!' });

    let { error } = validateProductData(req.body);

    if (error) return res.status(400).json({ error });

    let registeredUser = await User.findOne({
        where: { id }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    let { title, description, amount, price } = req.body;

    try {
        let newProduct = await Product.create({
            title,
            description,
            amount,
            price,
            userId: registeredUser.id
        });

        if (!newProduct)
            return res
                .status(500)
                .json({ error: 'Falha ao registrar novo produto!' });

        res.status(200).json({ newProduct });
    } catch (error) {
        throw error;
    }
};

let handleEditProduct = async (req, res) => {
    let { id, productId } = req.params;

    if (!id) return res.status(400).json({ error: 'ID não encontrado!' });

    if (!productId)
        return res.status(400).json({ error: 'ID do produto não encontrado!' });

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

        res.status(200).json({ editedProduct });
    } catch (error) {
        throw error;
    }
};

let handleDeleteProduct = async (req, res) => {
    let { id, productId } = req.params;

    if (!id) return res.status(400).json({ error: 'ID não encontrado!' });

    if (!productId)
        return res.status(400).json({ error: 'ID do produto não encontrado!' });

    let registeredUser = await User.findOne({
        where: { id }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

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

let handleGetOneProduct = async (req, res) => {
    let { id, productId } = req.params;

    if (!id) return res.status(400).json({ error: 'ID não encontrado!' });

    if (!productId)
        return res.status(400).json({ error: 'ID de produto não encontrado!' });

    let registeredUser = await User.findOne({
        where: { id }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

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

export {
    handleNewProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleGetOneProduct
};
