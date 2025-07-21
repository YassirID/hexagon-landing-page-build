<template>
    <div class="bg-white dark:bg-gradient-to-b dark:from-black dark:to-black">
        <div class="flex flex-col gap-9 mb-2 md:mb-[78px] mt-[36px] justify-center items-center">
            <div class="flex flex-col lg:flex-row gap-[50px] mb-[18px]">
                <div class="px-[36px] md:px-[112px] flex flex-col lg:w-1/2">
                    <img src="@/assets/services/timeline.png" alt="services">
                </div>
                <div class="px-[36px] md:px-[112px] flex flex-col justify-center mb-6 lg:w-1/2">
                    <div>
                        <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline">
                            Why Choose Us
                        </span>
                    </div>
                    <h1 class="text-[30px] md:text-[40px] font-raleway tracking-[-0.64px] leading-9 font-bold text-gradient mb-4 mt-[36px]">
                        Experienced <span class="text-gradient-switch">, Dedicated Team</span>
                    </h1>
                    <p class="text-xs text-justify text-gray-600 dark:text-white">
                        Our professionals are not only skilled but passionate about helping you achieve your goals.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active-dot {
    content: url('@/assets/Active dot.svg');
}

.dark .card-bg {
    background-image: url(@/assets/services/bg.png);
    background-position: center;
    background-size: cover;
}
</style>
