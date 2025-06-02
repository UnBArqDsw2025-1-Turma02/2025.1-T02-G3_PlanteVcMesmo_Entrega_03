<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { Icon } from '@iconify/vue';

import Header from '@/components/base/Header/Header.vue';
import Main from '@/components/base/Main/Main.vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { Post } from '@/types/models/post';

import ApiService from '@/api/ApiService';
import ApiRoutes from '@/api/ApiRoutes';

const posts = ref<Post[]>([]);
const filtered = ref<Post[]>([]);

const search = ref<string>('');

watch(
  () => search.value,
  () => {
    const parsed = search.value.trim();
    if (parsed) {
      filtered.value = posts.value.filter(post => post.title.toLocaleLowerCase().includes(parsed.toLocaleLowerCase()));
    } else filtered.value = posts.value;
  }
);

onMounted(async () => {
  const response = await ApiService.get(ApiRoutes.post.root);
  if (response?.ok) {
    posts.value = (await response.json()).posts;
    filtered.value = posts.value;
  }
});
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
          :value="search"
          @input="(event: InputEvent) => search = (event.target as HTMLInputElement).value"
          placeholder='Buscar uma tutorial'
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
  </Header>
  <Main>
    <section
      class='flex flex-col py-5 px-8 gap-5 overflow-y-auto'
    >
      <router-link
        v-for="(post, index_post) in filtered"
        :to="{ path: '/post/' + post.id }"
        :key="index_post"
        class="relative flex flex-col gap-1 justify-between rounded-2xl p-2.5 bg-gray-100 shadow-md"
      >
        <span
          class="absolute right-1 text-sm text-gray-500"
        >
          {{ (new Date(post.updatedAt)).toLocaleDateString('PT-BR') }}
        </span>
        <div
          class="pt-3.5"
        >
          <h2>
            {{ post.title }}
          </h2>
          <div
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="(label, index_label) in post.labels"
              :key="index_label"
              :style="{
                background: label.color
              }"
              class="text-sm text-white py-0.5 px-2.5 rounded-xl"
            >
              {{ label.name }}
            </span>
          </div>
        </div>
      </router-link>
    </section>
  </Main>
</template>
