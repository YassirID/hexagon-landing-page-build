<script setup>
import { onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePortofolioStore } from '@/service';

const route = useRoute();
const router = useRouter();
const portofolioStore = usePortofolioStore();
const { projectDetails, projects } = storeToRefs(portofolioStore);

const currentId = computed(() => parseInt(route.params.id));

const loadProject = async (portofolio_id) => {
  await portofolioStore.fetchProjectById(portofolio_id);
};

// On page mount
onMounted(async () => {
  if (!projects.value.length) {
    await portofolioStore.fetchProjects();
  }
  await loadProject(currentId.value);
});

watch(() => route.params.id, async (newId) => {
  await loadProject(parseInt(newId));
});

const currentIndex = computed(() => {
  return projects.value.findIndex(p => p.id === currentId.value);
});
console.log(currentIndex.value);

const prevProject = computed(() => {
  return currentIndex.value > 0 ? projects.value[currentIndex.value - 1] : null;
});
const nextProject = computed(() => {
  return currentIndex.value < projects.value.length - 1
    ? projects.value[currentIndex.value + 1]
    : null;
});
</script>

<template>
  <section class="relative py-16 px-4 dark:bg-black min-h-screen">
    <div v-if="projectDetails" class="relative z-10 max-w-6xl mx-auto">
      <div class="text-sm text-blue-600 mb-4">
        <router-link to="/portfolio" class="hover:underline">Portofolio</router-link> &gt;
        <span class="text-gray-500">{{ projectDetails.project }}</span>
      </div>

      <div class="w-full rounded-xl overflow-hidden mb-8">
        <img
          :src="projectDetails.image"
          alt="Project Image"
          class="w-full h-auto object-cover rounded-xl"
        />
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="space-y-4">
          <div>
            <h2 class="text-xl font-semibold text-light-primary dark:text-white">Project Name:</h2>
            <p class="text-gray-600 dark:text-gray-300">{{ projectDetails.project }}</p>
          </div>

          <div v-if="projectDetails.link">
            <h2 class="text-xl font-semibold text-light-primary dark:text-white">Link:</h2>
            <a :href="projectDetails.link" target="_blank" class="text-blue-600 hover:underline">
              Visit website
            </a>
          </div>

          <div>
            <h2 class="text-xl font-semibold text-light-primary dark:text-white">Tag:</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, i) in projectDetails.tags"
                :key="i"
                class="px-3 py-1 my-4 bg-blue-100 text-blue-600 rounded-md text-sm dark:bg-blue-600 dark:text-blue-100"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold text-light-primary dark:text-white mb-4">Project Summary</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {{ projectDetails.content }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="relative z-10 text-center text-gray-500 dark:text-white">
      Loading project details...
    </div>
  </section>
</template>
