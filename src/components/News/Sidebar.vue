<template>
  <div class="space-y-8">
    <!-- Search -->
    <div>
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Search</h3>
      <input type="text" placeholder="Search..." class="w-full px-3 py-2 mt-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200" @input="(e) => onSearch(e.target.value)" />
    </div>

    <!-- Categories -->
    <div>
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Categories</h3>
      <ul class="mt-2 space-y-2">
        <li v-for="(category, index) in categories" :key="index" class="flex justify-between text-gray-600 cursor-pointer dark:text-gray-400 hover:text-blue-600" @click="emit('selectCategory', category.name)">
          <span>{{ category.name }}</span
          ><span>{{ category.count }}</span>
        </li>
      </ul>
    </div>

    <!-- Newsletter -->
    <div class="px-10 py-12 bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Newsletter</h3>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Register now to get latest updates on promotions & coupons.</p>
      <div class="w-full py-4 mt-2 bg-white rounded-lg dark:bg-black">
        <div class="flex gap-2">
          <span class="input-group-text">
            <span class="icon-[tabler--mail] text-base-content/80 size-4"></span>
          </span>
          <div class="relative grow">
            <input type="text" placeholder="Email Address" class="text-sm dark:bg-black dark:text-gray-200" id="leadingIconFilled" />
          </div>
        </div>
      </div>
      <button class="w-full py-2 mt-3 text-white bg-blue-500 rounded-lg">Subscribe</button>
    </div>

    <!-- Social Links -->
    <div>
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Social</h3>
      <div v-if="contactData" class="flex mt-2 space-x-4">
        <a target="_blank" :href="'mailto:' + contactData.email">
          <Icon icon="mdi:email" class="w-6 h-6 text-gray-800 cursor-pointer dark:text-gray-200 hover:text-blue-600" />
        </a>
        <a target="_blank" :href="contactData.facebook_url">
          <Icon icon="mdi:facebook" class="w-6 h-6 text-gray-800 cursor-pointer dark:text-gray-200 hover:text-blue-600" />
        </a>
        <a target="_blank" :href="contactData.instagram_url">
          <Icon icon="mdi:instagram" class="w-6 h-6 text-gray-800 cursor-pointer dark:text-gray-200 hover:text-blue-600" />
        </a>
        <a target="_blank" :href="contactData.linkedin_url">
          <Icon icon="mdi:linkedin" class="w-6 h-6 text-gray-800 cursor-pointer dark:text-gray-200 hover:text-blue-600" />
        </a>
      </div>
    </div>
    <div>
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Popular Tags</h3>
      <div class="flex flex-wrap gap-1 mt-2">
        <div v-for="(tag, index) in tags" :key="index" class="px-3 py-1 text-sm font-medium text-black dark:text-gray-200 bg-gray-100 dark:bg-[#191919] rounded font-raleway">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { defineProps, defineEmits, ref, onMounted } from "vue";
import { fetchContact } from "@/service";

const contactData = ref(null);
const errorMessage = ref("");

const getContact = async () => {
  const data = await fetchContact();
  if (data.error) {
    errorMessage.value = data.error;
  } else {
    contactData.value = data;
  }
};

onMounted(() => {
  getContact();
});

// Define props
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  onSearch: {
    type: Function,
    required: true,
  },
});

const tags = ["Wordpress", "PHP", "HTML/CSS", "Figma", "Technology", "Marketing", "Consultation", "SEO", "Envato", "Psd"];

// Define emits
const emit = defineEmits(["selectCategory"]);
</script>
