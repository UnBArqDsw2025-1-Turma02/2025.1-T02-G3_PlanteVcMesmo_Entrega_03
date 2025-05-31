<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  modelValue: string;
  label: string;
  placeholder: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mb-4">
    <label class="block mb-1">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="placeholder"
      class="w-full p-2 border-1 border-[#CEC38F] rounded-lg text-white"
    />
  </div>
</template>