<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import InputText from '@/components/base/Input/InputText.vue';
import InputPhoto from '@/components/base/Input/InputPhoto.vue';
import InputSelect from '@/components/base/Input/InputSelect.vue';
import Button from '@/components/ui/button/Button.vue';
import { Icon } from '@iconify/vue';

const title = ref('');
const subject = ref('');
const photo = ref(null);

const options = [
  { value: 'Adubos', text: 'Adubos' },
  { value: 'Arranjos', text: 'Arranjos' },
  { value: 'Cuidados', text: 'Cuidados' },
  { value: 'Ferramentas', text: 'Ferramentas' },
  { value: 'Flores', text: 'Flores' },
  { value: 'Outros', text: 'Outros' },
  { value: 'Plantas', text: 'Plantas' },
  { value: 'Sementes', text: 'Sementes' }
];
</script>

<template>
  <Header class="p-5 bg-primary-green text-white flex items-center justify-center">
    <div class="flex gap-4 items-center">
      <div class="flex flex-col items-center">
        <InputPhoto v-model="photo">
          <Icon icon="mdi:upload" style="color: white;" class="w-6 h-6" />
        </InputPhoto>
      </div>
      <div class="flex flex-col flex-1">
        <InputText
          v-model="title"
          label="Título"
          placeholder="Escreva o título..."
        />
        <InputSelect
          v-model="subject"
          label="Assunto"
          :options="options"
        />
      </div>
    </div>
  </Header>
  <Main class="flex flex-col gap-5 p-5">
    <section class="h-full">
      <span class="flex gap-1 text-primary-green font-semibold">
        Corpo do Texto
      </span>
      <div class="relative flex items-end h-[75%] rounded-lg mt-5" style="margin-top: 25px;">
        <textarea
          placeholder="Escreva seu texto aqui..."
          class="relative flex items-end h-[100%] w-full rounded-lg border-2 border-primary-green p-2"
          style="margin-bottom: 20px;"
        ></textarea>
      </div>
      <div class="flex justify-center mt-5">
        <Button
          class="bg-primary-green"
          @click="navigateToNewPost"
        >
          Publicar Post
        </Button>
      </div>
    </section>
  </Main>
</template>
