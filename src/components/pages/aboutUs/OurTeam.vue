<template>
  <div
    id="our-team"
    class="space-y-12 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-black"
  >
    <div class="flex flex-col items-center justify-center pt-16">
      <div class="flex items-center gap-2.5 mb-4">
        <div class="w-8 h-0.5 bg-blue-500"></div>
        <h4
          class="font-medium tracking-wider text-gray-600 text-md dark:text-gray-400"
        >
          OUR TEAM
        </h4>
        <div class="w-8 h-0.5 bg-blue-500"></div>
      </div>
      <h1
        class="mt-2 text-4xl font-bold leading-tight text-center text-gray-800 md:text-5xl dark:text-white font-raleway"
      >
        Meet the Minds Behind <br />
        <span
          class="text-transparent bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text"
          >the Innovation</span
        >
      </h1>
    </div>
    <div class="md:flex md:justify-center">
      <div
        class="grid gap-8 px-4 mx-auto place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-center lg:px-16 max-w-7xl"
      >
        <div
          v-for="(member, index) in displayedMembers"
          :key="index"
          class="relative overflow-hidden transition-all duration-500 group rounded-2xl hover:scale-105 hover:shadow-md hover:-translate-y-2 w-full max-w-[300px]"
        >
          <div class="aspect-w-1 aspect-h-1">
            <img
              :src="member.foto_orang"
              :alt="`Image of ${member.nama_orang}`"
              class="object-cover w-full h-full transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="md:hidden block">
      <div v-if="teamMembers.length > 4" class="flex justify-center mt-8">
        <button
          @click="showAll = !showAll"
          class="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
        >
          {{ showAll ? "See Less" : "See More" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { fetchTeams } from "@/service";

const teamMembers = ref([]);
const showAll = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const getTeamMembers = async () => {
  try {
    const data = await fetchTeams();
    if (data && !data.error) {
      // Define the desired order for specific roles
      const roleOrder = {
        CEO: 1,
        CFO: 2,
        CTO: 3,
      };

      // Sort the team members based on the defined order
      const sortedData = data.sort((a, b) => {
        const orderA = roleOrder[a.jabatan] || 99; // Assign a high number for other roles
        const orderB = roleOrder[b.jabatan] || 99;
        return orderA - orderB;
      });

      teamMembers.value = sortedData;
    }
  } catch (error) {
    console.error("Failed to fetch and sort team members:", error);
  }
};

onMounted(() => {
  getTeamMembers();
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const displayedMembers = computed(() => {
  if (isMobile.value && !showAll.value && teamMembers.value.length > 4) {
    return teamMembers.value.slice(0, 4);
  }
  return teamMembers.value;
});
</script>
