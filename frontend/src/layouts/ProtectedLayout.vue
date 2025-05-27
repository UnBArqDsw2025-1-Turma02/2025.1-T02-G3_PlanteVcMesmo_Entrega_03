<script setup lang="ts">
import { useAuth } from '@/hooks/use-auth';

import router from '@/router';

import { onMounted } from 'vue';
import AppLayout from './AppLayout.vue';

const { user } = useAuth();

onMounted(() => {
  if (!user.value) {
    router.push('/');
  }
});
</script>

<template>
  <AppLayout>
    <slot />
  </AppLayout>
</template>
