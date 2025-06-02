
<script setup lang="ts">
import { ref } from 'vue';
import FilterBarItem from './FilterBarItem.vue';

interface Filter {
  id: string | number;
  label: string;
}

interface FilterBarProps {
  filters: Filter[];
  modelValue?: (string | number)[];
}

const props = withDefaults(defineProps<FilterBarProps>(), {
  modelValue: () => [],
});

const emit = defineEmits(['update:modelValue']);

const handleSelect = (filterId: string | number) => {
  const currentActiveFilters = [...props.modelValue];
  const index = currentActiveFilters.indexOf(filterId);

  if (index > -1) {
    currentActiveFilters.splice(index, 1);
  } else {
    currentActiveFilters.push(filterId);
  }
  emit('update:modelValue', currentActiveFilters);
};

const scroller = ref<HTMLDivElement | null>(null);

const isDown = ref<boolean>(false);
const startX = ref<number>(0);
const scrollLeft = ref<number>(0);

const onMouseDown = (e: MouseEvent) => {
  if (!scroller.value) return;
  isDown.value = true;
  scroller.value.classList.add('active');
  startX.value = e.pageX - scroller.value.offsetLeft;
  scrollLeft.value = scroller.value.scrollLeft;
};

const onMouseLeave = () => {
  if (!scroller.value) return;
  isDown.value = false;
  scroller.value.classList.remove('active');
};

const onMouseUp = () => {
  if (!scroller.value) return;
  isDown.value = false;
  scroller.value.classList.remove('active');
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDown.value || !scroller.value) return;
  e.preventDefault();
  const x = e.pageX - scroller.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  scroller.value.scrollLeft = scrollLeft.value - walk;
};
</script>

<template>
  <div
    class="filter-bar-container w-full min-w-0 mt-10 hover:cursor-grab"
  >
    <div
      class="flex overflow-x-auto pb-2 w-full"
      role="listbox" aria-label="Filtros de produtos"
      aria-multiselectable="true"
      ref="scroller"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <FilterBarItem
        v-for="filter in props.filters"
        class="hover:cursor-grab"
        :key="filter.id"
        :label="filter.label"
        :active="props.modelValue.includes(filter.id)" @select="handleSelect(filter.id)"
        role="option" :aria-selected="props.modelValue.includes(filter.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
