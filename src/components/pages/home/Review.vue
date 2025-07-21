<script setup>

import { ref, onMounted, computed } from "vue";
import { fetchReview } from "@/service";
import { Icon } from "@iconify/vue";
const reviewData = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentPage = ref(0);
const isLoaded = ref(false);

const totalPages = computed(() => reviewData.value?.length || 0);
const hasNextPage = computed(() => currentPage.value < totalPages.value - 1);
const hasPrevPage = computed(() => currentPage.value > 0);

const getReviewData = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await fetchReview();
    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid data format received");
    }

    reviewData.value = response.data;
  } catch (e) {
    error.value = e.message || "Failed to load reviews";
    console.error("Error fetching reviews:", e);
  } finally {
    isLoading.value = false;
  }
};
const animatePageChange = (newPage) => {
  isLoaded.value = false;
  setTimeout(() => {
    currentPage.value = newPage; 
    isLoaded.value = true; 
  }, 300); 
};

const nextPage = () => {
  if (hasNextPage.value) {
    animatePageChange(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (hasPrevPage.value) {
    animatePageChange(currentPage.value - 1);
  }
};

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    animatePageChange(page);
  }
};

onMounted(async () => {
  await getReviewData();
  isLoaded.value = true;
});

</script>

<template>
  <div class="px-[20px] md:px-[112px] relative bg-gradient-to-b z-0 pb-[78px] pt-[56px] md:pt-[78px] from-[#F3F8FF] to-white dark:bg-gradient-to-b dark:from-black dark:to-black">
    <div class="hidden md:block">
      <img src="../../../assets/about-us/hexsideshapelight.png" alt="" class="absolute right-0 -z-10 block dark:hidden" />
      <img src="../../../assets/about-us/hexsideshape.png" alt="" class="absolute right-0 z-0 dark:z-[-10] hidden dark:block" />
    </div>
    <div class="flex flex-col z-0 gap-9 items-center text-center mb-[24px]">
      <span class="inline px-4 py-2 text-xs font-medium bg-gray-100 rounded-lg dark:bg-gray-800">Review</span>
      <h1 class="font-raleway text-[30px] font-semibold text-gray-800 dark:text-white">What Our Clients Say</h1>
    </div>
    <div v-if="isLoading" class="flex justify-center items-center min-h-[300px]">
      <div class="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
    <div v-else-if="error" class="flex justify-center items-center min-h-[300px] text-red-500">
      <div class="text-center">
        <p class="mb-2 text-lg font-semibold">Error Loading Reviews</p>
        <p>{{ error }}</p>
        <button @click="getReviewData" class="px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
          Try Again
        </button>
      </div>
    </div>
    <template v-else-if="reviewData.length > 0">
      <!-- Desktop Layout -->
      <div class="hidden md:block">
        <div class="flex flex-col lg:flex-row gap-[18px] mb-[18px] z-10">
          <div class="lg:max-w-[750px] w-full flex flex-col bg-[#136ff8] rounded-[20px] shadow-lg relative">
            <div class="p-[56px] pt-[55px]">
              <p class="text-[16px] text-white font-normal">
                {{ reviewData[currentPage].review }}
              </p>
            </div>
            <div class="p-[56px] pt-0 flex items-center">
              <div class="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full">
                <img src="../../../../Logo.png" :alt="reviewData[currentPage].nama" class="object-cover w-full h-full" />
              </div>
              <div class="ml-4">
                <h3 class="text-white">{{ reviewData[currentPage].nama }}</h3>
                <p class="font-normal text-white">{{ reviewData[currentPage].dari }}</p>
              </div>
            </div>
            <div class="absolute bottom-0 right-0 flex items-center justify-center">
              <img src="@/assets/Group 11.svg" alt="Icon" class="h-13" />
            </div>
            <div class="absolute bottom-0 right-0 flex gap-2 transition-opacity duration-300 opacity-0 hover:opacity-100">
              <img src="@/assets/Large unit.svg" alt="Large Unit Icon" class="h-[200px]" />
            </div>
          </div>
          

<div class="relative w-full h-full flex items-center justify-center">
  <div class="max-w-[450px] w-full flex flex-col items-center justify-center 
              rounded-[16px] p-[5px] relative 
              md:rotate-90 xl:rotate-0
              h-full">
    
    <div class="z-20 flex flex-col items-center gap-2">
      <img src="@/assets/Top arrow.svg"
           @click="prevPage"
           :disabled="currentPage === 0"
           alt="Previous"
           class="z-30 cursor-pointer" />

      <div class="flex flex-col space-y-2">
        <div
          v-for="(review, index) in reviewData"
          :key="index"
          @click="goToPage(index)"
          :class="[
            'w-1 cursor-pointer rounded-full transition-all duration-1000',
            currentPage === index ? 'bg-blue-500 h-16' : 'bg-blue-200 h-8'
          ]"
        ></div>
      </div>
      <img src="@/assets/scroll.svg"
           @click="nextPage"
           :disabled="currentPage === totalPages - 1"
           alt="Next"
           class="z-30 cursor-pointer" />
    </div>
  </div>
</div>

        </div>
      </div>
      <div class="md:hidden block">
        <div class="flex flex-col items-center">
          <div class="w-full max-w-[350px] bg-[#136ff8] rounded-[20px] shadow-lg relative p-6">
            <p class="text-[16px] text-white font-normal line-clamp-5">
              {{ reviewData[currentPage].review }}
            </p>
            <div class="flex items-center mt-4">
              <div class="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full">
                <img :src="reviewData[currentPage].foto" :alt="reviewData[currentPage].nama" class="object-cover w-full h-full"
                     @error="$event.target.src = '/placeholder-avatar.png'" />
              </div>
              <div class="ml-4">
                <h3 class="text-white">{{ reviewData[currentPage].nama }}</h3>
                <p class="font-normal text-white">{{ reviewData[currentPage].dari }}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-4 mt-6">
            <button @click="prevPage" :disabled="currentPage === 0" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <Icon icon="line-md:arrow-left" class="w-4 h-4" />
            </button>
            <div class="flex gap-2">
              <button v-for="(review, index) in reviewData" :key="index" @click="goToPage(index)"
                      :class="{ 'bg-blue-500': currentPage === index, 'bg-gray-300': currentPage !== index }"
                      class="w-3 h-3 rounded-full transition-colors duration-200">
              </button>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages - 1" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <Icon icon="line-md:arrow-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="flex justify-center items-center min-h-[300px] text-gray-500 dark:text-gray-400">
      <p class="text-lg">No reviews available</p>
    </div>
  </div>
</template>

<style scoped>

.active-dot {
  content: url("@/assets/Active dot.svg");
}

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
