import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '@/application/errors';

export function authorizationMiddleware(allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.role) {
      throw new ForbiddenError();
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenError();
    }

    next();
  };
}
