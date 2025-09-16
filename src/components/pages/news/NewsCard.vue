<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  image: String,
  category: String,
  timeAgo: String,
  title: String,
  description: String,
  id: Number,
});

const router = useRouter();

const redirectToPost = () => {
  if (props.id) {
    router.push(`/news/${props.id}`);
  }
};
</script>

<template>
  <div
    @click="redirectToPost"
    class="block p-[24px] w-[395px] flex-shrink-0 border-r hover:bg-gray-50 dark:hover:bg-gray-900 rounded-l-2xl transition cursor-pointer"
  >
    <img :src="image" alt="News" class="mb-[24px] rounded-2xl w-full aspect-[3/2] object-cover" />
    <div class="space-y-[16px]">
      <span class="px-3 py-2 text-xs font-bold text-blue-500">{{ category }}</span>
      | <span class="px-3 py-2 text-xs text-black font-semibold dark:text-[#D6DADE]">{{ timeAgo }}</span>
      <h1 class="text-gray-800 dark:text-white font-raleway text-[25px] font-bold">{{ title }}</h1>
      <p class="text-[13px] text-gray-600 font-light dark:text-[#D6DADE] line-clamp-3">{{ description }}</p>
      <div class="flex items-center gap-2">
        <img src="@/assets/logoA.png" alt="" />
        <span class="inline-block text-gray-900 dark:text-white">Admin Hexagon</span>
      </div>
    </div>
  </div>
</template>
