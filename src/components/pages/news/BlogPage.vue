<script setup>
/* ------------------------------ */
/* Import Modul, Komponen, dan Fungsi */
/* ------------------------------ */
// Mengimpor fungsi reactive, computed, dan lifecycle hook dari Vue
import { ref, computed } from "vue";
// Mengimpor komponen BlogPost, Sidebar, dan Pagination untuk menyusun halaman blog
import BlogPost from "../../News/BlogPost.vue";
import Sidebar from "../../News/Sidebar.vue";
import Pagination from "../../News/Pagination.vue";
// Mengimpor fungsi debounce dari lodash untuk mengoptimalkan pencarian
import debounce from "lodash/debounce";
// Mengimpor axios instance yang sudah dikonfigurasi
import axiosInstance from "@/axios";

/* ------------------------------ */
/* Inisialisasi State dan Variabel  */
/* ------------------------------ */
// Menyimpan data postingan blog dalam array
const cardItems = ref([]);
// Menyimpan halaman saat ini untuk pagination
const currentPage = ref(1);
// Menentukan jumlah postingan per halaman
const postsPerPage = 5;
// State untuk kategori yang dipilih, default "All"
const selectedCategory = ref("All");
// State untuk query pencarian
const searchQuery = ref("");
// State untuk total halaman (akan dihitung setelah data diambil)
const totalPages = ref(0);

/* ------------------------------ */
/* Fungsi Pengambilan Data Posting  */
/* ------------------------------ */
async function fetchProjectData(page = 1) {
  try {
    // Mengambil data postingan dari API dengan parameter halaman
    const response = await axiosInstance.get(`/api/News?page=${page}`);

    if (response.data && response.data.data) {
      // Memetakan data API ke format yang diinginkan
      cardItems.value = response.data.data.map((item) => ({
        id: item.news_id,
        // Memecah string kategori dan mengambil elemen pertama
        category: item.Kategori ? item.Kategori.split(',').map(tag => tag.trim())[0] : "",
        title: item.judul_news,
        description: item.ket_news,
        image: item.images?.length ? item.images[0] : "",
        urlYoutube: item.url_youtube,
        alt: item.judul_news,
        timeAgo: "1 ",
      }));
      // Mengatur halaman saat ini dan total halaman dari respons API
      currentPage.value = response.data.current_page;
      totalPages.value = response.data.last_page;
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

/* ------------------------------ */
/* Computed Properties             */
/* ------------------------------ */
// Menghitung kategori yang tersedia berdasarkan data postingan
const categories = computed(() => {
  const counts = cardItems.value.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return [{ name: "All", count: cardItems.value.length }, ...Object.keys(counts).map((key) => ({ name: key, count: counts[key] }))];
});

// Menghasilkan postingan yang sudah difilter berdasarkan kategori dan query pencarian
const filteredPosts = computed(() => {
  let result = cardItems.value;

  if (selectedCategory.value !== "All") {
    result = result.filter((item) => item.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return result;
});

// Menghasilkan postingan yang ditampilkan untuk halaman saat ini (pagination)
const paginatedFilteredPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

/* ------------------------------ */
/* Fungsi Navigasi Halaman         */
/* ------------------------------ */
// Fungsi untuk berpindah ke halaman sebelumnya
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Fungsi untuk berpindah ke halaman berikutnya
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Fungsi untuk langsung menuju halaman tertentu
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

/* ------------------------------ */
/* Fungsi Pencarian (Debounced)    */
/* ------------------------------ */
// Menggunakan debounce untuk menunda update pencarian sehingga tidak terjadi pencarian berlebihan
const debouncedSearch = debounce((query) => {
  searchQuery.value = query;
}, 300);

/* ------------------------------ */
/* Fungsi Pemilihan Kategori       */
/* ------------------------------ */
// Fungsi untuk mengubah kategori yang dipilih dan reset halaman ke 1
const selectCategory = (category) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};

// Memanggil fetchProjectData untuk mengambil data postingan saat komponen dimuat
fetchProjectData();
</script>

<template>
  <!-- Container Utama Blog Page -->
  <div id="blogpage" class="container min-h-screen px-4 pb-20 mx-auto dark:bg-black">
    <!-- Header Section -->
    <div class="py-10 text-center">
      <h1 class="text-4xl font-bold text-blue-600">Our Blog and Highlight</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Get the latest articles from our journal, writing, discuss, and share
      </p>
    </div>

    <!-- Grid Wrapper untuk konten dan sidebar -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
      <!-- Blog Posts (Mobile: order-1, Desktop: left column 8/12) -->
      <div class="order-1 md:col-span-8">
        <div class="space-y-8">
          <!-- Placeholder jika belum ada data postingan -->
          <div class="flex items-start gap-4 p-4 bg-white border-b cursor-pointer border-black/30 dark:bg-black dark:border-white/30" v-if="!paginatedFilteredPosts.length">
            <div class="h-40 overflow-hidden bg-gray-300 rounded-lg w-80 animate-pulse"></div>
            <div class="flex flex-col justify-between w-full h-full">
              <div>
                <p class="w-1/3 h-4 mb-2 text-sm text-gray-500 bg-gray-300 rounded animate-pulse dark:text-white"></p>
                <h2 class="w-1/2 h-6 mb-2 text-xl font-bold text-gray-800 bg-gray-300 rounded animate-pulse dark:text-white"></h2>
                <p class="w-3/4 h-4 mt-2 text-sm text-gray-600 bg-gray-300 rounded animate-pulse dark:text-white"></p>
              </div>
              <div class="flex items-center justify-between gap-2 mt-4 text-sm text-gray-500 dark:text-white">
                <div class="flex gap-2">
                  <div class="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                <div class="w-1/4 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Menampilkan komponen BlogPost untuk setiap postingan -->
          <BlogPost v-else v-for="(post, index) in paginatedFilteredPosts" :key="index" 
                    :image="post.image" 
                    :category="post.category" 
                    :timeAgo="post.timeAgo" 
                    :title="post.title" 
                    :description="post.description" 
                    :id="post.id" />
        </div>
      </div>

      <!-- Sidebar (Mobile: order-2, Desktop: right column 4/12) -->
      <div class="order-3 md:order-2 md:col-span-4">
        <!-- Mengirimkan prop categories dan onSearch ke komponen Sidebar -->
        <Sidebar :categories="categories" :onSearch="debouncedSearch" @selectCategory="selectCategory" />
      </div>

      <!-- Pagination (Mobile: order-3, Desktop: berada di bawah blog posts di kolom kiri) -->
      <div class="order-2 md:order-3 md:col-span-8">
        <!-- Mengirimkan prop currentPage dan totalPages serta event handler untuk navigasi pagination -->
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous="previousPage" @next="nextPage" @go-to-page="goToPage" />
      </div>
    </div>
  </div>
</template>
