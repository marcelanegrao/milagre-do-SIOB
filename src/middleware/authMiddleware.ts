import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/environment";
import { UnauthorizedError } from "../shared/errors/api-errors";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Acesso negado. Token não fornecido.");
  }

  try {
    const user = jwt.verify(token, env.jwtSecret);
    (req as any).user = user;
    next();
  } catch (err) {
    throw new UnauthorizedError("Token inválido ou expirado.");
  }
};
