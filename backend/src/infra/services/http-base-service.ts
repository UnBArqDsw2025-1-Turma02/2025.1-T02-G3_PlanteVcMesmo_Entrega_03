import axios, { isAxiosError } from 'axios';

export namespace HTTPBase {
  export namespace Request {
    export type Input = {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      url: string;
      headers?: Record<string, string>;
      data?: any;
    };

    export type Output = {
      success: boolean;
      status: number;
      data?: any;
    };
  }
}

export class HTTPBase {
  async request(
    input: HTTPBase.Request.Input,
  ): Promise<HTTPBase.Request.Output> {
    const { method, url, headers, data } = input;

    try {
      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        data,
      });

      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status: error.response?.status ?? 500,
          data: error.response?.data ?? { message: 'An error occurred' },
        };
      }

      throw error;
    }
  }
}
