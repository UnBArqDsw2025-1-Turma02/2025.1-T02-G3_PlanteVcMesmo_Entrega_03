<template>
  <component :is='layout'>
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useRoute } from 'vue-router';

import EmptyLayout from './layouts/EmptyLayout.vue';
import AppLayout from './layouts/AppLayout.vue';
import ProtectedLayout from './layouts/ProtectedLayout.vue';

export default defineComponent({
  setup() {
    const route = useRoute();

    const layout = computed(() => {
      const layoutMap = {
        app: AppLayout,
        protected: ProtectedLayout,
        empty: EmptyLayout
      } as const;

      const layoutKey = (route.meta.layout as keyof typeof layoutMap) || 'app';
      return layoutMap[layoutKey];
    });

    return {
      layout
    };
  }
});
</script>
