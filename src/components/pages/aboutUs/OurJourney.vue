
<template>
  <div
    class="flex flex-col pt-10 md:pt-[450px] xl:pt-72 xl:flex-row items-center justify-center gap-10 md:mx-28 min-h-[500px]"
    id="our-journey"
  >
    <!-- Debug Info -->
    <div
      v-if="error"
      class="w-full p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <p class="text-red-600">Error: {{ error }}</p>
    </div>

    <!-- Konten Utama -->
    <template v-if="!loading && aboutData">
      <!-- Teks Journey -->
      <div class="w-full xl:w-1/2 space-y-2.5">
        <div class="flex items-center gap-2.5 mt-8">
          <div class="w-8 h-1 bg-light-primary"></div>
          <h4 class="text-sm">Our Journey</h4>
        </div>
        <div class="space-y-5">
          <h3
            class="text-2xl md:text-4xl font-raleway text-[#272D3E] dark:text-white"
          >
            {{ aboutData.journey_title || "Default Title" }}
          </h3>
          <p class="text-[#272D3E]/80 dark:text-gray-300 text-sm md:text-base">
            {{ aboutData.journey_text_1 || "Default text 1" }}
            <br /><br />
            {{ aboutData.journey_text_2 || "Default text 2" }}
          </p>
        </div>
      </div>
      <!-- Galeri Gambar -->
      <Expandable :images="galleryImages" class="h-auto w-full xl:w-1/2" />
    </template>

    <!-- Skeleton Loader -->
    <template v-if="loading">
      <div class="w-full xl:w-1/2 space-y-2.5">
        <div class="flex items-center gap-2.5 mt-8">
          <div class="w-8 h-1 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div
            class="w-24 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse"
          ></div>
        </div>
        <div class="space-y-5">
          <div
            class="w-full h-8 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-3/4 md:h-12"
          ></div>
          <div class="space-y-3">
            <div
              class="w-full h-4 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-5/6"
            ></div>
            <div
              class="w-full h-4 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-5/6"
            ></div>
            <div
              class="w-full h-4 bg-gray-300 dark:bg-gray-600 animate-pulse md:w-5/6"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="w-full xl:w-1/2 h-80 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
      ></div>
    </template>

    <!-- Fallback ketika tidak ada data -->
    <div
      v-if="!aboutData && !loading && !error"
      class="w-full xl:w-1/2 space-y-2.5"
    >
      <div class="flex items-center gap-2.5 mt-8">
        <div class="w-8 h-1 bg-light-primary"></div>
        <h4 class="text-sm">Our Journey</h4>
      </div>
      <div class="space-y-5">
        <h3
          class="text-2xl md:text-4xl font-raleway text-[#272D3E] dark:text-white"
        >
          Default Journey Title
        </h3>
        <p class="text-[#272D3E]/80 dark:text-gray-300 text-sm md:text-base">
          Default journey text content would appear here.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchAboutData } from "@/service";
import Expandable from "@/components/inspiraUI/Expandable.vue";
import image1 from "@/assets/gallery/1.webp";
import image2 from "@/assets/gallery/2.webp";
import image3 from "@/assets/gallery/3.webp";

const aboutData = ref(null);
const loading = ref(true);
const error = ref(null);

const galleryImages = ref([
  {
    src: image1,
    title: "Workshop 1",
    address: "Jl. Abdul Halim No.128, Cimahi Tengah, Kota Cimahi 40522",
  },
  {
    src: image2,
    title: "Workshop 2",
    address:
      "Jl. Terusan Jakarta No. 175, Antapani Kulon, Kec Antapani, Kota Bandung",
  },
  {
    src: image3,
    title: "Workshop 3",
    address: "BTC (Baros Information, Technology & Creative Center)",
  },
]);

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
  console.log("🟢 OurJourney component mounted");
  getAboutData();
});
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
}

.aspect-w-16::before {
  content: "";
  display: block;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>