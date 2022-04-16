import User from '../models/userModel.js';

import Product from '../models/productModel.js';

import { validateProductData } from './validateProductData.js';

let handleNewProduct = async (req, res) => {
    let { id } = req.params;

    if (!id) return res.status(400).json({ error: 'ID não encontrado!' });

    let { error } = validateProductData(req.body);

    if (error) return res.status(400).json({ error });

    let user = await User.findOne({
        where: { id }
    });

    if (!user)
        return res.status(400).json({ error: 'Usuario não encontrado!' });
};
