<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useAuth } from '@/hooks/use-auth';

const { user } = useAuth();

const route = useRoute();
</script>

<template>
  <header
    class='shadow-lg row-span-3 bg-secondary-green'
  >
    <router-link
      v-if="user && route.name !== 'profile'"
      to="/profile"
    >
      <img
        class="rounded-lg fixed right-3 top-3 h-[50px] w-[50px]"
        src="https://picsum.photos/110"
      />
    </router-link>
    <slot />
  </header>
</template>
