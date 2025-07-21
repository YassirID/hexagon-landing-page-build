<script setup lang="ts">
import Button from '../../../components/button/Button.vue';
import ButtonOutline from '../../../components/button/ButtonOutline.vue';

const scrollToSection = () => {
    const element = document.querySelector('#service');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); 
    }
};
</script>

<template>
  <img src="@/assets/news/Background.png" alt="Background"
       class="absolute inset-0 object-cover w-full h-full -z-10"/>
    <div class="px-[36px] md:px-[112px] bg-white dark:bg-gradient-to-b dark:from-black dark:to-black pt-20 md:pt-16 mb-40">
        <div class="flex flex-col gap-9 items-center text-center mb-[60px]">
            <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline">
                Our Service
            </span>
            <h1 class="font-raleway text-[24px] md:text-[60px] font-bold text-gradient">
                Empowering your business<br>with smart solutions
            </h1>
            <p class="font-raleway text-[16px] font-semibold text-gray-600 dark:text-white">
                We Provide Perfect IT Solutions For Your Business
            </p>
            <div class="flex flex-col sm:flex-row gap-[14px]">
                <Button @click="scrollToSection">
                    <span class="flex items-center gap-2">
                    <span class="block w-2 h-2 rounded-full bg-white"></span>
                    <span>Explore Our Service</span>
                    </span>
                </Button>
                <ButtonOutline @click="$router.push({ name: 'contact' })">
                    <span class="block w-2 h-2 rounded-full bg-light-secondary"></span>
                    <span class="dark:text-white">Request A Consultation</span>
                </ButtonOutline>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active-dot {
    content: url('@/assets/Active dot.svg');
}

.dark .card-bg {
    background-image: url(@/assets/services/bg.png);
    background-position: center;
    background-size: cover;
}
</style>
