import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/application/errors';

export function errorHandler(
  err: ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      fields: err.extraFields,
      message: err.message,
      code: err.code,
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
