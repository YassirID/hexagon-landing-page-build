<script setup>
import Button from '@/components/button/Button.vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';
import LatestNews from '@/components/News/LatestNews.vue';
</script>

<template>
        <div class="flex justify-start gap-[24px] pb-[56px] overflow-x-auto project-container">
            <LatestNews></LatestNews>
        </div>
</template>

<style scoped>
.project-container::-webkit-scrollbar {
    display: none;
}

.project-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>