<script setup lang="ts">
defineProps<{
    title?: string;
}>();
</script>

<template>
  <h1
    class="text-white text-2xl"
  >
    {{ title }}
  </h1>
  <slot />
</template>
