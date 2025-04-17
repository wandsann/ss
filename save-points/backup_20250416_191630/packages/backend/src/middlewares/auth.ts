import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { AppError } from './errorHandler';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(401, 'Token não fornecido');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new AppError(401, 'Token mal formatado');
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      throw new AppError(401, 'Token inválido');
    }

    req.user = decoded;

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    }
    return next(new AppError(401, 'Erro na autenticação'));
  }
};

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError(401, 'Usuário não autenticado');
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError(403, 'Acesso negado');
      }

      return next();
    } catch (err) {
      if (err instanceof AppError) {
        return next(err);
      }
      return next(new AppError(403, 'Erro na verificação de permissão'));
    }
  };
}; 