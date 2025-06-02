import { ApiError } from '@/application/errors';

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Unauthorized User', 'UnauthorizedError', 401);
  }
}
