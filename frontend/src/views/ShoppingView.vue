<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
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
import FilterBar from '@/components/ui/filters/FilterBar.vue';
import { useRouter } from 'vue-router';

interface Product {
  image: string;
  title: string;
  price: string;
  filter: string | number;
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

const values = ref({
  language: ''
});

const products = ref<Product[]>([]);

// Filtros 
const productFilters = ref([
  { id: 'Novidades', label: 'Novidades' },
  { id: 'Mudas', label: 'Mudas' },
  { id: 'Bulbos de Flores', label: 'Bulbos de Flores' },
  { id: 'Vasos e Cachepôs', label: 'Vasos e Cachepôs' },
  { id: 'Fertilizantes', label: 'Fertilizantes' },
  { id: 'Substratos', label: 'Substratos' },
  { id: 'Suportes e Acessórios', label: 'Suportes e Acessórios' },
]);


const activeFilters = ref<(string | number)[]>([]);
const searchQuery = ref('');

const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filtra por texto de pesquisa
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(query) ||
      product.filter.toString().toLowerCase().includes(query)
    );
  }

  // Filtra por filtros ativos
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter((product) =>
      activeFilters.value.includes(product.filter)
    );
  }

  return filtered;
});

// carrega JSON
const loadProducts = async () => {
  try {
    const response = await axios.get('/script/products.json');
    products.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error);
  }
};

onMounted(() => {
  loadProducts();
});

const handleFilterChange = (selectedFilterIds: (string | number)[]) => {
  activeFilters.value = selectedFilterIds;
};

// Limita título em 5 palavras
const truncateTitle = (title: string) => {
  const words = title.split(' ');
  return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : title;
};

const router = useRouter();

const goToProduct = (product: Product) => {
  localStorage.setItem('selectedProduct', JSON.stringify(product)); //localStorage
  router.push({ name: 'product' }); 
};
</script>

<template>
  <header class='flex flex-col row-span-3 bg-secondary-green text-white'>

    <div class='px-7 pt-7 mb-2 flex flex-col gap-1'>
      <div class='font-thin text-sm'>
        Localização
      </div>
      <Popover>
        <PopoverTrigger as-child>
            <Button
              variant='link'
              role='combobox'
              class='h-auto p-0 justify-start text-white text-base font-semibold'
            >
              {{ values.language ? brazilStates.find(
                (language) => language.value === values.language,
              )?.label : 'Escolha seu estado...' }}
              <Icon
                icon='ep:arrow-down'
                class='w-5 h-5 ml-1'
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

    <div class='px-7 flex pt-2 gap-4 items-center'>
      <div class='relative flex-grow'>
        <Icon
          icon='iconamoon:search-thin'
          class='absolute top-1/2 left-3 transform -translate-y-1/2 w-6 h-6 text-gray-400'
        />
        <Input
          type="text"
          placeholder="Buscar um produto"
          class="bg-white w-full h-12 rounded-lg pl-10 text-gray-700"
          v-model="searchQuery"
        />
      </div>
      <Button
        variant='link'
        class='flex-shrink-0 flex justify-center items-center h-12 w-12 bg-primary-beige hover:bg-darker-beige rounded-xl p-0'
      >
        <Icon
          icon='lets-icons:filter-big'
          class='text-white stroke-2 scale-125'
        />
      </Button>
    </div>

    <div class="filter-bar-full-width-wrapper mt-auto py-10 min-w-0">
      <FilterBar
          :filters="productFilters"
          v-model="activeFilters"
          @update:modelValue="handleFilterChange" />
    </div>
  </header>

  <main class="row-span-6 bg-gray-50 overflow-y-auto">
    <section class="p-4 md:p-8">
      <h2 class="text-xl font-semibold mb-4">Produtos</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div  
          v-for="(product, index) in filteredProducts"
          :key="index"
          class="flex flex-col items-center bg-white rounded-lg shadow-md p-4 cursor-pointer"
          @click="goToProduct(product)"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 class="text-sm font-medium text-gray-800">{{ truncateTitle(product.title) }}</h3>
          <p class="text-xs text-primary-green font-semibold text-left w-full mt-2">
            {{ product.price }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>