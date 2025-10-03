<template>
  <div
    class="relative w-full py-8 space-y-4 md:space-y-12 bg-white dark:bg-black"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-0.5 bg-light-primary dark:bg-blue-400"></div>
        <h4 class="text-gray-700 text-md dark:text-gray-300">Our Client</h4>
      </div>
      <p
        class="mt-2 text-xl text-center text-[#272D3E] dark:text-gray-100 md:text-4xl"
      >
        More than 100 companies trust and <br class="hidden md:block" />
        choose Hexagon Inc.
      </p>
    </div>

    <div class="flex flex-col gap-12">
      <div class="hidden md:block">
        <Marquee
          :fade="true"
          direction="left"
          :reverse="true"
          :pauseOnHover="false"
          :speed="40"
          class="overflow-hidden"
        >
          <div class="flex gap-4">
            <div
              v-for="(client, index) in ourClientData"
              :key="'marquee-desktop-' + index"
              class="flex items-center justify-center w-72 h-32 p-4 bg-white border rounded-[20px] border-[#2F84FF] hover:bg-light-primary/20 dark:hover:bg-gray-800 dark:border-blue-400 dark:bg-blue-900/20 transition-all duration-300"
            >
              <img
                :src="client.foto_client"
                :alt="client.name"
                class="max-w-[140px] object-contain"
              />
            </div>
          </div>
        </Marquee>
      </div>

      <div class="block md:hidden">
        <Marquee
          :fade="true"
          direction="left"
          :reverse="true"
          :pauseOnHover="false"
          :speed="40"
          class="overflow-hidden"
        >
          <div class="flex gap-4">
            <div
              v-for="(client, index) in ourClientData"
              :key="'marquee-mobile-' + index"
              class="flex items-center justify-center w-48 h-24 p-2 bg-white border rounded-[10px] border-[#2F84FF] hover:bg-light-primary/20 dark:hover:bg-gray-800 dark:border-blue-400 dark:bg-blue-900/20 transition-all duration-300"
            >
              <img
                :src="client.foto_client"
                :alt="client.name"
                class="max-w-[80px] object-contain"
              />
            </div>
          </div>
        </Marquee>
      </div>

      <div>
        <p
          class="text-lg text-center text-[#272D3E] dark:text-gray-100 md:text-4xl"
        >
          Integrated with over 100 mainstream <br class="hidden md:block" />
          media outlets
        </p>
      </div>

      <div class="hidden md:block">
        <Marquee
          v-for="(marquee, mIdx) in mediaMarquees"
          :key="'media-marquee-' + mIdx"
          :fade="true"
          direction="left"
          :reverse="false"
          :pauseOnHover="false"
          :speed="40"
          class="overflow-hidden"
        >
          <div class="flex gap-4">
            <div
              v-for="(media, index) in marquee"
              :key="'media-' + index"
              class="flex items-center justify-center w-72 h-32 p-4 bg-white border rounded-[20px] border-[#2F84FF] hover:bg-light-primary/20 dark:hover:bg-gray-800 dark:border-blue-400 dark:bg-blue-900/20 transition-all duration-300"
            >
              <img
                :src="media.foto_client"
                :alt="media.name"
                class="max-w-[160px] object-contain"
              />
            </div>
          </div>
        </Marquee>
      </div>

      <div class="block md:hidden">
        <div class="flex flex-col gap-4">
          <Marquee
            v-for="(marquee, mIdx) in mediaMarquees"
            :key="'media-marquee-1-' + mIdx"
            :fade="true"
            direction="left"
            :reverse="false"
            :pauseOnHover="false"
            :speed="40"
            class="overflow-hidden"
          >
            <div class="flex gap-4">
              <div
                v-for="(media, index) in marquee.slice(
                  0,
                  Math.ceil(marquee.length / 2)
                )"
                :key="'media-1-' + index"
                class="flex items-center justify-center w-48 h-24 p-2 bg-white border rounded-[10px] border-[#2F84FF] hover:bg-light-primary/20 dark:hover:bg-gray-800 dark:border-blue-400 dark:bg-blue-900/20 transition-all duration-300"
              >
                <img
                  :src="media.foto_client"
                  :alt="media.name"
                  class="max-w-[80px] object-contain"
                />
              </div>
            </div>
          </Marquee>
          <Marquee
            v-for="(marquee, mIdx) in mediaMarquees"
            :key="'media-marquee-2-' + mIdx"
            :fade="true"
            direction="left"
            :reverse="true"
            :pauseOnHover="false"
            :speed="40"
            class="overflow-hidden"
          >
            <div class="flex gap-4">
              <div
                v-for="(media, index) in marquee.slice(
                  Math.ceil(marquee.length / 2)
                )"
                :key="'media-2-' + index"
                class="flex items-center justify-center w-48 h-24 p-2 bg-white border rounded-[10px] border-[#2F84FF] hover:bg-light-primary/20 dark:hover:bg-gray-800 dark:border-blue-400 dark:bg-blue-900/20 transition-all duration-300"
              >
                <img
                  :src="media.foto_client"
                  :alt="media.name"
                  class="max-w-[80px] object-contain"
                />
              </div>
            </div>
          </Marquee>
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
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

const getData = async () => {
  try {
    const clients = await fetchOurClient(1);
    ourClientData.value = clients || [];
    // Check if the response is not an error object before assigning
    if (clients && !clients.error) {
      ourClientData.value = clients;
    } else {
      console.error("Failed to fetch clients:", clients?.error);
    }

    const media = await fetchOurClient(0);
    ourMediaData.value = media || [];

    mediaMarquees.value = chunkArray(ourMediaData.value, 20);
    // Check if the response is not an error object before assigning
    if (media && !media.error) {
      ourMediaData.value = media;
      mediaMarquees.value = chunkArray(ourMediaData.value, 20);
    } else {
      console.error("Failed to fetch media:", media?.error);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
  }
};

onMounted(() => {
  getData();
});
</script>
