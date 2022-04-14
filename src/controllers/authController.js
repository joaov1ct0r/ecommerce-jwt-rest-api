import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    let { auth } = req.cookies;

    if (!auth) return res.status(400).json({ error: 'Token não encontrado!' });
}
