<script setup lang="ts">
import { cn } from '@/lib/utils';

interface FilterItemProps {
  label: string;
  active?: boolean;
}

const props = withDefaults(defineProps<FilterItemProps>(), {
  active: false,
});

const emit = defineEmits(['select']);

const handleClick = () => {
  emit('select');
};
</script>

<template>
  <button
    :class="cn(
      'px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap',
      props.active
        ? 'bg-primary-beige text-white hover:bg-darker-beige'
        : 'bg-white text-gray-700 hover:bg-gray-100'
    )"
    @click="handleClick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
button{
  margin-left: 5px;
}
</style>