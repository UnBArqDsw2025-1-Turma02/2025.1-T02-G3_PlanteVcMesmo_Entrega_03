<script setup lang="ts">
import { ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import { Icon } from '@iconify/vue';

const route = useRoute();

const isActive = ref(false);

const props = defineProps<{
  normal: string;
  active: string;
  target: string;
}>();

watch(
  () => route.name,
  () => {
    isActive.value = route.name === props.target;
  },
  { immediate: true }
);
</script>

<template>
  <router-link
    :class='`footer-toggle-${target}`'
    :to='`/${target}`'
  >
    <Icon
      :icon='isActive ? props.active : props.normal'
      :style="isActive ? { color: 'var(--color-secondary-green)' } : {}"
      class='w-6 h-6'
    />
  </router-link>
</template>
