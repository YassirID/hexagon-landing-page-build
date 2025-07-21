<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import Button from "@/components/button/Button.vue";
import ButtonOutline from "@/components/button/ButtonOutline.vue";
import axiosInstance from "../../../axios";
import { fetchJobDetail } from "@/service";

const { proxy } = getCurrentInstance(); 
const route = useRoute();
const jobId = route.params.id;

const jobDetail = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await fetchJobDetail(jobId);
    if (response && typeof response.ket_lowong === "string") {
      try {
        response.ket_lowong = JSON.parse(response.ket_lowong);
      } catch (err) {
        console.error("Error parsing ket_lowong:", err);
        response.ket_lowong = {};
      }
    }
    jobDetail.value = response;
  } catch (e) {
    error.value = e.message || "Gagal memuat data pekerjaan";
  } finally {
    loading.value = false;
  }
};

const lowonganList = ref([]);

const fetchLowonganKerja = async () => {
  try {
    const response = await axiosInstance.get("/api/position");
    lowonganList.value = response.data;
  } catch (err) {
    console.error("Gagal memuat data lowongan:", err);
  }
};

onMounted(() => {
  fetchData();
  fetchLowonganKerja();
});
const formData = ref({
  fullName: "",
  email: "",
  phone: "",
  position: "",
  summary: "",
  resume: null,
});
const selectedFile = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0]; 
  formData.value.resume = file;
  selectedFile.value = file;
};

const handleSubmit = async () => {
  try {
    const form = new FormData();
    form.append("job_id", jobId);
    form.append("full_name", formData.value.fullName);
    form.append("email", formData.value.email);
    form.append("phone", formData.value.phone);
    form.append("position", formData.value.position);
    form.append("summary", formData.value.summary);
    form.append("resume", formData.value.resume);

    const response = await axiosInstance.post("/api/applications", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await proxy.$swal.fire({
      icon: "success",
      title: "Success!",
      text: "Application submitted successfully!",
      confirmButtonText: "OK",
    });
    formData.value = {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      summary: "",
      resume: null,
    };
    selectedFile.value = null;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response?.data?.errors) {
      errorMessage = Object.values(error.response.data.errors).flat().join("<br>");
    }
    await proxy.$swal.fire({
      icon: "error",
      title: "Oops...",
      html: errorMessage,
      confirmButtonText: "OK",
    });
  }
};
</script>

<template>
  <div class="px-[56px] md:px-[112px] dark:bg-black mb-[150px] pt-20 md:pt-16">
    <div class="flex flex-col gap-9 items-center text-center mb-[60px]">
      <h1 v-if="jobDetail" class="font-raleway text-[30px] md:text-[50px] font-bold text-gradient">
        {{ jobDetail.lowong_krj }}
      </h1>
      <div class="breadcrumbs">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumbs-separator rtl:-rotate-[40deg]">/</li>
          <li>
            <router-link to="/career">Career</router-link>
          </li>
          <li class="breadcrumbs-separator rtl:-rotate-[40deg]">/</li>
          <li aria-current="page">
            <span class="bg-primary/20 !text-primary rounded-sm px-1.5 py-0.5" v-if="jobDetail">
              {{ jobDetail.lowong_krj }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    <div v-if="jobDetail && !loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-primary mb-4">Ringkasan</h2>
          <p class="text-gray-700 dark:text-gray-100">
            {{ jobDetail.ket_lowong.ringkasan }}
          </p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-primary mb-4">Klasifikasi</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li
              v-for="(item, index) in jobDetail.ket_lowong.klasifikasi"
              :key="index"
              class="text-gray-700 dark:text-gray-100"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-primary mb-4">Deskripsi Pekerjaan</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li
              v-for="(item, index) in jobDetail.ket_lowong.deskripsi"
              :key="index"
              class="text-gray-700 dark:text-gray-100"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-primary mb-4">Skillsets</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li
              v-for="(item, index) in jobDetail.ket_lowong.skillsets"
              :key="index"
              class="text-gray-700 dark:text-gray-100"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <Button class="w-full md:w-auto">Apply Now</Button>
      </div>
      <div class="flex flex-col gap-10">
        <div class="space-y-4 border border-gray-300 p-[20px] rounded-2xl">
          <div class="flex gap-2">
            <span class="font-bold">Pengalaman:</span>
            <span class="text-gray-700 dark:text-gray-100">{{ jobDetail.ket_lowong.pengalaman }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-bold">Jam Kerja:</span>
            <span class="text-gray-700 dark:text-gray-100">{{ jobDetail.ket_lowong.jam_kerja }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-bold">Hari Kerja:</span>
            <span class="text-gray-700 dark:text-gray-100">{{ jobDetail.ket_lowong.hari_kerja }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-bold">Lokasi:</span>
            <span class="text-gray-700 dark:text-gray-100">{{ jobDetail.ket_lowong.lokasi }}</span>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 border border-gray-300 p-6 rounded-2xl">
          <h2 class="text-2xl font-bold text-primary mb-6">Lamar Sekarang!</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label class="block">Nama Lengkap*</label>
              <input
                v-model="formData.fullName"
                type="text"
                class="w-full p-2 border rounded"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="block">Email*</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full p-2 border rounded"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="block">Nomor Telepon*</label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full p-2 border rounded"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="block">Job Position</label>
              <select 
                v-model="formData.position" 
                class="w-full p-2 border-2 rounded bg-white dark:bg-transparent text-gray-900 dark:text-gray-100"
              >
                <option value="" disabled class="text-gray-500 dark:text-gray-400">Select position</option>
                <option 
                  v-for="(item, index) in lowonganList" 
                  :key="index" 
                  :value="item"
                  class="text-gray-900 dark:text-gray-100"
                >
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="block">Perkenalan Singkat</label>
              <textarea
                v-model="formData.summary"
                class="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
            <div class="space-y-2">
              <label class="block">Unggah CV</label>
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Klik untuk mengunggah</span> atau seret dan lepaskan
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Format file yang diterima: PDF, DOC, atau DOCX
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    @change="handleFileUpload"
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>
              <div v-if="selectedFile" class="mt-2 p-2 border rounded bg-gray-100 dark:bg-gray-700">
                <p class="text-gray-700 dark:text-gray-200">File terpilih: <strong>{{ selectedFile.name }}</strong></p>
              </div>
              <p class="text-sm text-gray-500 mt-2">*Unggah CV Anda dalam format PDF, DOC, atau DOCX.</p>
            </div>
            <Button type="submit" class="w-full">Kirim</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  color: #2f84ff;
}
</style>
