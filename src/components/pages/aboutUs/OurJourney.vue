<template>
  <div class="h-[500px] flex flex-col pt-[450px] xl:pt-72 xl:flex-row items-center justify-center gap-10 md:mx-28" id="our-journey">
    <div v-if="aboutData" class="w-full xl:w-1/2 space-y-2.5">
      <div class="flex items-center gap-2.5 mt-8">
        <div class="w-8 h-1 bg-light-primary"></div>
        <h4 class="text-sm">Our Journey</h4>
      </div>
      <div class="space-y-5">
        <h3 class="text-2xl md:text-4xl font-raleway text-[#272D3E] dark:text-white">
          {{ aboutData?.journey_title }}
        </h3>
        <p class="text-[#272D3E]/80 dark:text-gray-300 text-sm md:text-base">
          {{ aboutData?.journey_text_1 }}
          <br /><br />
          {{ aboutData?.journey_text_2 }}
        </p>
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 w-full xl:w-1/2 space-y-2.5">
      <div class="flex items-center gap-2.5 mt-8">
        <div class="w-8 h-1 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        <div class="w-24 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
      </div>
      <div class="space-y-5">
        <div class="w-full h-8 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-3/4 md:h-12"></div>
        <div class="space-y-3">
          <div class="w-full h-4 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-5/6"></div>
          <div class="w-full h-4 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-5/6"></div>
          <div class="w-full h-4 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-5/6"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between h-auto">
      <div class="flex justify-center w-full gap-2">
        <div class="relative">
          <img
            :class="selectedImage === 1 ? 'w-72 h-80' : 'w-14 h-80' + ' dark:filter dark:brightness-75'"
            src="@/assets/gallery/1.webp"
            alt="Image 1"
            class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer"
            @click="selectImage(1)"
          />
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="selectedImage === 1" class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 dark:bg-gray-700/50 backdrop-blur-md border border-white/50">
              <h3 class="text-lg font-bold text-black dark:text-white transition-all duration-300">Workshop 1</h3>
              <p class="text-xs text-black md:text-sm dark:text-gray-300 transition-all duration-300">Jl. Abdul Halim No.128, Cimahi Tengah, Kota Cimahi 40522</p>
            </div>
          </transition>
        </div>

        <div class="relative">
          <img :class="selectedImage === 2 ? 'w-72 h-80' : 'w-14 h-80'" src="@/assets/gallery/2.webp" alt="Image 2" class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer" @click="selectImage(2)" />
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="selectedImage === 2" class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 backdrop-blur-md border border-white/50">
              <h3 class="text-lg font-bold text-black dark:text-white transition-all duration-300">Workshop 2</h3>
              <p class="text-xs text-black md:text-sm dark:text-gray-300 transition-all duration-300">Jl. Terusan Jakarta No. 175, Antapani Kulon, Kec Antapani, Kota Bandung</p>
            </div>
          </transition>
        </div>

        <!-- Gambar Workshop 3 -->
        <div class="relative">
          <img :class="selectedImage === 3 ? 'w-72 h-80' : 'w-14 h-80'" src="@/assets/gallery/3.webp" alt="Image 3" class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer" @click="selectImage(3)" />
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="selectedImage === 3" class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 backdrop-blur-md border border-white/50">
              <h3 class="text-lg font-bold text-black dark:text-white transition-all duration-300">Workshop 3</h3>
              <p class="text-xs text-black md:text-sm dark:text-gray-300 transition-all duration-300">BTC (Baros Information, Technology & Creative Center)</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchAboutData } from "@/service";

const selectedImage = ref(1);
const aboutData = ref(null);

const getAboutData = async () => {
  const data = await fetchAboutData();
  if (data.error) {
    console.error(data.error);
  } else {
    aboutData.value = data;
  }
};

const selectImage = (imageIndex) => {
  selectedImage.value = imageIndex;
};

onMounted(() => {
  getAboutData();
});
</script>

<style scoped>
.dark {
  background-color: #1a202c;
  color: #ffffff;
}
</style>
