<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
    <div>
        <button
            class="bg-green-700 text-white rounded-full px-6 py-3 text-base font-bold shadow-lg transition hover:-translate-y-0.5 hover:scale-105"
            @click="showModal = true"
        >
            Criar Tutorial
        </button>
        <div
            v-if="showModal"
            class="fixed inset-0 flex items-center justify-center z-50"
            :style="{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%)'
            }"
            @click.self="showModal = false"
        >
            <div class="bg-white p-8 rounded-lg min-w-[300px] shadow-xl">
                <h2 class="mb-4">Criar formulario de tutorial</h2>
                <button class="text-gray-500 hover:text-gray-700" @click="showModal = false">
                    Fechar
                </button>
            </div>
        </div>
    </div>
</template>
