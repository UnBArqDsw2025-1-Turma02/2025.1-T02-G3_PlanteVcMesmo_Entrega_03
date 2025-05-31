type OAuthParams = {
  client_id: string;
  redirect_uri: string;
  response_type?: string;
  scope?: string[];
  access_type?: 'online' | 'offline';
  prompt?: 'consent' | 'none' | 'select_account' | 'login';
};

export const GoogleOAuthUrl = ({
  client_id,
  redirect_uri,
  response_type = 'code',
  scope = [
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/calendar.app.created'
  ],
  access_type = 'offline',
  prompt = 'consent'
}: OAuthParams): string => {
  const params = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
    scope: scope.join(' '),
    access_type,
    prompt
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};
