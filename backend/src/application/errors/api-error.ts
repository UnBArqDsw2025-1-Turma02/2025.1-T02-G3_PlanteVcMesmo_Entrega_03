export class ApiError extends Error {
  constructor(
    public message: string,
    public name: string = 'ApiError',
    public status: number = 400,
    public extraFields?: any,
    public code?: string,
  ) {
    super(message);
  }
}
