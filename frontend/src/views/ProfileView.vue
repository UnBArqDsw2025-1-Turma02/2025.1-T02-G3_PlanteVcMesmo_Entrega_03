<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';

import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import Tutorialbutton from '@/components/base/Tutorial/Tutorial.vue';

const Admin = ref(true); //variavel arbirtrária de admin 
</script>

<template>
  <Header
    class="flex justify-between items-center gap-5 px-8 pb-10"
  >
    <img
      class="rounded-lg"
      src="https://picsum.photos/110"
    />
    <section
      class="h-[110px] flex flex-col justify-between text-white"
    >
      <span>Fulano da Silva</span>
      <span class="font-thin">fulanodasilva@gmail.com</span>
      <span class="font-thin">Brasília, DF</span>
    </section>
  </Header>

  <Main class="flex flex-col gap-5 p-5">
    <section class="flex flex-col gap-2">
      <span class="text-primary-green font-semibold">
        Minha Galeria
      </span>
      <div class='flex gap-4 justify-between items-center'>
        <div>
          <img
            class='rounded-2xl'
            src='https://picsum.photos/125'
            alt='plant'
          >
        </div>
        <div>
          <img
            class='rounded-2xl'
            src='https://picsum.photos/125'
            alt='plant'
          >
        </div>
        <div>
          <img
            class='rounded-2xl'
            src='https://picsum.photos/125'
            alt='plant'
          >
        </div>
      </div>
      
      <div
        v-if="Admin"
        class="flex justify-center items-center w-full p-5"
      >
        <Tutorialbutton />
      </div>
      
    </section>
    <section class="h-full">
      <span class="flex gap-1 text-primary-green font-semibold">
        Converse com nossa IA <img src="../../public/happy-plant.png" />
      </span>
      <div class="relative flex items-end h-[95%] rounded-lg border-2 border-primary-green">
        <Input
          type='text'
          placeholder='Faça sua pergunta...'
          class='border-primary-green absolute left-[-1px] border-r-0 border-b-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:outline-none bg-white h-12 w-full rounded-[7px]'
        />
      </div>
    </section>
  </Main>
</template>
