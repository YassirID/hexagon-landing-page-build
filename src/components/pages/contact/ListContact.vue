<script setup>
/* ------------------------------ */
/* Import Modul dan Fungsi        */
/* ------------------------------ */
import { ref, onMounted } from "vue";
import { fetchContact } from "@/service";

/* ------------------------------ */
/* Inisialisasi State Reaktif      */
/* ------------------------------ */
// Menyimpan data kontak yang diambil dari API
const contactData = ref(null);
// Menyimpan pesan error jika terjadi kesalahan saat mengambil data
const errorMessage = ref("");

/* ------------------------------ */
/* Fungsi Pengambilan Data Kontak   */
/* ------------------------------ */
const getContact = async () => {
  const data = await fetchContact();
  if (data.error) {
    // Jika terjadi error, simpan pesan error ke state errorMessage
    errorMessage.value = data.error;
  } else {
    // Jika data berhasil diambil, simpan ke state contactData
    contactData.value = data;
  }
};

/* ------------------------------ */
/* Lifecycle Hook: onMounted        */
/* ------------------------------ */
// Memanggil fungsi getContact saat komponen dimuat
onMounted(() => {
  getContact();
});
</script>

<template>
  <!-- Container Grid Utama: Mengatur layout kontak dalam 1 kolom untuk mobile dan 3 kolom untuk desktop -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-0 md:py-8 px-[26px] md:px-[112px]">
    
    <!-- ============================= -->
    <!-- Email Contact Card            -->
    <!-- ============================= -->
    <div v-if="contactData" class="relative p-8 bg-white border border-gray-100 shadow-sm dark:bg-black rounded-2xl dark:border-gray-800">
      <!-- Ikon dekoratif di pojok kanan atas -->
      <div class="absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <!-- Konten Email: Gambar, alamat email, dan deskripsi -->
      <div class="flex flex-col items-center gap-3 md:gap-6">
        <div class="flex items-center justify-center w-16 h-16 rounded-full">
          <img src="@/assets/mailcon.png" alt="">
        </div>
        <a :href="'mailto:' + contactData.email" class="text-xl font-medium text-blue-600 transition-colors duration-300 dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
          {{ contactData.email }}
        </a>
        <p class="text-base text-center text-gray-500 dark:text-gray-400">
          Send us an email for general inquiries and support
        </p>
      </div>
    </div>

    <!-- ============================= -->
    <!-- Phone Contact Card            -->
    <!-- ============================= -->
    <div v-if="contactData" class="relative p-8 bg-white border border-gray-100 shadow-sm dark:bg-black rounded-2xl dark:border-gray-800">
      <!-- Ikon dekoratif di pojok kanan atas -->
      <div class="absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <!-- Konten Telepon: Gambar, nomor telepon, dan deskripsi -->
      <div class="flex flex-col items-center gap-3 md:gap-6">
        <div class="flex items-center justify-center w-16 h-16 rounded-full">
          <img src="@/assets/phonecon.png" alt="">
        </div>
        <a :href="'tel:' + contactData.notlp" class="text-xl font-medium text-blue-600 transition-colors duration-300 dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
          {{ contactData.notlp }}
        </a>
        <p class="text-base text-center text-gray-500 dark:text-gray-400">
          Call us for immediate assistance
        </p>
      </div>
    </div>

    <!-- ============================= -->
    <!-- Social Media Contact Card     -->
    <!-- ============================= -->
    <div v-if="contactData" class="relative p-8 bg-white border border-gray-100 shadow-sm dark:bg-black rounded-2xl dark:border-gray-800">
      <!-- Ikon dekoratif di pojok kanan atas -->
      <div class="absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <!-- Konten Sosial Media: Gambar, tautan media sosial, dan deskripsi -->
      <div class="flex flex-col items-center gap-3 md:gap-6">
        <div class="flex items-center justify-center w-16 h-16 rounded-full">
          <img src="@/assets/hexacon.png" alt="">
        </div>
        <div class="flex gap-4 md:flex-row md:gap-6">
          <a :href="contactData.instagram_url" target="_blank" class="font-medium text-blue-600 transition-colors duration-300 dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
            Instagram
          </a>
          <span class="text-blue-300 md:inline">•</span>
          <a :href="contactData.linkedin_url" target="_blank" class="font-medium text-blue-600 transition-colors duration-300 dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
            LinkedIn
          </a>
          <!-- Tombol Facebook dihilangkan (komentar) -->
          <span class="text-blue-300 md:inline">•</span>
          <a :href="contactData.youtube_url" target="_blank" class="font-medium text-blue-600 transition-colors duration-300 dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
            YouTube
          </a>
        </div>
        <p class="text-base text-center text-gray-500 dark:text-gray-400">
          Follow us on social media for updates
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tambahkan style khusus komponen jika diperlukan */
</style>
