
<script setup lang="ts">
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
  modelValue: () => [], // Valor padrão é um array vazio
});

const emit = defineEmits(['update:modelValue']);

const handleSelect = (filterId: string | number) => {
  const currentActiveFilters = [...props.modelValue];
  const index = currentActiveFilters.indexOf(filterId);

  if (index > -1) {
    // Se já está ativo, remove
    currentActiveFilters.splice(index, 1);
  } else {
    // Se não está ativo, adiciona
    currentActiveFilters.push(filterId);
  }
  emit('update:modelValue', currentActiveFilters);
};
</script>

<template>
  <div class="filter-bar-container w-full overflow-hidden min-w-0 mt-10">
    <div
      class="flex overflow-x-auto pb-2 w-full"
      role="listbox" aria-label="Filtros de produtos"
      aria-multiselectable="true"
    >
      <FilterBarItem
        v-for="filter in props.filters"
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