<template>
  <div
    @click="redirectToPost"
    class="flex items-start gap-4 p-4 bg-white border-b cursor-pointer border-black/30 dark:bg-black dark:border-white/30"
  >
    <div class="h-40 overflow-hidden rounded-lg w-80">
      <img :src="image" alt="Blog Image" class="object-cover w-full h-full" />
    </div>
    <div class="flex flex-col justify-between w-full h-full">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <span class="font-bold align-middle text-light-primary dark:text-light-secondary">
            {{ category }}
          </span>
          &nbsp;|&nbsp; {{ timeAgo }}
        </p>
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ title }}</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ description }}</p>
      </div>
      <div class="flex items-center justify-between gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex gap-2">
          <!-- <div
            class="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full font-extralight bg-light-primary dark:bg-light-secondary"
          >
            A
          </div>
          By {{ author }} -->
        </div>
        ·
        <!-- <div>
          <span>{{ comments }} Comments</span> ·
          <span>{{ views }} Views</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  image: String,
  category: String,
  timeAgo: String,
  title: String,
  description: String,
  // author: String,
  // comments: Number,
  // views: String,
  id: Number, // ID untuk routing
});

const router = useRouter();

const redirectToPost = () => {
  router.push(`/news/${props.id}`); // Langsung gunakan prop `id`
};
</script>
