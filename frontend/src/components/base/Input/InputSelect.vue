<script setup lang="ts">
import type { Label } from '@/types/models/label';

import { useFilter } from 'reka-ui';

import { computed, ref, watch } from 'vue';

import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input';

const props = defineProps<{
  items: Label[];
  label: string;
}>();

const emit = defineEmits([
  'update:modelValue'
]);

const modelValue = ref<string[]>([]);

const padding = ref('p-0');
const open = ref(false);
const searchTerm = ref('');

const { contains } = useFilter({ sensitivity: 'base' });
const filtered = computed(() => {
  const options = props.items.filter(i => !modelValue.value.includes(i.name));
  return searchTerm.value ? options.filter(option => contains(option.name, searchTerm.value)) : options;
});

watch(
  () => modelValue.value,
  () => {
    emit('update:modelValue', modelValue.value);

    if (modelValue.value.length) {
      padding.value = 'px-2';
    } else {
      padding.value = 'p-0';
    }
  },
  {
    deep: true
  }
);
</script>

<template>
  <div class="mb-4">
    <label class="block mb-1">{{ label }}</label>
    <Combobox
      v-model="modelValue"
      v-model:open="open"
      :ignore-filter="true"
    >
      <ComboboxAnchor
        as-child
        class="bg-secondary-green border-[#CEC38F]"
      >
        <TagsInput
          v-model="modelValue"
          class="gap-2 w-80"
          :class="padding"
        >
          <div class="flex gap-2 flex-wrap items-center">
            <TagsInputItem
              v-for="item in modelValue"
              :key="item"
              :value="item"
              class="bg-primary-green py-2.5 px-1"
            >
              <TagsInputItemText />
              <TagsInputItemDelete
                class="hover:cursor-pointer"
              />
            </TagsInputItem>
          </div>

          <ComboboxInput
            v-model="searchTerm"
            as-child
          >
            <TagsInputInput
              placeholder="Escolha os assuntos..."
              class="min-w-[200px] w-full p-0 border-none text-sm focus-visible:ring-0 h-auto placeholder:text-gray-200"
              @keydown.enter.prevent
              @focus="() => open = true"
              @blur="() => open = false"
            />
          </ComboboxInput>
        </TagsInput>

        <ComboboxList class="w-[--reka-popper-anchor-width]">
          <ComboboxEmpty />
          <ComboboxGroup>
            <ComboboxItem
              v-for="item in filtered"
              :key="item.name"
              :value="item.name"
              @select.prevent="() => {
                searchTerm = '';
                modelValue.push(item.name);

                if (filtered.length === 0) {
                  open = false;
                }
              }">
                {{ item.name }}
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxAnchor>
    </Combobox>
  </div>
</template>
