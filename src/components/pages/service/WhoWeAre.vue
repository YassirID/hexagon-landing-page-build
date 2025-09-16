<template>
  <div class="bg-gradient-to-b from-white to-[#F3F8FF] dark:bg-gradient-to-b dark:from-black dark:to-black">
    <!-- Container for consistent padding and centering -->
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Left Column: Text Content -->
        <div class="lg:w-1/2 text-center lg:text-left">
          <div>
            <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-sm font-medium inline-block">
              Who We Are
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-raleway tracking-tight leading-tight font-bold text-gray-800 dark:text-white mt-6 mb-4">
            More Than 100 Companies<br> Trust and Choose <span class="text-gradient">Hexagon inc</span>
          </h1>
          <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Over 100 companies trust us for reliable, tailored digital solutions that enhance their business presence.
          </p>
          <div class="mt-8">
            <Button @click="$router.push({ name: 'contact' })">
              <span>Let's Work!</span>
            </Button>
          </div>
        </div>

        <!-- Right Column: Orbit Animation -->
        <div class="lg:w-1/2 w-full">
          <div class="relative flex h-[450px] md:h-[600px] w-full flex-col items-center justify-center bg-transparent">
            <img src="@/assets/services/100+ Client Choose Us.png" alt="services" class="font-semibold leading-none text-center pointer-events-none text-8xl w-[150px] md:w-[250px]" /> <!-- Ukuran gambar tengah tetap -->

            <Orbit class="size-[30px] md:size-[65px] items-center justify-center border-none bg-transparent"
              :duration="35" :delay="0" :radius="isMobile ? 60 : 90" path
              :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883488.webp" alt="Client 1"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[30px] md:size-[65px] items-center justify-center border-none bg-transparent"
              :duration="35" :delay="8.75" :radius="isMobile ? 60 : 90" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883480.webp" alt="Client 2"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[30px] md:size-[65px] items-center justify-center border-none bg-transparent"
              :duration="35" :delay="17.5" :radius="isMobile ? 60 : 90" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883476.webp" alt="Client 3"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[30px] md:size-[65px] items-center justify-center border-none bg-transparent"
              :duration="35" :delay="26.25" :radius="isMobile ? 60 : 90" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883495.webp" alt="Client 4"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[40px] md:size-[60px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 100 : 150" :delay="0" :duration="40" path
              :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883496.webp" alt="Client 5"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[40px] md:size-[60px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 100 : 150" :delay="13.33" :duration="40" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/kartika.webp" alt="Client 6" class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[40px] md:size-[60px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 100 : 150" :delay="26.66" :duration="40" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/ulbi.webp" alt="Client 7" class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[50px] md:size-[75px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 140 : 210" :duration="45" :delay="0" path
              :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883498.webp" alt="Client 8"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[50px] md:size-[75px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 140 : 210" :duration="45" :delay="15" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883475.webp" alt="Client 9"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[50px] md:size-[75px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 140 : 210" :duration="45" :delay="30" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883485.webp" alt="Client 10"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[60px] md:size-[90px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 180 : 270" :duration="55" :delay="0" path
              :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883481.webp" alt="Client 11"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[60px] md:size-[90px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 180 : 270"  :duration="55" :delay="11" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883497.webp" alt="Client 12"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[60px] md:size-[90px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 180 : 270"  :duration="55" :delay="22" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883490.webp" alt="Client 13"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[60px] md:size-[90px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 180 : 270"  :duration="55" :delay="33" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883484.webp" alt="Client 14"
                class="object-contain w-full h-full" />
            </Orbit>

            <Orbit class="size-[60px] md:size-[90px] items-center justify-center border-none bg-transparent"
              :radius="isMobile ? 180 : 270"  :duration="55" :delay="44" :direction="ORBIT_DIRECTION.CounterClockwise">
              <img src="@/assets/about-us/OurClient/Frame 1597883494.webp" alt="Client 15"
                class="object-contain w-full h-full" />
            </Orbit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ORBIT_DIRECTION } from "../../../utils";
import Orbit from "../../inspiraUI/Orbit.vue";
import Button from '../../../components/button/Button.vue';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

</script>

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
