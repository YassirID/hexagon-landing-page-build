<template>
  <RouterLink
    :to="`/news/${id}`"
    class="xl:flex xl:items-start space-y-5 xl:space-y-0 gap-4 p-4 bg-white border-b cursor-pointer border-black/30 dark:bg-black dark:border-white/30"
  >
    <div class="h-full overflow-hidden rounded-lg w-full xl:w-80 xl:h-40">
      <img :src="image" alt="Blog Image" class="object-cover w-full h-full" />
    </div>
    <div class="flex flex-col justify-between w-full h-full">
      <div class="space-y-5 xl:space-y-0">
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
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  image: String,
  category: String,
  timeAgo: String,
  title: String,
  description: String,
  id: Number, 
});
</script>
