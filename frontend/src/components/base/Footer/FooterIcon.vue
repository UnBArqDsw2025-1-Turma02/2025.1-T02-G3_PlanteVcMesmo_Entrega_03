<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue';

import { IsActive } from '@/keys/injection';

import { Icon } from '@iconify/vue';

defineProps<{
  normal: string;
  active: string;
}>();

const isActive = inject<ComputedRef<boolean>>(IsActive, computed(() => false));
</script>

<template>
  <Icon
    :icon="isActive ? active : normal"
    :style="isActive ? { color: 'var(--color-secondary-green)' } : {}"
    class="w-6 h-6"
  />
</template>
