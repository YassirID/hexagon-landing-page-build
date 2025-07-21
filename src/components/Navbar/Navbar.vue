<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();


const isLightMode = ref(false);

const toggleNavbar = ref(false);
const toggleDropdown = ref(false);

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value;
  if (isLightMode.value) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    isLightMode.value = true;
    document.documentElement.classList.remove("dark");
  } else {
    isLightMode.value = false;
    document.documentElement.classList.add("dark");
  }
});

watch(isLightMode, (newValue) => {
  localStorage.setItem("theme", newValue ? "light" : "dark");
});
const navItems = [
  {
    text: "Home",
    route: "home",
  },
  {
    text: "About Us",
    route: "about-us",
  },
  {
    text: "Services",
    route: "services",
  },
  {
    text: "Portfolio",
    route: "portfolio",
  },
  {
    text: "News",
    route: "news",
  },
  {
    text: "Career",
    route: "career",
  },
  {
    text: "Contact",
    route: "contact",
  },
];
const isPopupOpen = ref(false);

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
};
const closePopup = () => {
  isPopupOpen.value = false;
};

</script>

<template>
  <nav class="bg-white h-[96px] w-full z-[999] dark:bg-black fixed" id="navbar">
    <div class="px-8 md:px-[112px] h-full">
      <div class="flex items-center justify-between h-full w-full">
        <router-link :to="{ name: 'home' }">
          <img v-if="!isLightMode" class="flex-initial hidden lg:flex" src="@/assets/darkHexa.png" alt="Hexagon Inc." />
          <img v-else class="flex-initial hidden lg:flex" src="@/assets/hexagon.svg" alt="Hexagon Inc." />
          <img class="flex-initial md:hidden h-14" src="../../../Logo.png" alt="Hexagon Inc." />
        </router-link>
        <div class="lg:flex-none hidden lg:gap-8 lg:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.route"
            :to="{ name: item.route }"
            class="relative dark:text-white hover:after:content-[''] hover:after:block hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-2 after:transition-all after:duration-3x00 hover:after:h-2 hover:after:rounded-full hover:after:bg-light-primary hover:dark:after:bg-white hover:after:mt-4"
            active-class="font-medium mb-1 after:content-[''] after:block after:absolute after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:transition-all after:duration-300 after:rounded-full after:bg-light-primary dark:after:bg-white after:mt-4"
          >
            <span>{{ item.text }}</span>
          </RouterLink>
        </div>
        <div class="gap-2 flex">
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" class="hidden peer" :checked="!isLightMode" @change="toggleTheme" />
            <div
              class="relative w-[42px] h-[24px] rounded-full outline outline-[2px] outline-light-primary peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-light-secondary after:rounded-full after:h-4 after:w-4 after:transition-all dark:bg-[#04224D] dark:after:bg-white dark:outline-none"
            ></div>
          </label>
          <span class="hidden lg:block">{{ isLightMode ? "Light Mode" : "Dark Mode" }}</span>
        </div>
      </div>
    </div>
  </nav>
  <div class="w-full fixed bottom-0 grid lg:hidden grid-cols-5 px-4 bg-white dark:bg-black z-[999] pb-2 shadow-lg rounded-t-2xl">
    <RouterLink to="/" class="nav-item">
      <Icon icon="fluent:home-12-regular" class="w-6 h-6"></Icon>
      Home
    </RouterLink>
    <RouterLink to="/services" class="nav-item">
      <Icon icon="uil:setting" class="w-6 h-6  rotate-[30]"></Icon>
      Service
    </RouterLink>
    <RouterLink to="/about-us" class="nav-item">
      <img class="h-6" src="../../../Logo.png" alt="Hexagon Inc." />
      About
    </RouterLink>
    <button @click="togglePopup" class="nav-item">
      <div class="w-full  flex justify-center  mx-0 transition-all duration-300" :class="isPopupOpen == true ? 'bg-light-primary mx-3 rounded-full text-white' : ''">
        <Icon icon="ion:filter" class="w-6 h-6 bg-"></Icon>
      </div>
      Other
    </button>
    <RouterLink to="/contact" class="nav-item">
      <Icon icon="tabler:info-circle" class="w-6 h-6"></Icon>
      Contact
    </RouterLink>
  </div>

  <!-- Popover -->
  <Transition name="slide-up">
    <div v-if="isPopupOpen" class="fixed flex flex-col bottom-28 left-1/2 gap-2 z-[999] -translate-x-1/2 dark:bg-black bg-white text-white rounded-lg shadow-md w-[90vw] p-2">
      <RouterLink to="/portfolio" @click="closePopup" class="w-full px-4 py-2.5 text-black text-lg dark:text-white flex gap-4 hover:bg-blue-50 dark:hover:bg-gray-600 dark:bg-gray-800 rounded-xl">
        <Icon icon="ph:files" class="w-6 h-6"></Icon>
        Portofolio
      </RouterLink>
      <RouterLink to="/news" @click="closePopup" class="w-full px-4 py-2.5 text-black text-lg dark:text-white flex gap-4 hover:bg-blue-50 dark:hover:bg-gray-600 dark:bg-gray-800 rounded-xl">
        <Icon icon="ph:newspaper" class="w-6 h-6"></Icon>
        News
      </RouterLink>
      <RouterLink to="/career" @click="closePopup" class="w-full px-4 py-2.5 text-black text-lg dark:text-white flex gap-4 hover:bg-blue-50 dark:hover:bg-gray-600 dark:bg-gray-800 rounded-xl">
        <Icon icon="bytesize:portfolio" class="w-6 h-6"></Icon>
        Career
      </RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.nav-item {
  @apply dark:text-white text-black gap-1.5 flex flex-col items-center justify-center p-4 transition-all dark:hover:text-gray-300 hover:text-light-primary;
}


.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  z-index: -1;
  transform: translate(-50%, 100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}

.btn-close {
  @apply mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all;
}
</style>