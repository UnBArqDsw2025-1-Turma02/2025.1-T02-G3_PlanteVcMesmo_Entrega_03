<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuth } from '@/hooks/use-auth';
import { Icon } from '@iconify/vue';
import { ChevronLeftIcon } from 'lucide-vue-next';

const excluded = ['profile', 'newpost'];

const { user, googleRedirect } = useAuth();
const route = useRoute();
</script>

<template>
  <header class="shadow-lg row-span-2 p-7 bg-secondary-green">
    <div class="fixed top-3 right-3 flex flex-col items-end gap-2">
      <router-link
        v-if="!excluded.includes(route.name as string)"
        to="/profile"
        class="h-[50px] w-[50px]"
      >
        <img
          v-if="user && route.name !== 'profile'"
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

      <router-link
        v-if="route.name == 'profile'"
        to="/calendar"
      >
        <Icon
          icon="solar:calendar-linear"
          class="w-[30px] h-[30px] text-gray-300"
        />
      </router-link>
    </div>

    <router-link
      v-if="route.name === 'newpost'"
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
