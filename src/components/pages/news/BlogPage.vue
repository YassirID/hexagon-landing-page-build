<script setup>
import { ref, computed } from "vue";
import BlogPost from "../../News/BlogPost.vue";
import Sidebar from "../../News/Sidebar.vue";
import Pagination from "../../News/Pagination.vue";
import debounce from "lodash/debounce";
import axiosInstance from "@/axios";

const cardItems = ref([]);
const currentPage = ref(1);
const postsPerPage = 5;
const selectedCategory = ref("All");
const searchQuery = ref("");
const totalPages = ref(0);
async function fetchProjectData(page = 1) {
  try {
    const response = await axiosInstance.get(`/api/News?page=${page}`);

    if (response.data && response.data.data) {
      cardItems.value = response.data.data.map((item) => ({
        id: item.news_id,
        category: item.Kategori ? item.Kategori.split(',').map(tag => tag.trim())[0] : "",
        title: item.judul_news,
        description: item.ket_news,
        image: item.images?.length ? item.images[0] : "",
        urlYoutube: item.url_youtube,
        alt: item.judul_news,
        timeAgo: "1 ",
      }));
      currentPage.value = response.data.current_page;
      totalPages.value = response.data.last_page;
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}

const categories = computed(() => {
  const counts = cardItems.value.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return [{ name: "All", count: cardItems.value.length }, ...Object.keys(counts).map((key) => ({ name: key, count: counts[key] }))];
});

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

const paginatedFilteredPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

const debouncedSearch = debounce((query) => {
  searchQuery.value = query;
}, 300);

const selectCategory = (category) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};

fetchProjectData();
</script>

<template>
  <hr class="w-full border-t border-gray-300" />
  <div id="blogpage" class="container min-h-screen px-4 pb-20 mx-auto dark:bg-black">
    <div class="py-10 text-center">
      <h1 class="text-4xl font-bold text-blue-600">Our Blog and Highlight</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Get the latest articles from our journal, writing, discuss, and share
      </p>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div class="order-1 col-span-full xl:col-span-8">
        <div class="space-y-8">
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

          <BlogPost v-else v-for="(post, index) in paginatedFilteredPosts" :key="index" 
                    :image="post.image" 
                    :category="post.category" 
                    :timeAgo="post.timeAgo" 
                    :title="post.title" 
                    :description="post.description" 
                    :id="post.id" />
        </div>
      </div>

      <div class="order-3 col-span-full xl:order-2 xl:col-span-4">
        <Sidebar :categories="categories" :onSearch="debouncedSearch" @selectCategory="selectCategory" />
      </div>

      <div class="order-2 xl:order-3 xl:col-span-8  col-span-full">
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous="previousPage" @next="nextPage" @go-to-page="goToPage" />
      </div>
    </div>
  </div>
</template>
