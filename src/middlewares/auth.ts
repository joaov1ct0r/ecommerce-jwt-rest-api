import jwt from "jsonwebtoken";

import IJwt from "../types/jsonInterface";

import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.auth.split(" ")[1];

  if (token.length === 0) return res.status(400).json({ error: "Token não encontrado!" });

  try {
    const userVerified: IJwt = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string) as IJwt;

    if (!userVerified) {
      return res
        .status(400)
        .json({ error: "Falha na autenticação de token!" });
    };

    next();
  } catch (error) {
    return res.status(500).json({ error });
  };
};
