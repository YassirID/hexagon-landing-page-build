<template>
  <div class="flex flex-col items-center justify-between max-w-6xl p-8 mx-auto xl:flex-row">
    <div class="w-full mb-8 xl:w-1/2 md:mb-0">
      <img src="@/assets/about-us/superman_3d.png" alt="Superman 3D" class="hidden xl:block w-3/4 h-auto" />
      <img src="@/assets/about-us/superman_3d_aslicuy.png" alt="Superman 3D" class="xl:hidden md:h-full md:pb-10  h-auto" />
    </div>

    <div class="w-full xl:w-1/2 xl:pl-8">
      <h1 class="mb-4 text-xl font-semibold text-blue-900 dark:text-blue-400 md:text-2xl">
        Transforming Ideas into Digital Excellence
      </h1>
      <p class="mb-6 text-gray-600 dark:text-gray-300 text-md">
        Explore our suite of tailored digital services—from IT consultation to branding and digital marketing—crafted to empower your business and maximize impact in a dynamic digital landscape.
      </p>

      <ul class="mb-8 space-y-3">
        <li v-for="service in services" :key="service" class="flex items-center space-x-2">
          <span class="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full dark:bg-blue-400">
            <span class="text-sm text-white">✓</span>
          </span>
          <span class="text-gray-700 dark:text-gray-300">
            {{ service }}
          </span>
        </li>
      </ul>
      <div class="block md:hidden">
        <button @click="$router.push({ name: 'contact' })" class="flex items-center justify-center gap-2 px-5 py-3 md:rounded-full rounded-lg w-full border-[#0A58CA] dark:border-white border dark:border-2 text-light-primary hover:scale-105 transition-all duration-300">
          <div class="block w-2 h-2 rounded-full bg-light-secondary dark:bg-blue-400"></div>
          See More
        </button>
      </div>
      <div class="hidden md:flex flex-wrap gap-4">
        <Button @click="$router.push({ name: 'contact', hash: '#navbar' })">
          See More
        </Button>

        <ButtonOutline @click="$router.push({ name: 'contact' })">
          <div class="block w-2 h-2 rounded-full bg-light-secondary dark:bg-blue-400"></div>
          Request Consultation
        </ButtonOutline>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "../../button/Button.vue"; 
import ButtonOutline from "../../button/ButtonOutline.vue"; 

const services = ref(["IT Consultation", "Digital Marketing", "Branding", "Media Consultant"]);
</script>
