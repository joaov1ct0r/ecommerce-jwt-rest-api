import jwt from "jsonwebtoken";

import IJwt from "../types/jsonInterface";

import { Response, NextFunction } from "express";

import IReq from "../types/requestInterface";

export default function (req: IReq, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
  const token: string = req.cookies.authentication.split(" ")[1];

  if (token.length === 0) return res.status(400).json({ error: "Token não encontrado!" });

  try {
    const verifiedToken: IJwt = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string) as IJwt;

    if (!verifiedToken) {
      return res
        .status(400)
        .json({ error: "Falha na autenticação de token!" });
    };

    req.userId = verifiedToken.id;

    next();
  } catch (error) {
    return res.status(500).json({ error });
  };
};
