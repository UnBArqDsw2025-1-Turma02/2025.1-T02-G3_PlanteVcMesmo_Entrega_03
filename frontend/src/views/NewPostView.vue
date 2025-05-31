<script setup lang="ts">
import type { Post } from '@/types/models/post';
import type { Label } from '@/types/models/label';

import { successToast, errorToast } from '@/utils/toast';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import InputText from '@/components/base/Input/InputText.vue';
import InputSelect from '@/components/base/Input/InputSelect.vue';
import Button from '@/components/ui/button/Button.vue';
import ApiService from '@/api/ApiService';
import ApiRoutes from '@/api/ApiRoutes';

const router = useRouter();

const labels = ref<Label[]>([
  { name: 'Adubos', color: 'green' },
  { name: 'Arranjos', color: 'green' },
  { name: 'Cuidados', color: 'green' },
  { name: 'Ferramentas', color: 'green' },
  { name: 'Flores', color: 'green' },
  { name: 'Plantas', color: 'green' },
  { name: 'Sementes', color: 'green' },
  { name: 'Outros', color: 'green' }
]);

const form = ref<Omit<Post, 'labels'> & { labels: string[]; }>({
  title: '',
  description: '',
  labels: []
});

const sendPost = async () => {
  form.value.title = form.value.title.trim();
  form.value.description = form.value.description.trim();

  console.log(JSON.stringify(form.value));
  if (!form.value.title || !form.value.description || !form.value.labels.length) {
    errorToast('O post deve ter título, assunto e corpo.');
  } else {
    const response = await ApiService.post(ApiRoutes.post.root, form.value);
    if (response) {
      successToast('Post criado!');
      router.back();
    }
  }
};

onMounted(async () => {
  const response = await ApiService.get(ApiRoutes.label.root);
  if (response) {
    labels.value = await response.json();
  }
});
</script>

<template>
  <Header class="p-5 bg-primary-green text-white flex items-center justify-center">
    <div class="flex gap-4 items-center">
      <div class="flex flex-col gap-1 flex-1">
        <InputText
          v-model="form.title"
          label="Título"
          placeholder="Escreva o título..."
        />
        <InputSelect
          v-model="form.labels"
          label="Assuntos"
          :items="labels"
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
          v-model="form.description"
          placeholder="Escreva seu texto aqui..."
          class="relative flex items-end h-[100%] w-full rounded-lg border-2 border-primary-green p-2"
          style="margin-bottom: 20px;"
        ></textarea>
      </div>
      <div class="flex justify-center mt-5">
        <Button
          class="bg-primary-green hover:bg-darker-green"
          @click="sendPost"
        >
          Publicar Tutorial
        </Button>
      </div>
    </section>
  </Main>
</template>
