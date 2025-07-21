<script setup>
import Button from '@/components/button/Button.vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';
import { ref, onMounted, computed, onUnmounted } from "vue";
import axiosInstance from "@/axios";
import { Icon } from '@iconify/vue';
const cardItems = ref([]);
const totalPages = ref(1);
const totalItems = ref(0);
const activeTag = ref("All");
const tags = ref([]);
const isMobile = ref(false);
const isLoading = ref(false);
function checkScreenSize() {
  isMobile.value = window.innerWidth < 768;
  if (currentPage.value === 1) {
    fetchProjectData();
  }
}
async function fetchProjectData(page = 1) {
  try {
    isLoading.value = true;
    const params = new URLSearchParams({
      page: page,
      perpage: perPage,
      ...(activeTag.value !== 'All' && { tag: activeTag.value })
    });
    const response = await axiosInstance.get(`/api/Portofolio?${params}`);
    
    if (response.data) {
      totalPages.value = Math.ceil(response.data.total / response.data.per_page);
      currentPage.value = response.data.current_page;
      totalItems.value = response.data.total;
      
      cardItems.value = response.data.data.map((item) => ({
        id: item.id,
        tag: item.Kategori,
        title: item.judul_porto,
        description: item.ket_porto,
        image: item.images.length ? item.images[0] : "",
        urlYoutube: item.url_youtube,
        alt: item.judul_porto,
      }));

      if (!tags.value.length) {
        extractTags(response.data.data);
      }
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  } finally {
    isLoading.value = false;
  }
}
function extractTags(items) {
  const allTags = items.map(item => item.Kategori).filter(Boolean);
  const uniqueTags = [...new Set(allTags)];
  tags.value = uniqueTags;
}
const visiblePages = computed(() => {
  const delta = 1;
  let range = [];
  range.push(1);
  for (let i = currentPage.value - delta; i <= currentPage.value + delta; i++) {
    if (i > 1 && i < totalPages.value) {
      range.push(i);
    }
  }
  if (totalPages.value > 1) {
    range.push(totalPages.value);
  }
  let result = [];
  let last = 0;
  for (const n of range) {
    if (last + 1 < n) {
      result.push(-1); 
    }
    result.push(n);
    last = n;
  }
  return result;
});


function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchProjectData(currentPage.value);
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchProjectData(currentPage.value);
  }
}
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchProjectData(page);
  }
}
function setActiveTag(tag) {
  activeTag.value = tag;
  currentPage.value = 1;
  fetchProjectData(1);
}


window.addEventListener('resize', checkScreenSize);

  checkScreenSize();
  fetchProjectData();
});
</script>

<template>
  <div id="portofolio" class="flex flex-col items-center px-4 md:px-[112px] dark:bg-black">
    <div v-if="cardItems.length === 0" class="text-center py-8">
      <p class="text-gray-600 dark:text-gray-400">No portfolios found for the selected category.</p>
    </div>
    <div v-else class="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3 w-full">
      <div
        v-for="card in cardItems"
        :key="card.id"
        class="bg-white dark:bg-black dark:hover:shadow-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200 overflow-hidden p-[24px] max-w-full md:max-w-[395px] rounded-2xl flex-shrink-0"
      >
        <img
          :src="card.image"
          :alt="card.alt"
          class="w-full h-48 md:h-64 object-cover mb-[24px] rounded-lg"
        />
        <div class="space-y-[16px]">
          <span class="px-3 py-2 text-xs rounded bg-blue-50 dark:bg-gray-800">
            {{ card.tag }}
          </span>
          <h1 class="text-gray-800 font-raleway text-2xl md:text-[32px] font-semibold dark:text-white line-clamp-1">
            {{ card.title }}
          </h1>
          <p class="text-[14px] md:text-[16px] text-gray-600 dark:text-gray-400 line-clamp-3">
            {{ card.description }}
          </p>
          <router-link
            :to="{ name: 'portfolio-detail', params: { id: card.id } }"
            class="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            See Details
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8 flex-wrap">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded-lg dark:bg-transparent"
        :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 dark:text-white' : 'bg-white hover:bg-gray-50'"
      >
        Previous
      </button>
      <template v-for="page in visiblePages" :key="page">
        <span v-if="page === -1" class="px-3 py-1">...</span>
        <button
          v-else
          @click="goToPage(page)"
          class="px-3 py-1 border rounded-lg dark:bg-transparent"
          :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'"
        >
          {{ page }}
        </button>
      </template>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded-lg dark:bg-transparent"
        :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 dark:text-white' : 'bg-white hover:bg-gray-50'"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style>
.hover\:bg-blue-500:hover { background-color: #3b82f6; }
.hover\:text-white:hover { color: white; }
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:text-white:hover p, .hover\:text-white:hover h1 { color: white; }
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }

.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
</style>
