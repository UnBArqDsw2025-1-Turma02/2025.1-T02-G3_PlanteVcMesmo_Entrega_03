<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const slot = useTemplateRef('slot');

const active = ref(true);
const indicatorX = ref(0);

const toggles = ref<Map<string, HTMLElement>>(new Map());

const updateIndicator = async () => {
  await nextTick();

  let el: HTMLElement | undefined = undefined;
  el = toggles.value.get((route.name ?? '') as string);

  if (el && el.offsetParent) {
    const rect = el.getBoundingClientRect();
    const containerRect = el.offsetParent.getBoundingClientRect();

    indicatorX.value = rect.left - containerRect.left + rect.width / 2 - 10;
    active.value = true;
  } else {
    active.value = false;
  }
};

watch(
  () => route.name,
  () => {
  updateIndicator();
});

onMounted(() => {
  const regex = /^footer-toggle-([a-zA-Z]+)$/;
  slot.value?.childNodes.forEach((el) => {
    if (el.nodeType === Node.ELEMENT_NODE) {
      const element = el as HTMLElement;
      for (const cls of element.classList) {
        const match = regex.exec(cls);
        if (match) toggles.value.set(match[1], element);
      }
    }
  });

  updateIndicator();
});
</script>

<template>
  <footer class='flex flex-col px-6 text-gray-500 relative py-4'>
    <section ref='slot' class='flex justify-around gap-12 items-start relative pb-3'>
      <slot />
      <span
        v-if="active"
        class='bg-secondary-green rounded-full h-2 absolute bottom-0 left-0 transition-all duration-500 w-5'
        :style='{
          transform: `translateX(${indicatorX}px)`,
        }'
      ></span>
    </section>
  </footer>
</template>
