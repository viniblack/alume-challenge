import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/AuthService';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      }
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        error: 'Não autenticado',
        message: 'Token não encontrado'
      });
      return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        error: 'Token inválido ou expirado',
        message: 'Faça login novamente para continuar'
      });
      return;
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao verificar autenticação'
    });
  }
}

export const checkUserOwnership = (req: Request, res: Response, next: NextFunction): void => {
  const { user } = req;
  const { userId } = req.params;

  if (userId && user && user.userId !== userId) {
    res.status(403).json({
      error: 'Acesso negado',
      message: 'Você não tem permissão para acessar este recurso'
    });
    return;
  }

  next();
}
