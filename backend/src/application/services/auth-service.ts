export namespace AuthService {
  export namespace GetToken {
    export type Input = {
      code: string;
    };

    export type Output = {
      idToken: string;
      accessToken: string;
      refreshToken: string;
    };
  }

  export namespace GetPayload {
    export type Input = {
      token: string;
    };

    export type Output = {
      email: string;
      name: string;
      pictureUrl: string;
    };
  }

  export namespace GetAccessToken {
    export type Input = {
      refreshToken: string;
    };

    export type Output = {
      accessToken: string;
    };
  }
}

export interface AuthService {
  getToken(
    input: AuthService.GetToken.Input,
  ): Promise<AuthService.GetToken.Output>;
  getPayload(
    input: AuthService.GetPayload.Input,
  ): Promise<AuthService.GetPayload.Output>;
  getAccessToken(
    input: AuthService.GetAccessToken.Input,
  ): Promise<AuthService.GetAccessToken.Output>;
}
