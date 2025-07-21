  <script setup>
import Button from '@/components/button/Button.vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';
</script>

<template>
  <div class="relative h-screen max-h-[500px] mb-16">
    <div class="flex flex-col items-center justify-center hero-section-bg absolute w-full h-full bg-no-repeat z-0">
      <span class="bg-gradient-to-b absolute bottom-0 h-1/2 to-white z-[2]"></span>
      <div class="hidden md:block mx-auto">
        <p class="mt-15 text-white text-center">
          <a href="#" class="text-white mr-5 bg-light-secondary rounded-3xl px-3 py-2">Subscribe</a> Free for basic Plan
        </p>
        <h1 class="mt-10 text-5xl font-bold text-center text-white mb-15">
          Build the Future with <br>Us! Start Your <br> Partnership Now!
        </h1>
        <div class="flex items-center justify-center mt-15 space-x-4">
          <Button @click="$router.push({ name: 'contact' })">
            <span class="flex items-center gap-2">
            <span class="block w-2 h-2 rounded-full bg-white"></span>
            <span class="text-white">Let's Chat!</span>
            </span>
          </Button>
          <ButtonOutline @click="$router.push({ name: 'contact' })">
            <span class="flex items-center gap-2 ">
            <span class="block w-2 h-2 rounded-full bg-light-secondary "></span>
            <span class="text-white ">Request a Consultation</span>
            </span>
          </ButtonOutline>
        </div>
      </div>
      <div class="md:hidden block">
        <p class="mt-8 text-white text-center">
          <a href="#" class="text-white bg-light-secondary rounded-3xl px-3 py-2">Subscribe</a> Free for basic Plan
        </p>
        <h1 class="mt-6 text-2xl font-bold text-center text-white mb-8">
          Build the Future with Us!<br>Start Your Partnership Now!
        </h1>
        <div class="flex flex-col items-center mt-8 space-y-4">
          <!-- Tombol "Let's Chat!" -->
          <Button @click="$router.push({ name: 'contact' })">
            <span class="text-white">Let's Chat!</span>
          </Button>
          <ButtonOutline @click="$router.push({ name: 'contact' })" class="px-4 py-2 text-white rounded bg-white dark:bg-gray-400 dark:bg-opacity-50 border border-white hover-gradient group ">
            <span class="block w-2 h-2 rounded-full bg-light-secondary"></span>
            <span class="text-black dark:text-white group-hover:text-white">Request a Consultation</span>
          </ButtonOutline>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section-bg {
  background-image: url(@/assets/NewOrnament.png), linear-gradient(to bottom, #2F84FF, #0C57C3);
  background-position: center;
  background-size: cover;
}
.dark .hero-section-bg {
  background-image: url(@/assets/DarkNewOrnament.png);
}
</style>
