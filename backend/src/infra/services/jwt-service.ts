import { JwtService } from '@/application/services';
import jwt from 'jsonwebtoken';
import env from '@/env';

export class JwtServiceImpl implements JwtService {
  async sign(input: JwtService.Sign.Input): Promise<JwtService.Sign.Output> {
    const { payload, isRefresh } = input;
    const secret = this.getSecret(isRefresh);
    const expiresIn = this.getExpiresIn(isRefresh);

    const token = jwt.sign(payload as object, secret, {
      expiresIn,
    } as jwt.SignOptions);

    return token;
  }

  async verify(
    input: JwtService.Verify.Input,
  ): Promise<JwtService.Verify.Output> {
    const { token, isRefresh } = input;
    const secret = this.getSecret(isRefresh);

    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    const { userId, email, pictureUrl, role, name } = payload;
    return {
      userId,
      email,
      pictureUrl,
      role,
      name,
    };
  }

  private getSecret(isRefresh: boolean): string {
    return isRefresh ? env.REFRESH_TOKEN_SECRET : env.ACCESS_TOKEN_SECRET;
  }

  private getExpiresIn(isRefresh: boolean): string {
    return isRefresh ? env.JWT_REFRESH_EXPIRES_IN : env.JWT_EXPIRES_IN;
  }
}
