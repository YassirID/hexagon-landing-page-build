<script setup>
import { ref, onMounted, watch } from 'vue';
import { fetchCareer } from '@/service';
import Button from '@/components/button/Button.vue';
const positions = ref([]);
const loading = ref(false);

const getCareerData = async () => {
  loading.value = true;

  try {
    const response = await fetchCareer();
    if (response.error) throw response.error;
    positions.value = response.map(position => {
      if (typeof position.ket_lowong === 'string') {
        try {
          position.ket_lowong = JSON.parse(position.ket_lowong);
        } catch (e) {
          position.ket_lowong = {
            ringkasan: '',
            klasifikasi: [],
            deskripsi: [],
            skillsets: [],
            pengalaman: '',
            jam_kerja: '',
            hari_kerja: '',
            lokasi: '',
          };
        }
      }
      return position;
    });
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching career data:', err);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getCareerData();
});
</script>

<template>
  <div class="px-[56px] md:px-[112px]">
    <div class="flex flex-col gap-9 items-center mb-[60px]">
      <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline mt-[50px]">
        Open Position
      </span>
      <h1 class="font-raleway text-[25px] md:text-[45px] font-bold text-gray-800 dark:text-gradient text-center">
        Explore Opportunities, <span class="text-gradient">Shape your Career</span>
      </h1>
      <p class="font-raleway text-[13px] md:text-[16px] font-semibold text-gray-600 dark:text-white">
        See available positions and find a role where your skills and passions align with our mission.<br />
        Start your journey with us today.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[18px]">
      <router-link
        v-for="(position, index) in positions"
        :key="index"
        :to="{ name: 'position-detail', params: { id: position.id } }"
        class="block"
      >
        <div class="bg-[#F5F6FA] dark:bg-black rounded-[16px] hover:shadow-lg transition-all duration-300 dark:shadow-gray-600">
          <div
            class="flex flex-col flex-wrap items-start bg-[#F5F6FA] rounded-[16px] p-[45px] pt-[35px] relative transition-all duration-300 hover:bg-blue-500 dark:bg-gray-800 hover:text-white hover:shadow-lg hover:scale-105"
          >
            <p class="mb-2 text-xs text-gray-600 dark:text-gray-400">
              {{ position.tipe }}
            </p>
            <h1 class="text-xl font-raleway tracking-[-0.64px] leading-9 font-bold text-gray-800 dark:text-white mb-2">
              {{ position.lowong_krj }}
            </h1>
            <p class="text-xs text-justify text-gray-600 break-all dark:text-gray-400">
              {{ position.ket_lowong.ringkasan }}
            </p>
            <div class="absolute bottom-0 flex items-center justify-center -right-1">
              <img src="@/assets/Group 11.svg" alt="Icon" class="w-13 h-13" />
            </div>
            <div
              class="absolute bottom-0 right-0 flex gap-2 transition-opacity duration-300 opacity-0 hover:opacity-100"
            >
              <img src="@/assets/Large unit.svg" alt="Large Unit Icon" class="w-[150px] h-[150]" />
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div
      class="frame-section-bg text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center mt-[50px] shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div class="mb-6 space-y-4 text-left md:mb-0">
        <h1 class="text-3xl font-bold font-raleway">
          Work Together with Hexagon Inc.
        </h1>
        <div class="hidden md:block">
          <p class="max-w-xl text-white/90">
            Join our innovative team where professionalism meets creativity. Experience a modern work environment with friendly colleagues and flexible payment options.
          </p>
        </div>
        <div class="block md:hidden">
          <p class="max-w-xl text-white/90">
            Our company is a professional company, with friendly service, modern homes and interest-free payments
          </p>
        </div>
      </div>
      <Button class="text-[#0066FF] w-40 h-10 flex-nowrap rounded-full bg-white" @click="$router.push({ name: 'contact' })">
        <div class="flex items-center justify-center gap-2">
          <span class="text-base">Let's Chat</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.frame-section-bg {
  background-image: url(@/assets/frameworktogether.png), linear-gradient(to bottom, #2f84ff, #0c57c3);
  background-position: center;
  background-size: cover;
}
.router-link-active {
  text-decoration: none;
}
.active-dot {
  content: url("@/assets/Active dot.svg");
}
</style>
