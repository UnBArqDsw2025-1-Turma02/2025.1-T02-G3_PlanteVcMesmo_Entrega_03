<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import { Icon } from '@iconify/vue';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import FilterBar from '@/components/ui/filters/FilterBar.vue';
import { useRouter } from 'vue-router';
import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';

interface Product {
  image: string;
  title: string;
  price: string;
  filter: string | number;
}

const products = ref<Product[]>([]);

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

  if (activeFilters.value.length > 0) {
    filtered = filtered.filter((product) =>
      activeFilters.value.includes(product.filter)
    );
  }

  return filtered;
});

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
  <Header>
    <div
      class="flex gap-2 justify-evenly pt-10"
    >
      <div
        class='h-12 relative'
      >
        <Icon
          icon='iconamoon:search-thin'
          class='absolute top-1/4 left-3 w-6 h-6'
        />
        <Input
          type='text'
          placeholder='Buscar uma produtos'
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

    <div class="filter-bar-full-width-wrapper pt-2 mt-auto min-w-0">
      <FilterBar
          :filters="productFilters"
          v-model="activeFilters"
          @update:modelValue="handleFilterChange" />
    </div>
  </Header>

  <Main class="bg-gray-50 overflow-y-auto">
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
  </Main>
</template>
