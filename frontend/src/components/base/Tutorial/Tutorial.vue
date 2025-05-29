<template>
    <div>
        <button class="pretty-button" @click="showModal = true">Criar Tutorial</button>
        <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
            <div class="modal-content">
                <button @click="showModal = false">Fechar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style scoped>
.pretty-button {
    background: #43a047;
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(76, 175, 80, 0.2);
    transition: background 0.3s, transform 0.2s;
}
.pretty-button:hover {
    transform: translateY(-2px) scale(1.03);
}
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    min-width: 300px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
</style>