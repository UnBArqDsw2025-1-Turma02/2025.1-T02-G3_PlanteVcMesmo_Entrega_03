<script setup lang="ts">
import Footer from '@/components/base/Footer/Footer.vue';
import FooterLink from '@/components/base/Footer/FooterLink.vue';
import FooterIcon from '@/components/base/Footer/FooterIcon.vue';
</script>

<template>
    <div
      class='grid grid-rows-10 h-screen'
    >
    <slot />
    <Footer>
      <FooterLink target='about'>
        <FooterIcon
          normal='fluent:home-12-regular'
          active='fluent:home-12-filled'
        />
      </FooterLink>
      <FooterLink target='shopping'>
        <FooterIcon
          normal='solar:bag-4-outline'
          active='solar:bag-4-bold'
        />
      </FooterLink>
      <FooterLink target='news'>
        <FooterIcon
          normal='majesticons:note-text-line'
          active='majesticons:note-text'
        />
      </FooterLink>
    </Footer>
  </div>
</template>
