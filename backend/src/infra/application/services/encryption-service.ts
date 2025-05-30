import { EncryptionService } from '@/application/services';
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import env from '@/env';

export class EncryptionCryptoService implements EncryptionService {
  encrypt(
    input: EncryptionService.Encrypt.Input,
  ): EncryptionService.Encrypt.Output {
    const iv = randomBytes(16);
    const key = Buffer.from(env.AES_KEY, 'hex');
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(input.refreshToken, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encryptedRefreshToken: encrypted,
      encryptionIV: iv.toString('hex'),
    };
  }

  decrypt(
    input: EncryptionService.Decrypt.Input,
  ): EncryptionService.Decrypt.Output {
    const iv = Buffer.from(input.encryptionIV, 'hex');
    const key = Buffer.from(env.AES_KEY, 'hex');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(input.encryptedRefreshToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return {
      refreshToken: decrypted,
    };
  }
}
