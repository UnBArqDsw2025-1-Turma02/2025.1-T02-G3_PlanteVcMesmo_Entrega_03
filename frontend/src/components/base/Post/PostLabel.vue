<script setup lang="ts">
import type { Label } from '@/types/models/label';

defineProps<{
  label: Label;
}>();
</script>

<template>
  <span
    :style="{
      background: label.color
    }"
    class="text-sm text-white py-0.5 px-2.5 rounded-xl"
  >
    {{ label.name }}
  </span>
</template>
