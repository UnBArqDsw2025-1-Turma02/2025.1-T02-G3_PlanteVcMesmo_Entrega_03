export namespace JwtService {
  export type Payload = {
    userId: string;
    email: string;
    pictureUrl: string;
    role: string;
    name: string;
  };

  export namespace Sign {
    export type Input = {
      payload: JwtService.Payload;
      isRefresh: boolean;
    };

    export type Output = string;
  }

  export namespace Verify {
    export type Input = {
      token: string;
      isRefresh: boolean;
    };

    export type Output = JwtService.Payload;
  }
}

export interface JwtService {
  sign(input: JwtService.Sign.Input): Promise<JwtService.Sign.Output>;
  verify(input: JwtService.Verify.Input): Promise<JwtService.Verify.Output>;
}
