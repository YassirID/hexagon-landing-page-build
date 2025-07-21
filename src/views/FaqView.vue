<script setup>
import { ref } from 'vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';

const activeQuestion = ref(null);

const faqs = ref([
  {
    question: 'Apa itu PT Hexagon Inc?',
    answer: 'PT Hexagon Inc adalah perusahaan teknologi inovatif yang berfokus pada pengembangan solusi digital transformasi untuk industri 4.0. Kami menyediakan layanan konsultasi IT, pengembangan sistem terintegrasi, dan solusi IoT canggih untuk perusahaan global.'
  },
  {
    question: 'Bagaimana cara menghubungi PT Hexagon Inc?',
    answer: `Anda dapat menghubungi kami melalui:
      <div class="mt-3 space-y-2">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V19.114c0 1.032.642 1.646 1.674 1.646h14.331c1.032 0 1.674-.614 1.674-1.646V4.821c0-1.032-.642-1.646-1.674-1.646zm-4.861 11.237h-2.489v2.831h-1.241v-2.831H8.13V11.02h2.284V8.162h1.241v2.857h2.489v2.392z"/>
          </svg>
          <a href="https://wa.me/6281222181823" class="text-primary hover:underline">(+62) 812 2218 1823</a>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <a href="mailto:contact@hexagon.co.id" class="text-primary hover:underline">contact@hexagon.co.id</a>
        </div>
      </div>`
  },
  {
    question: 'Bagaimana proses setelah mengirim lamaran?',
    answer: 'Tim HRD kami akan mereview aplikasi Anda dalam 1-3 hari kerja. Jika memenuhi kriteria, Anda akan dihubungi via email/telepon untuk tahap seleksi berikutnya. Proses rekrutmen biasanya meliputi tes kemampuan teknis, wawancara HRD, dan wawancara dengan manajer terkait.'
  },
  {
    question: 'Apa keunggulan Hexagon Inc dibanding kompetitor?',
    answer: 'Kami memiliki beberapa keunggulan utama:<br>1. Teknologi berbasis AI/ML terdepan<br>2. Tim engineer berpengalaman internasional<br>3. Dukungan 24/7 untuk klien<br>4. Sistem pengembangan agile modern<br>5. Infrastruktur cloud terintegrasi'
  },
  {
    question: 'Berapa lama waktu respons untuk pertanyaan melalui website?',
    answer: 'Kami berusaha merespons semua pertanyaan dalam waktu 1x24 jam kerja melalui email atau saluran komunikasi yang Anda pilih. Untuk urgensi tinggi, kami rekomendasikan menggunakan layanan WhatsApp kami yang tersedia 24 jam.'
  }
]);
</script>


<template>
  <div class="px-[56px] md:px-[112px] dark:bg-black min-h-screen py-20">
    <div class="flex flex-col gap-9 items-center text-center mb-16">
      <h1 class="font-raleway text-[30px] md:text-[50px] font-bold text-gradient relative inline-block">
        Frequently Asked Questions
        <span class="absolute bottom-0 left-0 w-full h-1 bg-primary/20 rounded-full animate-underline"></span>
      </h1>
      <div class="breadcrumbs">
        <ul class="flex items-center gap-2">
          <li><router-link to="/" class="hover:text-primary transition-colors">Home</router-link></li>
          <li class="text-primary"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></li>
          <li class="text-primary font-medium">FAQ</li>
        </ul>
      </div>
    </div>

    <div class="max-w-4xl mx-auto space-y-4">
      <div 
        v-for="(faq, index) in faqs" 
        :key="index"
        class="border rounded-xl transition-all duration-300 group"
        :class="activeQuestion === index 
          ? 'border-primary bg-primary/10 shadow-lg' 
          : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md'"
      >
        <button
          @click="activeQuestion = activeQuestion === index ? null : index"
          class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary/5 rounded-xl transition-colors"
        >
          <h3 class="text-lg md:text-xl font-semibold dark:text-gray-100 pr-4">{{ faq.question }}</h3>
          <div class="flex-shrink-0 relative w-8 h-8">
            <div class="absolute inset-0 transform transition-transform duration-300" 
                 :class="activeQuestion === index ? 'rotate-180' : ''">
              <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  class="w-5 h-5 text-primary transform transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </button>
        
        <transition
          enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          leave-active-class="transition-all duration-300 ease-in-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-show="activeQuestion === index" class="px-6 pb-6 pt-2 border-t dark:border-gray-700">
            <div class="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3" v-html="faq.answer"></div>
          </div>
        </transition>
      </div>
    </div>

    <div class="max-w-4xl mx-auto mt-20 text-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-12">
      <div class="absolute inset-0 opacity-10 dark:opacity-5 pattern-dots pattern-primary-500 pattern-size-4"></div>
      <div class="relative">
        <h2 class="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-100">Masih ada pertanyaan?</h2>
        <p class="mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">Tim profesional kami siap membantu Anda 24 jam melalui berbagai saluran komunikasi</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <ButtonOutline href="https://wa.me/6281222181823" class="transform hover:-translate-y-1 transition-all">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V19.114c0 1.032.642 1.646 1.674 1.646h14.331c1.032 0 1.674-.614 1.674-1.646V4.821c0-1.032-.642-1.646-1.674-1.646zm-4.861 11.237h-2.489v2.831h-1.241v-2.831H8.13V11.02h2.284V8.162h1.241v2.857h2.489v2.392z"/>
            </svg>
            Chat Langsung
          </ButtonOutline>
          
          <ButtonOutline href="mailto:contact@hexagon.co.id" class="transform hover:-translate-y-1 transition-all">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Kirim Email
          </ButtonOutline>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-gradient {
  background: linear-gradient(45deg, #2f84ff, #54d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 150% auto;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.breadcrumbs {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.animate-underline {
  animation: underline-grow 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes underline-grow {
  0% { transform: scaleX(0) }
  100% { transform: scaleX(1) }
}

.pattern-dots {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
}
</style>