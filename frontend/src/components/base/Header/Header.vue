<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useAuth } from '@/hooks/use-auth';
import { ChevronLeftIcon } from 'lucide-vue-next';

const excluded = ['profile', 'newpost'];

const { user, googleRedirect } = useAuth();

const route = useRoute();
</script>

<template>
  <header
    class='shadow-lg row-span-2 p-7 bg-secondary-green'
  >
    <router-link
      v-if="!excluded.includes(route.name as string)"
      to="/profile"
      class="fixed right-3 top-3 h-[50px] w-[50px]"
    >
      <img
        v-if="user && route.name !== 'profile'"
        class="rounded-lg"
        :src="user.pictureUrl"
      />
      <img
        v-else
        class="rounded-lg bg-white p-1.5"
        @click="googleRedirect"
        src="/g.webp"
      />
    </router-link>
    <router-link
      v-else-if="route.name === 'newpost'"
      to="/profile"
      class="fixed left-3 top-3 h-[30px] w-[30px]"
    >
      <ChevronLeftIcon
        color="white"
        class="rounded-lg"
      />
    </router-link>
    <slot />
  </header>
</template>
