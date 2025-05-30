<script setup>
import { ref } from 'vue';

import Button from '@/components/ui/button/Button.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToNewPost = () => {
  router.push({ name: 'newpost' });
};

const showModal = ref(false);
</script>

<template>
    <div>
        <Button
            class="bg-primary-green"
            @click="navigateToNewPost"
        >
            Criar Tutorial
        </Button>
        <div
            v-if="showModal"
            class="fixed inset-0 flex items-center justify-center z-50"
            :style="{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%)'
            }"
            @click.self="showModal = false"
        >
            <div class="bg-white p-8 rounded-lg min-w-[300px] shadow-xl">
                <h2 class="mb-4">Criar formulário de tutorial</h2>
                <Button
                  variant="ghost"
                  @click="showModal = false"
                >
                    Fechar
                </Button>
            </div>
        </div>
    </div>
</template>
