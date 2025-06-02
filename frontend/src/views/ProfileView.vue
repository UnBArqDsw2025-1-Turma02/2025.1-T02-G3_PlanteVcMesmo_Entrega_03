<script setup lang="ts">
import { useAuth } from '@/hooks/use-auth';
import { ref } from 'vue';

import { Input } from '@/components/ui/input';

import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import Tutorial from '@/components/base/Tutorial/Tutorial.vue';

import Button from '@/components/ui/button/Button.vue';

import ApiService from '@/api/ApiService';
import ApiRoutes from '@/api/ApiRoutes';
import HttpStatusCode from '@/api/HttpStatusCode';

import router from '@/router';

const { user, removeUser } = useAuth();

const messages = ref<string[]>([]);
const inputText = ref('');

const sendMessage = () => {
  if (inputText.value.trim()) {
    messages.value.push(inputText.value);

    ApiService.post('/chat', {
      llmType: 'GEMINI',
      question: inputText.value
    }).then(async (response) => {
      if (response && response.ok) {
      const data = await response.json();
      messages.value.push(data.answer);
      } else {
      let errorMsg = 'Erro ao obter resposta da IA.';
      try {
        const errorData = response ? await response.json() : null;
        if (errorData && errorData.message) {
        errorMsg = ` ${errorMsg}`;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) { /* empty */ }
      messages.value.push(errorMsg);
      }
    }).catch(() => {
      messages.value.push('Erro de conexão com o servidor.');
    });

    inputText.value = '';
  }
};

const logout = async () => {
  const response = await ApiService.get(ApiRoutes.auth.logout);
  if (response?.status === HttpStatusCode.NO_CONTENT_204) {
    ApiService.clearAccessToken();
    removeUser();

    router.push('/about');
  }
};
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
      <Button
        class="w-fit text-white font-thin"
        variant="link"
        @click="logout"
      >
        Sair da conta
      </Button>
    </section>
  </Header>

  <Main class="flex flex-col gap-1 p-5">
    <section class="flex flex-col gap-2">
      <div
        v-if="user?.role === 'admin'"
        class="flex justify-center items-center w-full p-3"
      >
      <Tutorial />
      </div>
    </section>
    <section class="h-[85%]">
      <span class="flex gap-1 text-primary-green font-semibold">
        Converse com nossa IA <img src="/happy-plant.png" />
      </span>
      <div class="flex flex-col h-full border border-primary-green rounded-lg overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="{
              'self-end bg-primary-green text-white': index % 2 === 0, // Mensagens do usuário
              'self-start bg-gray-200 text-black': index % 2 !== 0 // Respostas da IA
            }"
            class="max-w-[45%] p-4 rounded-xl text-sm"
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
