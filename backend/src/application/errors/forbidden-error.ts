import { ApiError } from './api-error';

export class ForbiddenError extends ApiError {
  constructor() {
    super('Access Denied', 'ForbiddenError', 403);
  }
}
