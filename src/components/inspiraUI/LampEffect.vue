<template>
  <div :class="cn(
    'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#2147A7] dark:bg-slate-950 w-full rounded-md z-0',
    $props.class,
  )">
    <div class="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
      <div :style="{
        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
      }"
        class="animate-conic-gradient bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[32rem] overflow-visible from-[#2125ff] via-transparent to-transparent text-white opacity-50 [--conic-position:from_70deg_at_center_top]">
        <div
          class="absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div
          class="absolute bottom-0 left-0 z-20 h-full w-80  [mask-image:linear-gradient(to_right,white,transparent)]" />
      </div>

      <div :style="{
        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
      }"
        class="animate-conic-gradient bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[32rem] from-transparent via-transparent to-[#2125ff] text-white opacity-50 [--conic-position:from_290deg_at_center_top]">
        <div
          class="absolute bottom-0 right-0 z-20 h-full w-80  [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div
          class="absolute bottom-0 right-0 z-20 h-40 w-full  [mask-image:linear-gradient(to_top,white,transparent)]" />
      </div>

      <div class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-[2.5] bg-[#2147A7] dark:bg-slate-950 blur-2xl"></div>

      <div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

      <div
        class="absolute inset-auto z-50 h-36 w-[64rem] -translate-y-1/2 rounded-full bg-[#2125ff] opacity-50 blur-3xl">
      </div>


      <div
        class="animate-spotlight absolute inset-auto z-30 h-12 w-64 -translate-y-24 rounded-full bg-[#21ffe5] blur-2xl">
      </div>


      <div class="animate-glowing-line absolute inset-auto z-50 h-0.5 w-[32rem] -translate-y-28 bg-[#1781eb]"></div>

      <div class="absolute inset-auto z-40 h-44 w-full translate-y-[-12.5rem] bg-[#2147A7] dark:bg-slate-950"></div>
    </div>

    <div class="relative z-50 flex -translate-y-80 flex-col items-center px-5">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { computed } from "vue";

interface LampEffectProps {
  delay?: number;
  duration?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<LampEffectProps>(), {
  delay: 0.5,
  duration: 0.8,
});

const durationInSeconds = computed(() => `${props.duration}s`);
const delayInSeconds = computed(() => `${props.delay}s`);
</script>

<style scoped>
.animate-spotlight {
  animation: spotlight-anim ease-in-out v-bind(durationInSeconds) forwards;
  animation-delay: v-bind(delayInSeconds);
}


.animate-glowing-line {
  animation: glowing-line-anim ease-in-out v-bind(durationInSeconds) forwards;
  animation-delay: v-bind(delayInSeconds);
}


.animate-conic-gradient {
  animation: conic-gradient-anim ease-in-out v-bind(durationInSeconds) forwards;
  animation-delay: v-bind(delayInSeconds);
}


@keyframes spotlight-anim {
  from {
    width: 16rem;
  }

  to {
    width: 64rem;
  }
}


@keyframes glowing-line-anim {
  from {
    width: 32rem;
  }

  to {
    width: 64rem;
  }
}


@keyframes conic-gradient-anim {
  from {
    opacity: 0.5;
    width: 32rem;
  }

  to {
    opacity: 1;
    width: 64rem;
  }
}
</style>