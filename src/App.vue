<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer/Footer.vue";
import Loading from "@/components/Footer/Loading.vue";
import { ref, onMounted } from "vue";


const isLoading = ref(true);

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  isLoading.value = false;
});
</script>

<template>
  <div>
    <Loading :isVisible="isLoading" v-if="isLoading" />

    <Transition name="page-transition" mode="out-in">
      <div v-if="!isLoading" class="dark:bg-black">
        <Navbar />
        <div class="pt-16"></div>

        <RouterView v-slot="{ Component }">
          <Transition name="route-transition" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>

        <Footer />

        <router-link 
          to="/faq"
          class="fixed bottom-8 right-8 bg-primary text-white border-2 border-white rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="2.5" stroke="currentColor" class="w-8 h-8 animate-pulse">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 
                     1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442
                     -.745.361-1.45.999-1.45 1.827v.75M12 17.25h.008v.008H12v-.008z" />
          </svg>
        </router-link>
      </div>
    </Transition>
  </div>
</template>

<style>
.page-transition-enter-active {
  animation: page-in 1.6s cubic-bezier(0.25, 0.1, 0.25, 1); 
}

.page-transition-leave-active {
  animation: page-out 1.2s cubic-bezier(0.25, 0.1, 0.25, 1); 
}

@keyframes page-in {
  0% {
    opacity: 0;
    transform: translateY(15px); 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes page-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px); 
  }
}


.route-transition-enter-active {
  transition: all 0.8s ease-in-out; 
  transition-delay: 0.4s; 
}

.route-transition-leave-active {
  transition: all 0.8s ease-in-out; 
}

.route-transition-enter-from {
  opacity: 0;
  transform: translateY(5px); 
}

.route-transition-leave-to {
  opacity: 0;
  transform: translateY(-5px); 
}


html {
  @apply transition-colors duration-500;
}
</style>