<script setup lang="ts">
import { Input } from '@/components/ui/input';

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
    <Input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text" :placeholder="placeholder"
      class="w-full p-2 border-1 border-[#CEC38F] text-sm rounded-lg text-white placeholder:text-gray-200 focus-visible:ring-0 focus-visible:border-[#CEC38F]" />
  </div>
</template>
