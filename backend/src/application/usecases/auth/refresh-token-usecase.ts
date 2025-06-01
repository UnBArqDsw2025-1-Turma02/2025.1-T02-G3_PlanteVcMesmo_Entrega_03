import { UnauthorizedError } from '@/application/errors';
import { JwtService } from '@/application/services';
import { JsonWebTokenError } from 'jsonwebtoken';

export class RefreshTokenUsecase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(
    input: RefreshTokenUsecase.Input,
  ): Promise<RefreshTokenUsecase.Output> {
    const { refreshToken } = input;
    try {
      const payload = await this.jwtService.verify({
        token: refreshToken,
        isRefresh: true,
      });

      const token = await this.jwtService.sign({
        payload,
        isRefresh: false,
      });

      return { token };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError('RefreshTokenExpiredError');
      }

      throw new Error(`Unexpected error during refresh token: ${error}`);
    }
  }
}

export namespace RefreshTokenUsecase {
  export type Input = {
    refreshToken: string;
  };
  export type Output = {
    token: string;
  };
}
