import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    let { auth } = req.cookies;

    if (!auth) return res.status(400).json({ error: 'Token não encontrado!' });

    try {
        let userVerified = jwt.verify(auth, process.env.JWT_TOKEN_SECRET);

        if (!userVerified)
            return res
                .status(400)
                .json({ error: 'Falha na autenticação de token!' });
    } catch (error) {
        throw error;
    }
}
