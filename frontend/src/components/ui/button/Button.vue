<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type ButtonVariants, buttonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
});
</script>

<template>
  <Primitive data-slot="button" :as="as" :as-child="asChild" :class="cn(
    buttonVariants({ variant, size }),
    'cursor-pointer w-72 h-12 text-base rounded-2xl transition-all duration-300 ease-in-out',
    props.class
  )"
    :style="variant === 'link' && {
      paddingInline: '0',
      paddingBlock: '0',
    }"
  >
    <slot />
  </Primitive>
</template>
