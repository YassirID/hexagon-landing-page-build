<script setup>
import Button from "@/components/button/Button.vue";
import ButtonOutline from "@/components/button/ButtonOutline.vue";

const scrollToSection = () => {
  const element = document.querySelector("#portofolio");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <img src="@/assets/news/Background.png" alt="Background"
       class="absolute inset-0 object-cover w-full h-full -z-10"/>
  <div class="px-[32px] md:px-[112px] dark:bg-black pt-20">
    <div class="flex flex-col gap-9 items-center text-center mb-[60px]">
      <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline">
        Our Portfolio
      </span>
      <h1 class="font-raleway text-[24.5px] md:text-[58px] break-all font-bold text-gradient">
        Showcasing the excellence<br class="hidden md:block"/> and diversity of our projects.
      </h1>
      <p class="font-raleway text-[16px] font-semibold text-gray-600 dark:text-white">
        Mengembangkan Bisnis, Satu Solusi pada Satu Waktu
      </p>
      <div class="flex flex-col sm:flex-row gap-[14px]">
        <Button @click="scrollToSection">
          <span class="flex items-center gap-2">
            <span class="block w-2 h-2 rounded-full bg-white"></span>
          <span>Explore Our Works</span>
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
