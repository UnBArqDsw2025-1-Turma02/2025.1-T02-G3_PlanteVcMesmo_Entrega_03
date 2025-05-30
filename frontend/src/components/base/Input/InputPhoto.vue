<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.files?.[0] || null);
};
</script>

<template>
  <div
    class="w-32 h-32 border-2 border-dashed border-[#CEC38F] flex items-center justify-center rounded-lg cursor-pointer"
    @click="fileInput?.click()"
  >
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
    <slot>
      <span class="text-white">Upload</span>
    </slot>
  </div>
</template>