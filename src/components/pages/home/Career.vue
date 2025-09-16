<script setup>
import Button from '@/components/button/Button.vue';
import { ref, onMounted } from 'vue';
import { fetchCareer } from '@/service';
const positions = ref([]);
const loading = ref(true);
const error = ref(null);

const getCareerData = async () => {
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
    error.value = err.message || 'Gagal memuat data karir';
  } finally {
    loading.value = false;
  }
};

onMounted(getCareerData);
</script>

<template>
  <div class="flex flex-col gap-9 px-[56px] md:px-[112px]">
    <span class="text-sm font-semibold px-[10px]">CAREER OPPORTUNITIES</span>
    
    <div class="flex flex-col lg:flex-row lg:justify-between mb-[18px]">
      <div class="mb-6 lg:w-1/2">
        <h1 class="text-[30px] md:text-[40px] font-raleway tracking-[-0.64px] leading-9 font-bold text-gray-800 dark:text-white mb-4">
          Would you like to join our team
        </h1>
        <div class="hidden md:block">
          <p class="text-xs text-justify text-gray-600 dark:text-gray-400">
            Join Hexagon Inc. and grow with a team that values innovation and excellence...
          </p>
          <div class="mt-4">
            <Button @click="$router.push({ name: 'career' })">
              <span class="flex items-center gap-2 h-8">
                <span class="text-xs">See All Job Offer</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </span>
            </Button>

          </div>
        </div>
      </div>
      <div class="hidden md:flex flex-col lg:max-w-[450px] w-full">
        <template v-if="loading">
          <div v-for="n in 2" :key="n" class="bg-[#F5F6FA] rounded-[16px] mb-4 p-[45px] pt-[35px] animate-pulse">
            <div class="w-1/4 h-4 mb-3 bg-gray-300 rounded"></div>
            <div class="w-3/4 h-6 mb-3 bg-gray-300 rounded"></div>
            <div class="h-12 bg-gray-300 rounded"></div>
          </div>
        </template>
        
        <template v-else-if="!error">
          <div v-for="(position, index) in positions.slice(0, 2)" :key="index"
            class="flex flex-col items-start bg-[#F5F6FA] rounded-[16px] mb-4 p-[45px] pt-[35px] relative transition-all duration-300 hover:bg-blue-500 dark:bg-gray-800 hover:text-white hover:shadow-lg hover:scale-105">
            <p class="mb-2 text-xs text-gray-600 dark:text-gray-400">{{ position.tipe }}</p>
            <h1 class="text-xl font-raleway tracking-[-0.64px] leading-9 font-bold mb-2 text-gray-800 dark:text-white">
              {{ position.lowong_krj }}
            </h1>
            <p class="text-xs text-justify text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ position.ket_lowong.ringkasan }}
            </p>
            <div class="absolute bottom-0 right-0 flex items-center justify-center">
              <img src="@/assets/Group 11.svg" alt="Icon" class="h-13" />
            </div>
          </div>
        </template>
        
        <div class="flex flex-col items-center bg-[#F5F6FA] rounded-[16px] p-[45px] pt-[35px] relative transition-all duration-300 hover:bg-blue-500 dark:bg-gray-950 hover:text-white hover:shadow-lg hover:scale-105">
          <h1 class="text-xl font-raleway tracking-[-0.64px] leading-9 font-bold text-gray-800 mb-2 text-center dark:text-white">
            Can't find the position <br> you are looking for?
          </h1>
          <Button class="mt-3 rounded-lg">
            <span class="text-xs">Apply Now</span>
          </Button>
        </div>
      </div>

      <div class="md:hidden block w-full">
        <template v-if="loading">
          <div class="flex gap-4 py-4">
            <div v-for="n in 2" :key="n" class="flex-shrink-0 w-[280px] bg-[#F5F6FA] rounded-[16px] p-6 animate-pulse">
              <div class="w-1/4 h-4 mb-3 bg-gray-300 rounded"></div>
              <div class="w-3/4 h-6 mb-3 bg-gray-300 rounded"></div>
              <div class="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </template>
        <template v-else-if="!error">
          <div class="">
            <div class="space-y-4">
              <div v-for="(position, index) in positions" :key="index"
                class="flex-shrink-0 flex flex-col items-start bg-[#F5F6FA] rounded-[16px] p-6 relative transition-all duration-300 hover:bg-blue-500 dark:bg-gray-800 hover:text-white hover:shadow-lg hover:scale-105">
                <p class="mb-2 text-xs text-gray-600 dark:text-gray-400">{{ position.tipe }}tes</p>
                <h1 class="text-xl font-raleway tracking-[-0.64px] leading-9 font-bold text-gray-800 dark:text-white mb-2">
                  {{ position.lowong_krj }}
                </h1>
                <p class="text-xs text-justify text-gray-600 dark:text-gray-400 line-clamp-3">
                 {{ position.ket_lowong.ringkasan }}
                </p>
                <div class="absolute bottom-0 right-0 flex items-center justify-center">
                  <img src="@/assets/Group 11.svg" alt="Icon" class="h-10" />
                </div>
              </div>
            </div>
          </div>
        </template>

        
        <div v-if="error" class="text-red-500 text-center p-4">
          {{ error }}
        </div>
        <div class="flex flex-col items-center bg-[#F5F6FA] rounded-[16px] p-6 mt-4 relative transition-all duration-300 hover:bg-blue-500 dark:bg-gray-950 hover:text-white hover:shadow-lg hover:scale-105">
          <h1 class="text-xl font-raleway tracking-[-0.64px] leading-9 font-bold text-gray-800 mb-2 text-center dark:text-white">
            Can't find the position you are looking for?
          </h1>
          <Button class="mt-3 rounded-lg">
            <span class="text-xs">Apply Now</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hover\:bg-blue-500:hover { background-color: #3b82f6; }
.hover\:text-white:hover { color: white; }
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:text-white:hover p, .hover\:text-white:hover h1 { color: white; }
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }

.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
</style>
