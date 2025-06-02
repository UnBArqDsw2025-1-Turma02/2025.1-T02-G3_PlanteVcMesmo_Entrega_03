import { google } from 'googleapis';
import { AuthService } from '@/application/services';
import { OAuth2Client } from 'googleapis-common';
import env from '@/env';

export class GoogleAuthService implements AuthService {
  private readonly authClient: OAuth2Client;

  constructor() {
    this.authClient = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI,
    );
  }

  async getToken(
    input: AuthService.GetToken.Input,
  ): Promise<AuthService.GetToken.Output> {
    const { tokens } = await this.authClient.getToken(input.code);

    return {
      idToken: tokens.id_token || '',
      accessToken: tokens.access_token || '',
      refreshToken: tokens.refresh_token || '',
    };
  }

  async getPayload(
    input: AuthService.GetPayload.Input,
  ): Promise<AuthService.GetPayload.Output> {
    const ticket = await this.authClient.verifyIdToken({
      idToken: input.token,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid ID token');
    }

    return {
      email: payload.email || '',
      name: payload.name || '',
      pictureUrl: payload.picture || '',
    };
  }

  async getAccessToken(
    input: AuthService.GetAccessToken.Input,
  ): Promise<AuthService.GetAccessToken.Output> {
    this.authClient.setCredentials({
      refresh_token: input.refreshToken,
    });

    const tokens = await this.authClient.getAccessToken();

    return {
      accessToken: tokens.token || '',
    };
  }
}
