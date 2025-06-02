const ApiRoutes = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    me: '/auth/me',
    logout: '/auth/logout'
  },
  post: {
    root: '/post',
    by_id: (id: string) => `/post/${id}`,
  },
  label: {
    root: (limit: number) => `/label/?limit=${limit}`
  },
  chat: {
    root: '/chat'
  }
};

export interface AuthRefresh {
  access_token: string;
}

export default ApiRoutes;
