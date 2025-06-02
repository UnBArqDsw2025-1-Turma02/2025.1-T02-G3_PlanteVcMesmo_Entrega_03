<script setup lang="ts">
import Main from '@/components/base/Main/Main.vue';
</script>

<template>
    <Main
        class="p-7 row-span-3"
    >
      <pre
        class="text-base font-sora text-justify whitespace-pre-line"
      >
        <slot />
      </pre>
    </Main>
</template>
