<template>
  <div v-if="news" class="px-[56px] md:px-[112px] pt-20 dark:bg-black">
    <div>
      <h1 class="text-4xl font-semibold text-black dark:text-white">
        {{ news.judul_news }}
      </h1>
      <img
        v-if="news.fotos?.length"
        :src="`https://content.hexagon.co.id/storage/${news.fotos[0].nama_foto}`"
        alt="News Image"
        class="w-full mt-10 rounded-2xl"
      />
    </div>
    <div class="grid grid-cols-1 gap-6 mt-10 md:grid-cols-12">
      <div
        class="flex flex-col col-span-4 gap-6 p-6 bg-gray-50 dark:bg-black rounded-2xl"
      >
        <div class="flex gap-4">
          <h4 class="font-semibold text-black dark:text-white">Post :</h4>
          <h4 class="text-[#797979] dark:text-gray-400">
            {{ news.created_at }}
          </h4>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 bg-gray-400 rounded-full dark:bg-gray-600"></div>
          <h4 class="font-semibold text-black dark:text-white">
            Admin Hexagon
          </h4>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            v-if="news.category_id"
            :key="news.category_id"
            class="px-4 py-2 text-white rounded-full bg-light-primary-2"
          >
            {{ news.category_id }}
          </button>
        </div>
      </div>
      <div
        class="flex flex-col col-span-8 gap-6 p-6 bg-gray-50 dark:bg-black rounded-2xl"
      >
        <div
          v-html="news.content"
          class="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
        ></div>
        <img
          v-if="news.fotos?.length > 1"
          :src="`https://content.hexagon.co.id/storage/${news.fotos[1].nama_foto}`"
          alt="News Image"
          class="w-full mt-10 aspect-video object-cover rounded-[48px]"
        />
        <h2
          class="text-4xl font-extrabold text-black font-nunito dark:text-white"
        >
          {{ news.subTitle }}
        </h2>
        <div
          v-html="news.ket_news"
          class="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
        ></div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="flex items-center justify-center h-screen">
    Loading...
  </div>
  <div
    v-else-if="error"
    class="flex items-center justify-center h-screen text-red-500"
  >
    {{ error }}
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/axios";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const news = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchNewsDetail = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axiosInstance.get(`/api/news/${props.id}`);

    news.value = response.data.data;
  } catch (err) {
    error.value = "Error loading portfolio: " + err.message;
    console.error("Error fetching project:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNewsDetail();
});
</script>
