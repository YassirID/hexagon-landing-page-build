<script setup>

import Button from '@/components/button/Button.vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';
import { ref, onMounted, nextTick } from 'vue';
import axiosInstance from '@/axios';

const cardItems = ref([]);
const activeCard = ref(1);
const projectContainer = ref(null);

async function fetchProjectData() {
    try {
        const response = await axiosInstance.get('/api/Portofolio');
        if (response.data && response.data.data) {
            cardItems.value = response.data.data.map((item) => ({
                tag: item.Kategori,
                title: item.judul_porto,
                description: item.ket_porto,
                image: item.images.length ? item.images[0] : '',
                alt: item.judul_porto
            }));
        }
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
}

function handleScroll() {
    if (projectContainer.value) {
        const activeCardIndex = Math.ceil(projectContainer.value.scrollLeft / projectContainer.value.children[0].offsetWidth);
        activeCard.value = activeCardIndex === 0 ? 1 : activeCardIndex;
    }
}

onMounted(() => {
    fetchProjectData();

    nextTick(() => {
        if (projectContainer.value) {
            projectContainer.value.addEventListener('scroll', handleScroll);
        }
    });
});
</script>

<template>
    <div class="bg-gradient-to-t from-[#F3F8FF] to-white dark:bg-gradient-to-t dark:from-black dark:to-black">
        <div class="px-[16px] md:px-[112px] mt-4 md:mt-[56px]">
            <div class="md:mb-[56px]">
                <div class="flex items-center justify-between">
                    <span class="inline px-4 py-2 text-xs font-medium bg-gray-100 rounded-lg dark:bg-gray-800">
                        Our Projects
                    </span>
                    <ButtonOutline @click="$router.push({ name: 'portfolio' })">
                        <font-awesome-icon icon="arrow-right" />
                        <span class="hidden md:block">
                            Show All Portfolio
                        </span>
                    </ButtonOutline>
                </div>

                <div class="flex items-center justify-center mt-[14px]">
                    <h1 class="font-semibold text-[20px] md:text-[32px] font-raleway tracking-[-0.64px] pt-[10px] dark:text-white">
                        We provide perfect IT solutions for your business
                    </h1>
                </div>
            </div>
        </div>

        <div class="hidden md:block">
            <div class="relative overflow-hidden px-4">
                <div class="flex justify-start gap-[24px] md:py-[56px] overflow-x-auto project-container" ref="projectContainer">
                    <div v-for="(card, index) in cardItems" :key="index"
                        class="px-[24px] w-[395px] rounded-2xl flex-shrink-0 hover:shadow-2xl transition-all duration-1000 mb-6"
                        :class="{ 'ml-[56px] md:ml-[112px]': index == 0, '': index + 1 == activeCard }">
                        <img v-if="card.image" :src="card.image" :alt="card.alt" class="mb-[24px] w-full aspect-[3/2] object-cover rounded-lg">
                        <div class="space-y-[16px]">
                            <span class="inline px-4 py-2 text-xs font-medium bg-gray-100 rounded-lg dark:bg-gray-800">
                                {{ card.tag }}
                            </span>
                            <h1 class="text-gray-800 font-raleway text-[22px] font-semibold dark:text-white line-clamp-2">
                                {{ card.title }}
                            </h1>
                            <p class="text-[14px] text-gray-600 dark:text-gray-400 line-clamp-4">
                                {{ card.description }}
                            </p>
                            <RouterLink class="inline-block">
                                <span>See Details</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="md:hidden block mx-4">
            <div class="relative overflow-hidden px-4">
                <div class="flex justify-start gap-4 py-4 overflow-x-auto project-container">
                    <div v-for="(card, index) in cardItems" :key="index"
                        class="p-4 w-[80vw] rounded-2xl flex-shrink-0 hover:shadow-2xl transition-all duration-1000 mb-6">
                        <img v-if="card.image" :src="card.image" :alt="card.alt" class="mb-4 rounded-lg">
                        <div class="space-y-3">
                            <span class="inline px-3 py-1 text-xs font-medium bg-gray-100 rounded-lg dark:bg-gray-800">
                                {{ card.tag }}
                            </span>
                            <h1 class="text-gray-800 font-raleway text-xl font-semibold dark:text-white line-clamp-2">
                                {{ card.title }}
                            </h1>
                            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {{ card.description }}
                            </p>
                            <RouterLink class="inline-block text-blue-500 hover:underline">
                                <span>See Details</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="error" class="text-red-500 text-center p-4">
            {{ error }}
        </div>
    </div>
</template>

<style>
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
