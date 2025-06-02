import ApiRoutes, { type AuthRefresh } from '@/api/ApiRoutes';
import type { User } from '@/types/models/user';

import ApiService from '@/api/ApiService';

import router from '@/router';

import { GoogleOAuthUrl } from '@/utils/google';

import { ref } from 'vue';

const user = ref<User>();

const refreshUser = async () => {
  let response = await ApiService.post(ApiRoutes.auth.refresh, {});
  if (response?.ok) {
    let data = await response.json();
    ApiService.setAccessToken((data as AuthRefresh).access_token);

    response = await ApiService.get(ApiRoutes.auth.me);
    if (response?.ok) {
      data = await response.json();
      user.value = data as User;
    }
  }
};

const removeUser = () => {
  user.value = undefined;
};

const googleRedirect = async () => {
  if (user.value) router.push('/about');
  else {
    window.location.href = GoogleOAuthUrl({
      client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_APP_WEB_URL
    });
  }
};

await refreshUser();

export const useAuth = () => {
  return {
    user,
    refreshUser,
    removeUser,
    googleRedirect
  };
};
