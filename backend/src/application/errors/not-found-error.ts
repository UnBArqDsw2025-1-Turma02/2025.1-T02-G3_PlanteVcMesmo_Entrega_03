import { ApiError } from '@/application/errors';

export class NotFoundError extends ApiError {
  public register: string;

  public metadata?: object;

  constructor(register: string, metadata?: object) {
    super(`${register} not found`, 'NotFoundError', 404);
    this.metadata = metadata;
    this.register = register;
  }
}
