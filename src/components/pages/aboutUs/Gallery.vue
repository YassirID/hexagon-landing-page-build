
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { fetchGallery } from "@/service"; 

const galleries = ref([]);
const activeIndex = ref(0);
const getGallery = async () => {
  const data = await fetchGallery();
  if (data.error) {
    console.error(data.error); 
  } else {
    if (Array.isArray(data)) {
      galleries.value = data.map((client) => ({
        ...client,
        image: `${client.image}`, 
      }));
    } else {
      console.error("Data yang diterima bukan array:", data);
    }
  }
};

onMounted(() => {
  getGallery();
});

const scrollContainer = ref(null);

let scrollInterval;
const scrollSpeed = 3000;
const startScroll = () => {
  const container = scrollContainer.value;
  const slides = container.children;
  let currentIndex = 0;

  scrollInterval = setInterval(() => {
    if (!container || !slides || slides.length === 0) return;

    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
      container.scrollTo({
        left: 0,
        behavior: "auto",
      });
    } else {
      const nextSlide = slides[currentIndex];
      container.scrollTo({
        left: nextSlide.offsetLeft,
        behavior: "smooth",
      });
    }

    activeIndex.value = currentIndex; 
  }, scrollSpeed);

};

const goToIndex = (index) => {
  const container = scrollContainer.value;
  const slides = container.children;
  const target = slides[index];
  if (target) {
    container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    activeIndex.value = index;
  }
};



const resumeScroll = () => {
  startScroll();
};

onMounted(() => {
  startScroll();
});

</script>

<template>
        <div class="relative w-full pb-24 overflow-hidden bg-white rounded-xl dark:bg-black">
          <div ref="scrollContainer" class="flex gap-4 p-4 overflow-x-auto hide-scrollbar scroll-snap-x">
            <div
              v-for="(gallery, index) in galleries"
              :key="gallery.id"
              class="flex-shrink-0 w-[calc(100%-2rem)] sm:w-1/2 md:w-1/3 h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden scroll-snap-align hover:scale-105 transition-all duration-300"
            >
              <img :src="gallery.image" :alt="`Gallery image ${index + 1}`" class="object-cover w-full h-full" />
            </div>
          </div>
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
    <button
      v-for="(gallery, index) in galleries"
      :key="index"
      @click="goToIndex(index)"
      class="w-3 h-3 rounded-full transition-all duration-300"
      :class="activeIndex === index
        ? 'bg-blue-600 dark:bg-white scale-110'
        : 'bg-gray-300 dark:bg-gray-600 opacity-60'"
    ></button>
    </div>
        </div>
        
</template>

<style scoped>

.hide-scrollbar {
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; 
}


.scroll-snap-x {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth; 
}

.scroll-snap-align {
  scroll-snap-align: center;
}
</style>
