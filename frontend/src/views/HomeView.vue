<script setup lang="ts">
import { onMounted } from 'vue';

import type { User } from '@/types/models/user';

import { useAuth } from '@/hooks/use-auth';
import { useRoute, type LocationQueryValue } from 'vue-router';

import { Button } from '@/components/ui/button';

import router from '@/router';

import ApiService from '@/api/ApiService';
import HttpStatusCode from '@/api/HttpStatusCode';
import ApiRoutes, { type AuthRefresh } from '@/api/ApiRoutes';

const route = useRoute();
const { user, googleRedirect } = useAuth();

const googleLogin = async (code: LocationQueryValue | LocationQueryValue[]) => {
  let response = await ApiService.post(ApiRoutes.auth.login, { code });
  if (response?.status === HttpStatusCode.CREATED_201) {
    let data = await response.json();
    ApiService.setAccessToken((data as AuthRefresh).access_token);

    response = await ApiService.get(ApiRoutes.auth.me);
    if (response?.ok) {
      data = await response.json();
      user.value = data as User;

      router.push('/about');
    }
  }
};

onMounted(async () => {
  if (user.value) {
    router.push('/about');
  } else {
      const code = route.query.code;
    if (code) await googleLogin(code);
  }
});
</script>

<template>
  <main class='flex flex-col gap-5 h-screen'>
    <h1 class='text-[40px] fixed text-white w-screen text-center top-1/8'>
      <span class='font-sora-bold'>Plante</span>
      <div class='flex items-center justify-center gap-1 h-0'>
        <span class='block border-t-1 border-white w-6'></span>
        <span class='font-yrsa italic'>
          você
        </span>
        <span class='block border-t-1 border-white w-6'></span>
      </div>
      <span class='font-sora-bold'>Mesmo</span>
    </h1>
    <div class='w-screen h-[75vh] bg-center bg-[url(home.png)]'></div>
    <div class='flex flex-col items-center justify-between gap-2.5'>
      <router-link to='/about'>
        <Button class='bg-primary-green hover:bg-darker-green'>
          Começar Agora
        </Button>
      </router-link>
      <div class='flex items-center justify-between gap-5'>
        <span class='block border-t-1 border-primary-green w-28'></span>
        <span class='text-xs text-gray-500'>
          Ou
        </span>
        <span class='block border-t-1 border-primary-green w-28'></span>
      </div>
      <Button class='bg-primary-beige hover:bg-darker-beige' @click='googleRedirect'>
        Login com Google
      </Button>
    </div>
  </main>
</template>
