<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuth } from '@/hooks/use-auth';
import { Icon } from '@iconify/vue';

const { user, googleRedirect } = useAuth();
const route = useRoute();
</script>

<template>
  <header class="shadow-lg row-span-3 bg-secondary-green">
    <div class="fixed right-3 top-3 flex flex-col items-end gap-2">
      <router-link v-if="route.name !== 'profile'" to="/profile">
        <img
          v-if="user"
          class="rounded-lg h-[50px] w-[50px]"
          :src="user.pictureUrl"
        />
        <img
          v-else
          class="rounded-lg bg-white p-1.5 h-[50px] w-[50px]"
          @click="googleRedirect"
          src="/g.webp"
        />
      </router-link>

      <router-link to="/calendar">
        <Icon 
          icon="solar:calendar-linear" 
          class="w-[30px] h-[30px] text-white"
          :class="{ 'opacity-50': route.name !== 'calendar' }"
        />
      </router-link>
    </div>

    <slot />
  </header>
</template>
