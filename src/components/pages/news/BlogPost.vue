<template>
  <div v-if="news" class="px-[56px] md:px-[112px] pt-20 dark:bg-black">
    <div>
      <h1 class="text-4xl font-semibold text-black dark:text-white">{{ news.judul_news }}</h1>
      <img :src="news.images[0]" alt="News Image" class="w-full mt-10 rounded-2xl" />
    </div>
    <div class="grid grid-cols-1 gap-6 mt-10 md:grid-cols-12">
      <div class="flex flex-col col-span-4 gap-6 p-6 bg-gray-50 dark:bg-black rounded-2xl">
        <div class="flex gap-4">
          <h4 class="font-semibold text-black dark:text-white">Post :</h4>
          <h4 class="text-[#797979] dark:text-gray-400">{{ news.dibuat }}</h4>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 bg-gray-400 rounded-full dark:bg-gray-600"></div>
          <h4 class="font-semibold text-black dark:text-white">Admin Hexagon</h4>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button v-for="tag in news.Kategori" :key="tag" class="px-4 py-2 text-white rounded-full bg-light-primary-2">
            {{ tag }}
          </button>
        </div>
      </div>
      <div class="flex flex-col col-span-8 gap-6 p-6 bg-gray-50 dark:bg-black rounded-2xl">
        <div v-html="news.content" class="max-w-4xl mx-auto prose prose-lg dark:prose-invert"></div>
        <img v-if="news.images[1]" :src="news.images[1]" alt="News Image" class="w-full mt-10 aspect-video object-cover rounded-[48px]" />
        <h2 class="text-4xl font-extrabold text-black font-nunito dark:text-white">{{ news.subTitle }}</h2>
        <div v-html="news.ket_news" class="max-w-4xl mx-auto prose prose-lg dark:prose-invert"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axios';

const news = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();

const fetchPortofolio = async () => {
    const id = route.params.id;
    try {
        loading.value = true;
        error.value = null;
        const response = await axiosInstance.get(`/api/News/${id}`);
        
        if (response.data.Kategori) {
            response.data.Kategori = response.data.Kategori.split(',').map(tag => tag.trim());
        }
        
        news.value = response.data;
    } catch (err) {
        error.value = 'Error loading portfolio: ' + err.message;
        console.error('Error fetching project:', err);
    } finally {
        loading.value = false;
    }
};

fetchPortofolio();
</script>
