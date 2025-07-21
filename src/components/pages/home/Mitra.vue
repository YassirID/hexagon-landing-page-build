<template>
  <div class="relative w-full py-15 space-y-[68px] bg-white dark:bg-black">
    <div class="flex flex-col gap-9 items-center text-center px-[30px]">
      <span class="inline px-4 py-2 text-xs font-medium bg-gray-100 rounded-lg dark:bg-gray-800">Mitra</span>
      <h1 class="font-raleway text-[24px] md:text-[30px] font-semibold text-gray-800 dark:text-white">
        Sebagai mitra Direktorat Jendral Pendidikan Vokasi <br />
        Kementerian Pendidikan Dasar dan Menengah Republik Indonesia
      </h1>
      <div class="grid grid-cols-3 md:w-2/5 px-[30px]">
        <div>
          <img src="@/assets/about-us/OurClient/Frame 1597883494.webp" alt="" class="object-cover w-full" />
        </div>
        <div>
          <img src="@/assets/about-us/OurClient/Frame 1597883481.webp" alt="" class="object-cover w-full" />
        </div>
        <div>
          <img src="@/assets/about-us/OurClient/vokasi.webp" alt="" class="object-cover w-full" />
        </div>
      </div>
    </div>
    <div class="md:hidden justify-center flex text-center">
      <h1 class="font-raleway text-[20px] font-semibold text-gray-800 dark:text-white max-w-[300px]">
        Membina 50+ SMK<br />
        di seluruh Indonesia
      </h1>
    </div>
    <div class="px-[16px] md:px-[60px]">
      <div class="flex flex-col gap-12 overflow-hidden border border-gray-200 dark:border-gray-700 py-8 px-8 rounded-xl">
        <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
          <div class="hidden md:block">
            <h1 class="font-raleway text-[16px] md:text-[20px] font-semibold text-gray-800 dark:text-white max-w-[300px]">
              Membina 50+ SMK<br />
              di seluruh Indonesia
            </h1>
          </div>
          <div class="w-full overflow-hidden">
            <div class="hidden md:block">
              <Marquee :fade="true" direction="left" :reverse="true" :pauseOnHover="false" :speed="40">
                <div class="flex gap-4 pl-4">
                  <!-- Looping data ourClientData untuk menampilkan logo secara horizontal -->
                  <div v-for="(client, index) in ourClientData" :key="'marquee-desktop-' + index"
                    class="flex items-center justify-center w-36">
                    <img :src="client.foto_client_url" alt="client.name" class="max-w-[150px] h-[80px] object-contain" />
                  </div>
                </div>
              </Marquee>
            </div>
            <div class="block md:hidden">
              <Marquee :fade="true" direction="left" :reverse="true" :pauseOnHover="false" :speed="40">
                <div class="flex gap-4">
                  <div v-for="(client, index) in ourClientData" :key="'marquee-mobile-' + index"
                    class="flex items-center justify-center w-36 h-22">
                    <img :src="client.foto_client_url" alt="Client Logo" class="max-w-[80px] object-contain" />
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Marquee } from "@selemondev/vue3-marquee";
import "@selemondev/vue3-marquee/dist/style.css";
import { fetchOurClient } from "@/service";

const ourClientData = ref([]);
const ourMediaData = ref([]);
const mediaMarquees = ref([]);

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));
};
const getData = async () => {
  try {
    const clients = await fetchOurClient(2);
    ourClientData.value = clients || [];
    const media = await fetchOurClient(0);
    ourMediaData.value = media || [];
    mediaMarquees.value = chunkArray(ourMediaData.value, 7);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getData();
});
</script>
