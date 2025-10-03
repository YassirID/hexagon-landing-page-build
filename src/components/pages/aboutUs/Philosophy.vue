<template>
  <div class="relative pt-4 xl:pt-9 md:pt-5">
    <img
      src="@/assets/about-us/ser_shape.png"
      alt="Shape"
      class="absolute top-0 right-0 hidden md:block -z-10"
    />
    <img
      src="@/assets/about-us/ser_shape_r.png"
      alt="Shape"
      class="absolute bottom-0 -left-60 hidden md:block -z-10"
    />

    <div
      v-if="!loading && aboutData"
      class="max-w-[1000px] mx-auto pb-32 pt-20"
    >
      <div class="flex flex-col items-center gap-2.5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-[2px] bg-light-secondary"></div>
          <h4 class="text-sm md:text-md dark:text-light-secondary">
            Our Business Philosophy
          </h4>
        </div>
        <h1
          class="text-xl md:text-4xl lg:text-6xl font-normal font-raleway text-[#272D3E] dark:text-white text-center"
        >
          Guided by the Wisdom of the Bee
        </h1>

        <model-viewer
          ref="modelViewerRef"
          src="/models/bee_fixed-v1.glb"
          poster="/models/bee_poster.webp"
          alt="A 3D model of an animated bee"
          ar
          camera-orbit="0deg 75deg 105%"
          autoplay
          auto-rotate
          environment-image="neutral"
          shadow-intensity="1"
          class="w-64 h-64 my-10 md:w-72 md:h-72 lg:w-80 lg:h-80"
        ></model-viewer>

        <!-- Philosophy Section -->
        <div
          v-if="aboutData?.philosophy"
          class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
        >
          <h4 class="font-semibold text-lg mb-2 hidden">Our Philosophy</h4>
          <p class="text-[#272D3E]/80 dark:text-gray-300 text-sm md:text-base">
            {{ aboutData.philosophy }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="bg-white dark:bg-gray-800 max-w-[1000px] mx-auto pb-32 pt-20 px-4"
    >
      <div class="flex flex-col items-center gap-2.5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-1 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div
            class="w-32 h-4 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"
          ></div>
        </div>
        <div
          class="w-64 h-10 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"
        ></div>
        <div
          class="w-48 h-48 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"
        ></div>
        <div
          class="w-64 h-6 bg-gray-300 rounded dark:bg-gray-800 animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchAboutData } from "@/service";

const aboutData = ref(null);
const modelViewerRef = ref(null);
const loading = ref(true);
const error = ref(null);

const getAboutData = async () => {
  try {
    loading.value = true;
    error.value = null;
    console.log("🟡 Starting fetch about data...");

    const response = await fetchAboutData();
    console.log("🔵 Raw response:", response);

    // Cek berbagai kemungkinan struktur response
    if (response.error) {
      error.value = response.error;
      console.error("❌ Service error:", response.error);
    } else if (
      response &&
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      // Struktur: { status: "success", data: [...] }
      aboutData.value = response.data[0];
      console.log("✅ About data loaded:", aboutData.value);
    } else if (response && Array.isArray(response) && response.length > 0) {
      // Struktur: langsung array
      aboutData.value = response[0];
      console.log("✅ About data loaded (direct array):", aboutData.value);
    } else if (response && typeof response === "object") {
      // Struktur: langsung object
      aboutData.value = response;
      console.log("✅ About data loaded (direct object):", aboutData.value);
    } else {
      error.value = "No data available or unexpected structure";
      console.warn("⚠ No about data found in response");
      console.log("Response structure:", response);
    }
  } catch (err) {
    error.value = "Failed to load about data: " + err.message;
    console.error("❌ Error in getAboutData:", err);
  } finally {
    loading.value = false;
    console.log("🟢 Loading completed, aboutData:", aboutData.value);
  }
};

onMounted(() => {
  getAboutData();
});
</script>