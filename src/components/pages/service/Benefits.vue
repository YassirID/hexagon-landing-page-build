<script>
export default {
  name: "SmoothAccordion",
  data() {
    return {
      activeIndex: null,
      accordionItems: [
        {
          title: "The Right Solution for Your Business",
          content:
            "We understand that every business has unique needs. That's why our services are flexible and tailored to align with your specific business goals.",
        },
        {
          title: "Latest Technology, Best Solutions",
          content:
            "We integrate cutting-edge technology into every service to deliver optimal, effective, and always up-to-date results.",
        },
        {
          title: "Always Ahead Approach",
          content:
            "We don’t just wait for opportunities—we proactively seek them and address challenges to ensure your business stays one step ahead.",
        },
        {
          title: "Efficient and Affordable",
          content:
            "We offer high-quality solutions at reasonable and transparent prices, providing the best value without compromising on quality.",
        },
      ],
    };
  },
  methods: {
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    isActive(index) {
      return this.activeIndex === index;
    },

    onBeforeEnter(el) {
      el.style.maxHeight = "0";
      el.style.opacity = "0";
    },
    onEnter(el) {
      el.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
    },
    onAfterEnter(el) {
      el.style.maxHeight = "none";
    },
    onBeforeLeave(el) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
    },
    onLeave(el) {
      el.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
      el.style.maxHeight = "0";
      el.style.opacity = "0";
    },
    onAfterLeave(el) {
      el.style.maxHeight = null;
    },
  },
};
</script>

<template>
  <!-- Container Utama Benefits Section dengan latar belakang untuk mode light dan dark -->
  <div
    class="bg-white dark:bg-gradient-to-b dark:from-black dark:to-black pt-3 md:pt-[78px]"
  >
    <!-- Wrapper konten utama dengan margin atas dan bawah yang disesuaikan -->
    <div class="flex flex-col gap-9 mb-3 md:mb-[78px] mt-[36px]">
      <div class="flex flex-col lg:flex-row gap-[50px] mb-[18px] mt-10">
        <!-- Kolom Kiri: Teks Benefits -->
        <div class="px-[36px] md:px-[112px] mb-6 lg:w-1/2">
          <div>
            <!-- Label "Benefits" -->
            <span
              class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline"
            >
              Benefits
            </span>
          </div>
          <!-- Judul utama Benefits dengan teks gradient -->
          <h1
            class="text-[30px] md:text-[38px] font-raleway tracking-[-0.64px] leading-9 font-bold text-gray-800 dark:text-white mb-4 mt-[36px]"
          >
            Why Choose <br class="md:hidden" />
            <span class="text-gradient">Hexagon inc</span> ?
          </h1>
          <!-- Deskripsi Benefits -->
          <p class="text-xs text-justify text-gray-600 dark:text-white">
            Discover the advantages of partnering with us—tailored solutions,
            dedicated support, and proven results that set us apart.
          </p>
          <!-- Accordion Section untuk Benefits Detail -->
          <div class="mt-4">
            <div class="divide-y divide-neutral/20">
              <div
                v-for="(item, index) in accordionItems"
                :key="index"
                class="accordion-item"
              >
                <!-- Header -->
                <button
                  @click="toggleAccordion(index)"
                  class="group w-full flex items-center gap-x-2 text-start py-4 px-5 font-semibold text-base dark:text-blue-50 text-black hover:text-blue-600 dark:hover:bg-slate-900 hover:bg-blue-50 dark:hover:text-blue-600 hover:rounded-md transition-all duration-200"
                  :aria-expanded="isActive(index)"
                  :class="{
                    'bg-blue-50 dark:bg-slate-900 rounded-t-md text-blue-600 dark:text-blue-600':
                      isActive(index),
                  }"
                >
                  <span
                    class="text-lg transition-colors duration-200"
                    :class="{
                      'text-blue-600': isActive(index),
                      'group-hover:text-blue-600 dark:group-hover:text-blue-600': true,
                    }"
                  >
                    {{ isActive(index) ? "▼" : "▶" }}
                  </span>
                  {{ item.title }}
                </button>

                <!-- Animated content -->
                <transition
                  name="accordion"
                  @enter="onEnter"
                  @before-enter="onBeforeEnter"
                  @after-enter="onAfterEnter"
                  @leave="onLeave"
                  @before-leave="onBeforeLeave"
                  @after-leave="onAfterLeave"
                >
                  <div
                    v-show="isActive(index)"
                    class="overflow-hidden bg-blue-50 rounded-b dark:bg-slate-900 px-5 pb-4"
                  >
                    <p class="text-gray-500 dark:text-gray-400">
                      {{ item.content }}
                    </p>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <!-- Kolom Kanan: Menampilkan gambar ilustrasi layanan -->
        <div class="px-[36px] md:px-[112px] flex flex-col lg:w-1/2">
          <img src="@/assets/services/service.png" alt="services" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-dot {
  content: url("@/assets/Active dot.svg");
}

.dark .card-bg {
  background-image: url(@/assets/services/bg.png);
  background-position: center;
  background-size: cover;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
</style>
