<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import { Icon } from '@iconify/vue';

const title = ref('');
const subject = ref('');
const photo = ref(null);
</script>

<template>
  <Header class="p-5 bg-primary-green text-white flex items-center justify-center">
    <div class="flex gap-4 items-center">
      <div class="flex flex-col items-center">
        <div
          class="w-32 h-32 border-2 border-dashed border-[#CEC38F] flex items-center justify-center rounded-lg cursor-pointer"
          @click="photo = $refs.fileInput.click()"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="photo = $event.target.files[0]"
          />
          <Icon
            icon="mdi:upload"
            style="color: white;"
            class="w-6 h-6"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1">
        <div class="mb-4">
          <label class="block mb-1">Título</label>
          <input
            v-model="title"
            type="text"
            placeholder="Escreva o título do tópico aqui..."
            class="w-full p-2 border-1 border-[#CEC38F] rounded-lg text-white"
          />
        </div>
        <div>
          <label class="block mb-1">Assunto</label>
          <select
            v-model="subject"
            class="w-full p-2 border-1 border-[#CEC38F] rounded-lg text-white"
          >
            <option value="" disabled>Selecione o assunto desejado</option>
            <option value="assunto1">Assunto 1</option>
            <option value="assunto2">Assunto 2</option>
            <option value="assunto3">Assunto 3</option>
          </select>
        </div>
      </div>
    </div>
  </Header>
  <Main></Main>
</template>
