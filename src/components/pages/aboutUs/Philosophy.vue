<template>
  <div class="relative pt-96 md:pt-52">
    <img 
      src="@/assets/about-us/ser_shape.png" 
      alt="Shape"
      class="absolute top-0 right-0 hidden md:block"
    />
    <img 
      src="@/assets/about-us/ser_shape_r.png" 
      alt="Shape"
      class="absolute bottom-0 left-0 hidden md:block"
    />

    <div v-if="aboutData" class="max-w-[1000px] mx-auto pb-32 pt-20">
      <div class="flex flex-col items-center gap-2.5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-[2px] bg-light-secondary"></div>
          <h4 class="text-sm md:text-md dark:text-light-secondary">Our Business Philosophy</h4>
        </div>
        <h1 class="text-xl md:text-4xl lg:text-6xl font-normal font-raleway text-[#272D3E] dark:text-white text-center">
          Guided by the Wisdom of the Bee
        </h1>
        <img 
          src="@/assets/about-us/bee.png" 
          alt="Bee" 
          class="w-64 my-10 md:w-72 lg:w-80"
        />
        <p class="mt-4 text-base text-center text-gray-600 dark:text-gray-400 md:text-lg">
          {{ aboutData?.philosophy || "Loading..." }}
        </p>
      </div>
    </div>
    <div v-else class="bg-white dark:bg-gray-800 max-w-[1000px] mx-auto pb-32 pt-20 px-4">
      <div class="flex flex-col items-center gap-2.5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-1 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div class="w-32 h-4 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"></div>
        </div>
        <div class="w-64 h-10 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"></div>
        <div class="w-48 h-48 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"></div>
        <div class="w-64 h-6 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchAboutData } from "@/service";
const aboutData = ref(null);

const getAboutData = async () => {
  const data = await fetchAboutData();
  if (data.error) {
    console.error(data.error); 
  } else {
    aboutData.value = data; 
  }
};

onMounted(() => {
  getAboutData();
});
</script>
