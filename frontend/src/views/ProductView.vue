<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { cn } from '@/lib/utils';
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
import { Icon } from '@iconify/vue';
import { Check } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import novidadesImage from '../assets/images/novidades.png';
import bulbosDeFloresImage from '../assets/images/bulbos-de-flores.png';
import fertilizantesImage from '../assets/images/fertilizantes.png';
import mudasImage from '../assets/images/mudas.png';
import substratosImage from '../assets/images/substratos.png';
import vasosECacheposImage from '../assets/images/vasos-e-cachepos.png';
import suportesEAcessoriosImage from '../assets/images/suportes-e-acessorios.png';

interface Product {
  image: string;
  title: string;
  price: string;
  link?: string;
  filter?: string
}

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

const product = ref<Product | null>(null);

onMounted(() => {
  const storedProduct = localStorage.getItem('selectedProduct');
  if (storedProduct) {
    product.value = JSON.parse(storedProduct);
  } else {
    console.error('Produto não encontrado no localStorage');
  }
});

const values = ref({
  language: ''
});

const openProductLink = () => {
  if (product.value?.link) {
    window.open(product.value.link, '_blank');
  } else {
    console.error('Link do produto não disponível');
  }
};

const selectCorrectImage = () => {
    if (product.value && product.value.filter === 'Novidades') {
        return novidadesImage;
    } else if (product.value && product.value.filter === 'Bulbos de Flores') {
        return bulbosDeFloresImage;
    } else if (product.value && product.value.filter === 'Fertilizantes') {
        return fertilizantesImage;
    } else if (product.value && product.value.filter === 'Mudas') {
        return mudasImage;
    } else if (product.value && product.value.filter === 'Substratos') {
        return substratosImage;
    } else if (product.value && product.value.filter === 'Vasos e Cachepôs') {
        return vasosECacheposImage;
    } else if (product.value && product.value.filter === 'Suportes e Acessórios') {
        return suportesEAcessoriosImage;
    } else {
        return novidadesImage;
    }
};
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
      </div>
    </header>
    <main class='row-span-6'>
      <section
        class="flex items-center justify-center h-50 w-full absolute top-[15%] overflow-hidden"
      >
        <div
          class="flex justify-center items-center bg-white h-full rounded-2xl w-[70%] shadow-lg"
        >
          <img
            :src="selectCorrectImage() || novidadesImage"
            alt="Imagem do produto"
            class="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </section>
      <section
        class='pt-25 px-8'
      >
        <p class="text-2x1 text-primary-green font-bold text-left w-full">
            {{ product?.title || 'Produto não disponível' }}
        </p>
        <p class="text-xs text-[#686868] text-left w-full pt-3">
            {{ product?.price || 'Preço não disponível' }}
          </p>
        <p class="text-x1 text-[#CEC38F] font-bold text-left w-full pt-5">
            Descrição:
        </p>
        <p class="text-xs text-[#686868] text-left w-full pt-2">
            Bulbos de flores são estruturas que armazenam energia para o crescimento e floração de plantas. Fáceis de plantar, garantem um jardim florido com pouca manutenção. Encontre este produto em plantei.com.br, clicando em Comprar Agora.
        </p>
      </section>
      <div class='flex flex-col items-center justify-between pt-9 gap-2.5'>
        <Button
          class="bg-primary-green hover:bg-darker-green"
          @click="openProductLink"
        >
          Comprar Agora
        </Button>
      </div>
    </main>
  </template>