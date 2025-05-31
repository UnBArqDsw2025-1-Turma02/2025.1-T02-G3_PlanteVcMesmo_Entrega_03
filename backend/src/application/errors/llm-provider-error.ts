import { ApiError } from './api-error';

export class LLMProviderError extends ApiError {
  constructor(
    message: string,
    name: string = 'LLMProviderError',
    status: number = 503,
    extraFields?: any,
    code?: string,
  ) {
    super(message, name, status, extraFields, code);
  }
}
