import { UnauthorizedError } from '@/application/errors';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JwtService } from '@/application/services';
import logger from '@/infra/logger';

export class AuthenticationUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(
    input: AuthenticationUseCase.Input,
  ): Promise<AuthenticationUseCase.Output> {
    const { token } = input;
    try {
      const payload = await this.jwtService.verify({ token, isRefresh: false });
      return payload;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        logger.error(`${error.name}: ${error.message}`);
        throw new UnauthorizedError(error.message);
      }

      throw new Error(`Unexpected error during authentication: ${error}`);
    }
  }
}

export namespace AuthenticationUseCase {
  export type Input = {
    token: string;
  };
  export type Output = {
    userId: string;
    email: string;
    pictureUrl: string;
    role: string;
    name: string;
  };
}
