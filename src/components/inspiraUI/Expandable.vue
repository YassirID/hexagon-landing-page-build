<template>
  <div :class="cn('flex justify-center w-full gap-2', props.class)">
    <div
      v-for="(image, index) in images"
      :key="image.src"
      class="relative"
    >
      <img
        :class="selectedImage === index 
          ? 'w-72 h-80 dark:filter dark:brightness-75' 
          : 'w-14 h-80'"
        :src="image.src"
        :alt="image.title"
        class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer"
        @click="selectImage(index)"
      />
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedImage === index"
          class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 dark:bg-gray-700/50 backdrop-blur-md border border-white/50"
        >
          <h3 class="text-lg font-bold text-black dark:text-white transition-all duration-300">
            {{ image.title }}
          </h3>
          <p class="text-xs text-black md:text-sm dark:text-gray-300 transition-all duration-300">
            {{ image.address }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from "../../utils/cn";


interface Image {
  src: string;
  title: string;
  address: string;
}

interface Props {
  images: Image[];
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
const selectedImage = ref<number | null>(null);

const selectImage = (index: number) => {
  selectedImage.value = index;
};
</script>