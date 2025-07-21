<script setup>
import Button from '@/components/button/Button.vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';
const scrollToSection = () => {
  const element = document.querySelector('#our'); 
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="px-[56px] md:px-[112px] dark:bg-black mb-[150px] pt-20 md:pt-16">
    <div class="flex flex-col gap-9 items-center text-center mb-[60px]">
      <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline">
        Career Opportunities
      </span>
      <h1 class="font-raleway text-[40px] md:text-[60px] font-bold text-gradient">
        Join With Us!
      </h1>
      <p class="font-raleway text-[13px] md:text-[16px] font-semibold text-gray-600 dark:text-white">
        Be part of a dynamic team that values innovation, growth, and collaboration.
      </p>
      <div class="flex flex-col sm:flex-row gap-[14px]">
        <Button @click="scrollToSection">
          <span class="flex items-center gap-2">
            <span class="block w-2 h-2 rounded-full bg-white"></span>
          <span>Explore Position</span>
          </span>
        </Button>
        <ButtonOutline @click="$router.push({ name: 'contact' })">
          <span class="block w-2 h-2 rounded-full bg-light-secondary"></span>
          <span class="dark:text-white">Request a Consultation</span>
        </ButtonOutline>
      </div>
    </div>
  </div>
</template>
