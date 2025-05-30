<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  modelValue: string;
  label: string;
  options: { value: string; text: string }[];
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <label class="block mb-1">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full p-2 border-1 border-[#CEC38F] rounded-lg text-white dropdown-style"
    >
      <option value="" disabled>Selecione</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.dropdown-style {
  color: white;
}

.dropdown-style option {
  background-color: #CEC38F;
  color: white;
}
</style>