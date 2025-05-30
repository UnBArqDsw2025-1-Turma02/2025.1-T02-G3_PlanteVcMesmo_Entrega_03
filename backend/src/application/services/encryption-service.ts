export namespace EncryptionService {
  export namespace Encrypt {
    export type Input = {
      refreshToken: string;
    };

    export type Output = {
      encryptedRefreshToken: string;
      encryptionIV: string;
    };
  }

  export namespace Decrypt {
    export type Input = {
      encryptedRefreshToken: string;
      encryptionIV: string;
    };

    export type Output = {
      refreshToken: string;
    };
  }
}

export interface EncryptionService {
  encrypt(
    input: EncryptionService.Encrypt.Input,
  ): EncryptionService.Encrypt.Output;
  decrypt(
    input: EncryptionService.Decrypt.Input,
  ): EncryptionService.Decrypt.Output;
}
