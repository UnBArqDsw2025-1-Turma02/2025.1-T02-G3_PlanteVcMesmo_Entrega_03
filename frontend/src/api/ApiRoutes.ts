const ApiRoutes = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    me: '/auth/me',
    logout: '/auth/logout'
  },
  post: {
    root: '/post',
    by_id: (id: number) => `/post/${id}`,
  },
  label: {
    root: '/label'
  },
  chat: {
    root: '/chat'
  },
  plant: {
    root: '/plant'
  }
};

export interface AuthRefresh {
  access_token: string;
}

export default ApiRoutes;
