<template>
  <!-- Container Utama untuk Carousel Berita -->
  <section class="relative py-16 px-2 dark:bg-black">
    <!-- Background Image: Menampilkan gambar latar belakang penuh -->
    <img src="../../../assets/news/Background.png" alt="Background"
      class="absolute inset-0 object-cover w-full h-full" />

    <!-- Header Section: Menampilkan label, judul, dan deskripsi blog -->
    <div class="mb-12 text-center">
      <p class="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-800 dark:text-blue-200 rounded-md">
        Blog
      </p>
      <h1 class="mt-4 text-3xl font-semibold text-light-primary dark:text-white font-raleway">
        Our Blog and Highlight
      </h1>
      <p class="mt-2 text-gray-400 dark:text-gray-300">
        Get the latest articles from our journal, writing, discuss and share
      </p>
    </div>

    <!-- Blog Card Section: Container untuk carousel berita -->
    <div class="relative max-w-6xl mx-auto">
      <!-- Navigation Buttons: Tombol prev dan next untuk navigasi slide (hanya muncul di desktop) -->
      <button @click="prevSlide"
        class="absolute z-10 w-12 h-12 hidden md:block transition-all rotate-45 hover:rotate-45 -translate-y-1/2 rounded-xl -left-6 top-1/2 bg-white dark:bg-black hover:bg-[#0C3DF4] dark:hover:bg-[#0C3DF4]">
      </button>

      <button @click="nextSlide"
        class="absolute z-10 w-12 h-12 hidden md:block transition-all rotate-45 hover:rotate-45 -translate-y-1/2 rounded-xl -right-6 top-1/2 bg-white dark:bg-black hover:bg-[#0C3DF4] dark:hover:bg-[#0C3DF4]">
      </button>

      <!-- Carousel Container: Menampilkan slide carousel dengan transisi horizontal -->
      <div class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <!-- Looping setiap slide berita -->
        <div v-for="(blog, index) in newsCarouselData" :key="index" class="flex-shrink-0 w-full">
          <!-- Blog Card: Menampilkan gambar, kategori, tanggal, judul, dan deskripsi singkat -->
          <div class="relative h-96">
            <img :src="blog.images[0]" :alt="blog.judul_news" class="object-cover w-full h-full " />
            <div
              class="absolute inset-0 flex flex-col justify-end w-full p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
              <!-- Informasi Kategori, Icon, dan Tanggal -->
              <div class="mb-3 space-x-6 text-xs font-medium text-gray-200">
                <span class="uppercase">{{ blog.Kategori }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                  class="inline-block w-3 h-3">
                  <path fill="white"
                    d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                <span>{{ blog.dibuat }}</span>
              </div>
              <!-- Judul Berita -->
              <h2 class="text-xl font-semibold text-white">{{ blog.judul_news }}</h2>
              <!-- Deskripsi Singkat dengan pemotongan teks (line clamp) -->
              <div class="sm:max-w-[400px] max-w-full">
                <p class="mt-1 text-xs text-white sm:text-sm line-clamp-2">{{ blog.ket_news }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Dots: Navigasi dengan tombol dot -->
      <div class="absolute flex gap-2 right-20 bottom-4">
        <button v-for="(_, index) in newsCarouselData" :key="index" @click="goToSlide(index)"
          class="w-2 h-2 transition-all rounded-full"
          :class="currentIndex === index ? 'bg-[#157EFB] w-4' : 'bg-white'"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
/* ------------------------------ */
/* Import Modul, Komponen, dan Fungsi */
/* ------------------------------ */
// Mengimpor fungsi reactive dan lifecycle hook dari Vue
import { ref, onMounted, onUnmounted } from "vue";
// Mengimpor fungsi fetchNews dari service untuk mengambil data berita
import { fetchNews } from "@/service";

// ------------------------------
// Inisialisasi State Reaktif
// ------------------------------
// Menyimpan data berita untuk carousel
const newsCarouselData = ref([]);
// State untuk menyimpan indeks slide saat ini
const currentIndex = ref(0);
// Variabel untuk menyimpan interval autoplay slide
let autoSlideInterval = null;

/* ------------------------------ */
/* Fungsi Pengambilan Data Berita  */
/* ------------------------------ */
const getCarouselData = async () => {
  const data = await fetchNews();
  if (data.error) {
    console.error("Error fetching news:", data.error);
  } else {
    // Memetakan data sehingga kategori hanya mengambil elemen pertama dari string
    newsCarouselData.value = data.data.map(item => ({
      ...item,
      Kategori: item.Kategori ? item.Kategori.split(",")[0] : ""
    }));
  }
};

/* ------------------------------ */
/* Fungsi Navigasi Slide          */
/* ------------------------------ */
// Fungsi untuk berpindah ke slide berikutnya
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % newsCarouselData.value.length;
};

// Fungsi untuk berpindah ke slide sebelumnya
const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0
    ? newsCarouselData.value.length - 1
    : currentIndex.value - 1;
};

// Fungsi untuk langsung menuju slide tertentu
const goToSlide = (index) => {
  currentIndex.value = index;
};

/* ------------------------------ */
/* Fungsi Autoplay                */
/* ------------------------------ */
// Mulai autoplay dengan interval 5000ms
const startAutoplay = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

// Hentikan autoplay
const stopAutoplay = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
};

/* ------------------------------ */
/* Lifecycle Hooks                */
/* ------------------------------ */
onMounted(() => {
  // Ambil data berita dan mulai autoplay
  getCarouselData();
  startAutoplay();
});

// Hapus interval autoplay saat komponen di-unmount
onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
/* Optional: Menambahkan transisi halus untuk slide */
.carousel-slide {
  transition: transform 0.5s ease-in-out;
}
</style>
