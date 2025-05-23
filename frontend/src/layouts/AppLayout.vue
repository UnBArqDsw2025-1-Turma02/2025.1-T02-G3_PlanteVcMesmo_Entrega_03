<script setup lang="ts">
import Footer from '@/components/base/Footer/Footer.vue';
import FooterIconLink from '@/components/base/Footer/FooterIconLink.vue';
</script>

<template>
    <div
      class='grid grid-rows-10 grid-cols-[minmax(0,1fr)] h-screen'
    >
    <slot />
    <Footer>
      <FooterIconLink
        target='about'
        normal='fluent:home-12-regular'
        active='fluent:home-12-filled'
      />
      <FooterIconLink
        target='shopping'
        normal='solar:bag-4-outline'
        active='solar:bag-4-bold'
      />
      <FooterIconLink
        target='news'
        normal='majesticons:note-text-line'
        active='majesticons:note-text'
      />
    </Footer>
  </div>
</template>
