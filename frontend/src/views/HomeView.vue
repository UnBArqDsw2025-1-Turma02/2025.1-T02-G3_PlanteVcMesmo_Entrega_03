<script setup lang="ts">
import { Button } from '@/components/ui/button';
import router from '@/router';

const googleLogin = () => {
  return router.push('/about');
};
</script>

<template>
  <main class="flex flex-col gap-5 h-screen">
    <h1 class="text-[40px] fixed text-white w-screen text-center top-1/8">
      <span class="font-sora-bold">Plante</span>
      <div class="flex items-center justify-center gap-1 h-0">
        <span class="block border-t-1 border-white w-6"></span>
        <span class="font-yrsa italic">
          você
        </span>
        <span class="block border-t-1 border-white w-6"></span>
      </div>
      <span class="font-sora-bold">Mesmo</span>
    </h1>
    <div class="w-screen h-[75vh] bg-center bg-[url(home.png)]"></div>
    <div class="flex flex-col items-center justify-between gap-2.5">
      <router-link to="/about">
        <Button class="bg-primary-green hover:bg-darker-green">
          Começar Agora
        </Button>
      </router-link>
      <div class="flex items-center justify-between gap-5">
        <span class="block border-t-1 border-primary-green w-28"></span>
        <span class="text-xs text-gray-500">
          Ou
        </span>
        <span class="block border-t-1 border-primary-green w-28"></span>
      </div>
      <Button class="bg-primary-beige hover:bg-darker-beige" @click="googleLogin">
        Login com Google
      </Button>
    </div>
  </main>
</template>
