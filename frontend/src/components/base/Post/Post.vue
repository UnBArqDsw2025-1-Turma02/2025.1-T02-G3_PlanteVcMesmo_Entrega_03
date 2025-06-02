<script setup lang="ts">
import Header from '@/components/base/Header/Header.vue';
</script>

<template>
  <Header class="flex flex-col gap-3.5 row-span-3 px-7 pt-16">
    <slot name="header"></slot>
  </Header>
  <slot name="main"></slot>
</template>
