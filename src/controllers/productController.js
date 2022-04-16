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
    let { id } = req.params;

    if (!id) return res.status(500).json({ error: 'ID não encontrado!' });
};
