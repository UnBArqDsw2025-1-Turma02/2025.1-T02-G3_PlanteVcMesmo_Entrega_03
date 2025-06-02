import { errorToast } from '@/utils/toast';

type AVAILABLE_METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE';

class ApiServiceSingleton {
  private ACCESS_TOKEN = '';

  private ERROR_DESCRIPTION = 'Tente novamente mais tarde!';

  private API_URL: string = import.meta.env.VITE_APP_API_URL;
  private BASE_HEADERS: HeadersInit = {
    'Content-Type': 'application/json'
  };
  private AUTH_HEADERS = (token: string): HeadersInit  => {
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  async get(endpoint: string, auth: boolean = true): Promise<Response | undefined> {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, this.getOptions('GET', auth));
      return response;
    } catch (error) {
      console.error(`[ApiService]: GET - ${error}`);
      errorToast(this.ERROR_DESCRIPTION);
    }
  }

  async post(endpoint: string, body?: object, auth: boolean = true): Promise<Response | undefined> {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, {
        ...this.getOptions('POST', auth),
        body: JSON.stringify(body),
      });
      return response;
    } catch (error) {
      console.error(`[ApiService]: POST - ${error}`);
      errorToast(this.ERROR_DESCRIPTION);
    }
  }

  async put(endpoint: string, body?: object, auth: boolean = true): Promise<Response | undefined> {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, {
        ...this.getOptions('PUT', auth),
        body: JSON.stringify(body),
      });
      return response;
    } catch (error) {
      console.error(`[ApiService]: PUT - ${error}`);
      errorToast(this.ERROR_DESCRIPTION);
    }
  }

  async delete(endpoint: string, auth: boolean = true): Promise<Response | undefined> {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, this.getOptions('DELETE', auth));
      return response;
    } catch (error) {
      console.error(`[ApiService]: DELETE - ${error}`);
      errorToast(this.ERROR_DESCRIPTION);
    }
  }

  public setAccessToken(token: string): void {
    this.ACCESS_TOKEN = token;
  }

  public clearAccessToken(): void {
    this.ACCESS_TOKEN = '';
  }

  private getHeaders(auth: boolean) {
    if (auth) return {
      ...this.BASE_HEADERS,
      ...this.AUTH_HEADERS(this.ACCESS_TOKEN)
    };

    return this.BASE_HEADERS;
  }

  private getOptions(method: AVAILABLE_METHODS, auth: boolean): RequestInit {
    return {
      method: method,
      headers: this.getHeaders(auth),
      credentials: 'include'
    };
  }
}

const ApiService = new ApiServiceSingleton();

export default ApiService;
