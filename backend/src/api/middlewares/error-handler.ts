import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/application/errors';

export function errorHandler(
  err: ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      fields: err?.extraFields,
      message: err.message,
      code: err?.code,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
}
