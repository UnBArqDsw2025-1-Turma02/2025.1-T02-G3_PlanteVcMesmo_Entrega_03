<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Button } from '@/components/ui/button';
import novidadesImage from '../assets/images/novidades.png';
import bulbosDeFloresImage from '../assets/images/bulbos-de-flores.png';
import fertilizantesImage from '../assets/images/fertilizantes.png';
import mudasImage from '../assets/images/mudas.png';
import substratosImage from '../assets/images/substratos.png';
import vasosECacheposImage from '../assets/images/vasos-e-cachepos.png';
import suportesEAcessoriosImage from '../assets/images/suportes-e-acessorios.png';
import Header from '@/components/base/Header/Header.vue';

interface Product {
  image: string;
  title: string;
  price: string;
  link?: string;
  filter?: string
}

const product = ref<Product | null>(null);

onMounted(() => {
  const storedProduct = localStorage.getItem('selectedProduct');
  if (storedProduct) {
    product.value = JSON.parse(storedProduct);
  } else {
    console.error('Produto não encontrado no localStorage');
  }
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

const selectCorrectDescription = () => {
    if (product.value && product.value.filter === 'Novidades') {
        return 'Confira as novidades e lançamentos para deixar seu jardim ainda mais bonito! Acesse plantei.com.br e clique em Comprar Agora.';
    } else if (product.value && product.value.filter === 'Bulbos de Flores') {
        return 'Bulbos de flores são estruturas que armazenam energia para o crescimento e floração de plantas. Fáceis de plantar, garantem um jardim florido com pouca manutenção. Encontre este produto em plantei.com.br, clicando em Comprar Agora.';
    } else if (product.value && product.value.filter === 'Fertilizantes') {
        return 'Fertilizantes são essenciais para o crescimento saudável das plantas, fornecendo os nutrientes que elas precisam. Encontre as melhores opções em plantei.com.br e clique em Comprar Agora.';
    } else if (product.value && product.value.filter === 'Mudas') {
        return 'Mudas são ideais para começar seu jardim com praticidade e rapidez. Cultive flores, ervas, frutas e muito mais com qualidade. Garanta as suas em www.plantei.com.br, clicando em Comprar Agora';
    } else if (product.value && product.value.filter === 'Substratos') {
        return 'Substratos são misturas de materiais que proporcionam um ambiente ideal para o crescimento das raízes das plantas. Eles garantem drenagem, aeração e nutrientes adequados. Encontre substratos de qualidade em plantei.com.br e clique em Comprar Agora.';
    } else if (product.value && product.value.filter === 'Vasos e Cachepôs') {
        return 'Vasos e cachepôs são essenciais para o cultivo de plantas, oferecendo suporte e estilo. Descubra uma variedade de opções em plantei.com.br e clique em Comprar Agora.';
    } else if (product.value && product.value.filter === 'Suportes e Acessórios') {
        return 'Suportes e acessórios são fundamentais para organizar e embelezar seu jardim. Eles ajudam a manter as plantas saudáveis e bem posicionadas. Encontre tudo o que precisa em plantei.com.br, clicando em Comprar Agora.';
    } else {
        return 'Confira as novidades e lançamentos para deixar seu jardim ainda mais bonito! Acesse plantei.com.br e clique em Comprar Agora.';
    }
};

</script>

<template>
    <Header class='row-span-3' />
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
            {{ selectCorrectDescription() }}
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
