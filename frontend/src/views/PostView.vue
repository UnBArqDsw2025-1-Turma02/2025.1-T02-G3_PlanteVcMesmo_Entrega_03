<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { Post as PostType } from '@/types/models/post';

import { useRoute } from 'vue-router';

import ApiService from '@/api/ApiService';
import ApiRoutes from '@/api/ApiRoutes';

import Post from '@/components/base/Post/Post.vue';
import PostHeader from '@/components/base/Post/PostHeader.vue';
import PostLabelGroup from '@/components/base/Post/PostLabelGroup.vue';
import PostLabel from '@/components/base/Post/PostLabel.vue';
import PostText from '@/components/base/Post/PostText.vue';

const route = useRoute();

const post = ref<PostType>();

const id = route.params.postId as string;

onMounted(async () => {
  const response = await ApiService.get(ApiRoutes.post.by_id(id));
  if (response?.ok) {
    post.value = await response.json();
  }
});
</script>

<template>
  <Post>
    <template v-slot:header>
      <PostHeader
        :title="post?.title"
        :labels="post?.labels"
      >
        <PostLabelGroup>
          <PostLabel
            v-for="(label, index_label) in post?.labels"
            :key="index_label"
            :label="label"
          />
        </PostLabelGroup>
      </PostHeader>
    </template>
    <template v-slot:main>
      <PostText>
        {{ post?.description }}
      </PostText>
    </template>
  </Post>
</template>
