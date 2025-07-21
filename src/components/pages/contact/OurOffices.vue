<script setup>
import { ref } from "vue";
const selectedImage = ref(1);
const selectImage = (imageIndex) => {
    selectedImage.value = imageIndex;
};
</script>

<template>
    <div class="flex flex-col md:flex-row items-center justify-center gap-10 mx-4 md:mx-28 py-0 md:py-[70px]">
        <div class="w-full md:w-1/2 space-y-2.5">
            <div class="flex items-center gap-2.5 mt-8">
                <div class="w-8 h-0.5 bg-light-primary"></div>
                <h4 class="text-sm">Our Offices</h4>
            </div>
            <div class="space-y-5">
                <h3 class="text-2xl md:text-4xl font-raleway text-gradient font-semibold">
                    Our Offices Across the World
                </h3>
                <p class="text-[#272D3E]/80 dark:text-white text-sm md:text-base">
                    Our offices are strategically located worldwide to serve you better. Find us<br>near you and experience our exceptional services.
                </p>
            </div>
        </div>
        <div class="flex flex-col items-center justify-between h-auto">
            <div class="flex justify-center w-full gap-4">
                <div class="relative">
                    <img 
                        :class="selectedImage === 1 ? 'w-72 h-100' : 'w-25 h-100'" 
                        src="@/assets/office2.webp"
                        alt="Image 1"
                        class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer"
                        @click="selectImage(1)" 
                    />
                    <div v-if="selectedImage === 1"
                        class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 backdrop-blur-md border border-white/50">
                        <h3 class="text-lg font-bold text-black">Workshop 1</h3>
                        <p class="text-sm text-black">
                            Jl. Abdul Halim No.128, Cimahi Tengah, Kota Cimahi 40522
                        </p>
                    </div>
                </div>
                <div class="relative">
                    <img 
                        :class="selectedImage === 2 ? 'w-72 h-100' : 'w-25 h-100'" 
                        src="@/assets/office1.webp"
                        alt="Image 2"
                        class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer"
                        @click="selectImage(2)" 
                    />
                    <div v-if="selectedImage === 2"
                        class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 backdrop-blur-md border border-white/50">
                        <h3 class="text-lg font-bold text-black">Workshop 2</h3>
                        <p class="text-sm text-black">
                            Jl. Example Address 2, Bandung, Jawa Barat 40553
                        </p>
                    </div>
                </div>
                <div class="relative">
                    <img 
                        :class="selectedImage === 3 ? 'w-72 h-100' : 'w-25 h-100'" 
                        src="@/assets/office3.webp"
                        alt="Image 3"
                        class="object-cover transition-all duration-300 rounded-lg shadow-md cursor-pointer"
                        @click="selectImage(3)" 
                    />
                    <div v-if="selectedImage === 3"
                        class="absolute inset-x-3.5 p-4 rounded-lg w-[90%] bottom-3.5 bg-white/30 backdrop-blur-md border border-white/50">
                        <h3 class="text-lg font-bold text-black">Workshop 3</h3>
                        <p class="text-sm text-black">
                            Jl. Example Address 3, Jakarta, DKI Jakarta 40562
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.active-dot {
    content: url('@/assets/Active dot.svg');
}
</style>
