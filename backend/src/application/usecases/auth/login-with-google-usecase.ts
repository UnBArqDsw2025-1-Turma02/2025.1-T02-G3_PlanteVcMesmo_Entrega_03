import { UserRepository } from '@/application/repositories';
import {
  Validator,
  EncryptionService,
  AuthService,
  JwtService,
} from '@/application/services';

export class LoginWithGoogleUsecase {
  constructor(
    private readonly validator: Validator<LoginWithGoogleUsecase.Input>,
    private readonly googleAuthService: AuthService,
    private readonly userRepositoy: UserRepository,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    input: LoginWithGoogleUsecase.Input,
  ): Promise<LoginWithGoogleUsecase.Output> {
    const { code } = await this.validator.validate(input);

    const { idToken, refreshToken } = await this.googleAuthService.getToken({
      code,
    });

    const payload = await this.googleAuthService.getPayload({ token: idToken });

    const { encryptedRefreshToken, encryptionIV } =
      this.encryptionService.encrypt({ refreshToken });

    const user = await this.userRepositoy.upsert({
      email: payload.email,
      name: payload.name,
      pictureUrl: payload.pictureUrl,
      encryptedRefreshToken,
      encryptionIV,
      role: 'user',
    });

    const signInput = {
      payload: {
        ...payload,
        userId: user.id,
        role: user.role,
      },
      isRefresh: false,
    };

    const token = await this.jwtService.sign(signInput);
    const refresh = await this.jwtService.sign({
      ...signInput,
      isRefresh: true,
    });

    return {
      token,
      refresh,
    };
  }
}

export namespace LoginWithGoogleUsecase {
  export type Input = {
    code: string;
  };

  export type Output = {
    token: string;
    refresh: string;
  };
}
