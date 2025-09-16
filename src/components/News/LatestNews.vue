<script setup>
import Button from "@/components/button/Button.vue";
import ButtonOutline from "@/components/button/ButtonOutline.vue";
import { Icon } from "@iconify/vue";
import { fetchNews } from "@/service";
import { ref, onMounted } from "vue";
import NewsCard from "@/components/pages/news/NewsCard.vue"; // <- Import komponen

const cardItems = ref([]);
const activeCard = ref(1);

const getLatestData = async () => {
  const data = await fetchNews();
  if (data.error) {
    console.error("Error fetching news:", data.error);
  } else {
    cardItems.value = data.data;
  }
};

function handleScroll() {
  const container = document.querySelector(".project-container");
  const activeCardIndex = Math.ceil(
    container.scrollLeft / container.children[0].offsetWidth
  );
  activeCard.value = activeCardIndex === 0 ? 1 : activeCardIndex;
}

onMounted(() => {
  const container = document.querySelector(".project-container");
  container.addEventListener("scroll", handleScroll);
  getLatestData();
});
</script>

<template>
  <!-- ... header dll tetap ... -->

  <!-- Desktop Cards -->
  <div class="hidden md:block">
    <div
      class="flex justify-start gap-[24px] py-[56px] overflow-x-auto project-container"
    >
      <div
        v-if="cardItems.length == 0"
        class="bg-white p-[24px] w-[395px] flex-shrink-0 border-r-2 dark:border-none dark:bg-[#0D0D0D] animate-pulse"
        aria-label="Loading latest"
      >
        <!-- Skeleton -->
      </div>

      <NewsCard
        v-for="(card, index) in cardItems.slice(0, 3)"
        :key="card.news_id"
        :image="
          card.fotos?.length
            ? `https://content.hexagon.co.id/storage/${card.fotos[0].nama_foto}`
            : ''
        "
        :category="card.category_id"
        :timeAgo="card.created_at"
        :title="card.judul_news"
        :description="card.ket_news"
        :id="card.news_id"
      />
    </div>
  </div>

  <!-- Mobile Cards -->
  <div class="block md:hidden">
    <div class="flex flex-col px-4 py-6 divide-y divide-gray-300">
      <div v-if="cardItems.length == 0" class="py-6">
        <!-- Skeleton -->
      </div>
      <div
        v-else
        v-for="(card, index) in cardItems"
        :key="index"
        class="py-6 cursor-pointer"
        @click="$router.push(`/news/${card.news_id}`)"
      >
        <div class="flex justify-between gap-4">
          <div class="flex flex-col flex-1 gap-2">
            <h1
              class="text-gray-800 dark:text-white font-raleway text-[16px] font-bold line-1"
            >
              {{ card.judul_news }}
            </h1>
            <p
              class="text-sm text-gray-600 font-light dark:text-[#D6DADE] line-clamp-2"
            >
              {{ card.ket_news }}
            </p>
            <div class="justify-between">
              <div
                class="text-[12px] flex items-center gap-2 text-blue-500 font-semibold hover:underline mt-2"
              >
                Baca selengkapnya
                <Icon
                  icon="solar:map-arrow-right-bold-duotone"
                  width="12"
                  height="12"
                />
              </div>
            </div>
          </div>
          <img
            v-if="card.fotos?.length"
            :src="`https://content.hexagon.co.id/storage/${card.fotos[0].nama_foto}`"
            :alt="card.alt"
            class="object-cover w-32 h-24 rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
