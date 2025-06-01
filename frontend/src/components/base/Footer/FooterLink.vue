<script setup lang="ts">
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import { IsActive } from '@/keys/injection';

const props = defineProps<{
  target: string;
}>();

const route = useRoute();

const isActive = computed(() => {
  return route.name === props.target;
});

provide(IsActive, isActive);
</script>

<template>
  <router-link
    :class='`footer-toggle-${target}`'
    :to='`/${target}`'
  >
    <slot />
  </router-link>
</template>
