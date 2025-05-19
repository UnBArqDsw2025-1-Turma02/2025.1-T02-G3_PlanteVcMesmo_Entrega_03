<script setup lang="ts">
import { ref } from 'vue';

import { cn } from '@/lib/utils';

import { Icon } from '@iconify/vue';
import { Check } from 'lucide-vue-next';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const brazilStates = [
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
];

const values = ref({
  language: ''
});
</script>

<template>
  <header class='flex flex-col gap-2 p-7 row-span-3 bg-secondary-green'>
    <div
      class='flex flex-col gap-4'
    >
      <div class='font-thin text-white'>
        Localização
      </div>
      <Popover>
        <PopoverTrigger as-child>
            <Button
              variant='link'
              role='combobox'
              class='h-0 justify-start text-white'
            >
              {{ values.language ? brazilStates.find(
                (language) => language.value === values.language,
              )?.label : 'Escolha seu estado...' }}
              <Icon
                icon='ep:arrow-down'
                class='w-6 h-6'
              />
            </Button>
        </PopoverTrigger>
        <PopoverContent class='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Pesquise seu estado...' />
            <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for='language in brazilStates'
                  :key='language.value'
                  :value='language.label'
                  @select='() => {
                    values.language = language.value
                  }'
                >
                  {{ language.label }}
                  <Check
                    :class="cn('ml-auto h-4 w-4', language.value === values.language ? 'opacity-100' : 'opacity-0')"
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div
        class='flex pt-2 gap-4'
      >
        <div
          class='mt-2 h-12 relative'
        >
          <Icon
            icon='iconamoon:search-thin'
            class='absolute top-1/4 left-3 w-6 h-6'
          />
          <Input
            type='text'
            placeholder='Buscar uma planta'
            class='bg-white w-64 h-full rounded-lg pl-10'
          />
        </div>
        <Button
          variant='link'
          class='flex justify-center items-center h-12 w-12 bg-primary-beige hover:bg-darker-beige rounded-xl'
        >
          <Icon
            icon='lets-icons:filter-big'
            class='text-white stroke-2 scale-125'
          />
        </Button>
      </div>
    </div>
  </header>
  <main class='row-span-6'>
    <section
      class='flex items-center justify-center h-40 w-full absolute top-[22%]'
    >
      <div
        class='flex flex-col justify-start items-center gap-1 bg-white h-full rounded-2xl w-[85%] p-3 shadow-lg'
      >
        <span
          class='text-gray-500'
        >
          Produtos
        </span>
        <section
          class='flex gap-4 justify-between items-center'
        >
          <div>
            <img
              class='rounded-2xl'
              src='https://picsum.photos/90'
              alt='plant'
            >
          </div>
          <div>
            <img
              class='rounded-2xl'
              src='https://picsum.photos/90'
              alt='plant'
            >
          </div>
          <div>
            <img
              class='rounded-2xl'
              src='https://picsum.photos/90'
              alt='plant'
            >
          </div>
        </section>
      </div>
    </section>
    <section
      class='pt-32 px-8'
    >
      Body
    </section>
  </main>
</template>
