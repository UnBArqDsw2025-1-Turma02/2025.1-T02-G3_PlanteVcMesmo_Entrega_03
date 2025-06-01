<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useAuth } from '@/hooks/use-auth';

const { user, googleRedirect } = useAuth();

const route = useRoute();
</script>

<template>
  <header
    class='shadow-lg row-span-3 bg-secondary-green'
  >
    <router-link
      v-if="route.name !== 'profile'"
      to="/profile"
    >
      <img
        v-if="user && route.name !== 'profile'"
        class="rounded-lg fixed right-3 top-3 h-[50px] w-[50px]"
        :src="user.pictureUrl"
      />
      <img
        v-else
        class="rounded-lg bg-white fixed right-3 top-3 p-1.5 h-[50px] w-[50px]"
        @click="googleRedirect"
        src="/g.webp"
      />
    </router-link>
    <slot />
  </header>
</template>
