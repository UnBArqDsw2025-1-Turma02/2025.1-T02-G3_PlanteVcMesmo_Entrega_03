import { UnauthorizedError } from '@/application/errors';
import { Request, Response, NextFunction } from 'express';
import { container } from '@/infra/container';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    throw new UnauthorizedError();
  }
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError();
  }

  const usecase = container.get('AuthenticationUseCase');
  const user = await usecase.execute({ token });
  req.user = user;

  next();
}
