<template>
  <div
    class="flex flex-col md:flex-row items-start justify-between gap-10 px-4 md:px-28 py-16 bg-gradient"
  >
    <div class="w-full space-y-6 md:w-1/2">
      <h2 class="text-3xl font-bold text-blue-900 md:text-4xl dark:text-white">
        Have a project idea?<br />Drop me a line.
      </h2>
      <p class="text-[14px] md:text-[18px] text-gray-600 dark:text-gray-400">
        Got a project? Drop me a line if you want to work together on something exciting.
        Even the smallest seed can grow into something beautiful.
      </p>
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Icon icon="fluent-color:mail-48" class="w-8 h-8 text-white" />
        </div>
        <div>
          <p class="text-gray-600 dark:text-gray-400">Email us</p>
          <a
            href="mailto:contact@hexagon.com"
            class="font-medium text-blue-600 dark:text-blue-400"
          >
            contact@hexagon.com
          </a>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2.5 mt-8">
          <div class="w-8 h-0.5 bg-light-primary"></div>
          <h4 class="text-sm">Connect With Us</h4>
        </div>
        <div class="flex gap-4">
          <a
            href="https://www.youtube.com/@Hexagon-Inc"
            target="blank"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Icon icon="logos:youtube-icon" />
          </a>
          <a
            href="https://www.linkedin.com/company/hexagon-inc"
            target="blank"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Icon icon="logos:linkedin-icon" />
          </a>
          <a
            href="#"
            target="blank"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Icon icon="logos:facebook" />
          </a>
          <a
            href="https://www.instagram.com/hexagoninc_"
            target="blank"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Icon icon="skill-icons:instagram" />
          </a>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 p-8 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
      <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        Request A Quote – let's work together.
      </h3>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input
            type="text"
            v-model="formData.fullName"
            placeholder="Full name"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            v-model="formData.email"
            placeholder="Email address"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <input
          type="text"
          v-model="formData.subject"
          placeholder="Subject"
          class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          v-model="formData.message"
          placeholder="Your message"
          rows="4"
          class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <Button
          type="submit"
          class="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white bg-primary rounded-full hover:bg-blue-700 transition-all duration-500"
        >
          Send Message
          <font-awesome-icon icon="arrow-right" class="text-sm" />
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import Button from "../../button/Button.vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import axiosInstance from "../../../axios";
const formData = ref({
  fullName: "",
  email: "",
  subject: "",
  message: "",
});

const handleSubmit = async () => {
  try {
    const res = await axiosInstance.post('/api/communication/Store', formData.value); 
    const payload = res.data;
    alert(payload.message || 'Pesan berhasil dikirim!');
    formData.value = { fullName: '', email: '', subject: '', message: '' };
  } catch (err) {
    console.error('Full error object:', err);
    console.error('Error response data:', err.response?.data);
    console.error('Error status:', err.response?.status);
    alert(err.response?.data?.message || 'Terjadi kesalahan saat mengirim pesan.');
  }
};
</script>

