import User from "../database/models/userModel";

import IReq from "../types/requestInterface";

import { Response, NextFunction } from "express";

import IUser from "../types/userInterface";

export default async function (req: IReq, res: Response, next: NextFunction) {
  const id: string = req.userId;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { id }
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const isUserAdmin: boolean = isUserRegistered.admin === true;

    if (isUserAdmin === false) {
      return res.status(401).json({ error: "Não autorizado!" });
    };

    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
}
