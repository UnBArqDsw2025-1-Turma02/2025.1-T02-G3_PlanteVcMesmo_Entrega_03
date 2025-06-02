<script setup lang="ts">
import { useAuth } from '@/hooks/use-auth';
import { ref } from 'vue';

import { Input } from '@/components/ui/input';

import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import Tutorial from '@/components/base/Tutorial/Tutorial.vue';

const { user } = useAuth();
import ApiService from '../api/ApiService';

const messages = ref<string[]>([]);
const inputText = ref('');

function sendMessage() {
  if (inputText.value.trim()) {
    messages.value.push(inputText.value);
    
    ApiService.post('/chat', {
      llmType: 'GEMINI',
      question: inputText.value
    }, false).then(async (response) => {
      if (response && response.ok) {
      const data = await response.json();
      messages.value.push(data.answer);
      } else {
      let errorMsg = 'Erro ao obter resposta da IA.';
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
        errorMsg += ` (${errorData.message})`;
        }
      } catch (e) {
        
      }
      messages.value.push(errorMsg);
      }
    }).catch(() => {
      messages.value.push('Erro de conexão com o servidor.');
    });

    inputText.value = '';
  }
}

</script>

<template>
  <Header
    class="flex justify-between items-center gap-5 px-8 pb-10"
  >
    <img
      class="rounded-lg"
      :src="user?.pictureUrl"
    />
    <section
      class="h-[110px] flex flex-col justify-between text-white"
    >
      <span>{{ user?.name }}</span>
      <span class="font-thin">{{ user?.email }}</span>
      <span class="font-thin">Brasília, DF</span>
    </section>
  </Header>

  <Main class="flex flex-col gap-1 p-5">
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
        v-if="user?.role === 'admin'"
        class="flex justify-center items-center w-full p-3"
      >
      <Tutorial />
      </div>
    </section>
    <section class="h-full">
      <span class="flex gap-1 text-primary-green font-semibold">
        Converse com nossa IA <img src="/happy-plant.png" />
      </span>
      <div class="flex flex-col h-[220px] max-h-[220px] border border-primary-green rounded-lg overflow-hidden">
        <!-- Área de mensagens -->
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="self-end max-w-[45%] bg-primary-green text-white p-4 rounded-xl text-sm"
          >
            {{ msg }}
          </div>
        </div>
        <!-- Campo de input -->
        <div class="border-t border-primary-green p-2">
          <Input
            v-model="inputText"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Faça sua pergunta..."
            class="w-full border-primary-green focus-visible:ring-0 focus-visible:ring-transparent focus-visible:outline-none"
          />
        </div>
      </div>
    </section>
  </Main>
</template>
