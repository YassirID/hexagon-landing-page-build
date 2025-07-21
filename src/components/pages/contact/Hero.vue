<script setup>
import Button from '@/components/button/Button.vue';
import ButtonOutline from '@/components/button/ButtonOutline.vue';
</script>

<template>
    <div class="px-[56px] md:px-[112px] dark:bg-black hero-section-bg py-28 md:py-16">
        <div class="flex flex-col gap-9 items-center text-center">
            <span class="bg-gray-100 dark:bg-[#121212] px-4 py-2 rounded-lg text-xs font-medium inline">Contact</span>
            <h1 class="font-raleway text-[40px] md:text-[60px] font-bold">
                Get in Touch <span class="text-gradient">With Us!</span>
            </h1>
            <p class="font-raleway text-[16px] font-semibold text-gray-600 dark:text-white pb-16 md:pb-0">
                Reach out for inquiries, support, or collaborations.
            </p>
            <div class="hidden md:block">
                <div class="flex flex-col sm:flex-row gap-[14px]">
                    <ButtonOutline>
                        <span class="flex items-center gap-2">
                        <span class="h-2 w-2 bg-light-secondary block rounded-full"></span>
                        <span>Contact Us</span>
                        </span>
                    </ButtonOutline>
                    <Button @click="$router.push({ name: 'contact' })">
                    <span class="flex items-center gap-2">
                        <span class="h-2 w-2 bg-white block rounded-full"></span>
                        <span class="dark:text-white">Request a Consultation</span>
                    </span>
                    </Button>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero-section-bg {
    background-image: url(@/assets/HeroContact.png);
    background-position: center;
    background-size: cover;
}

.dark .hero-section-bg {
    background-image: url(@/assets/DarkHeroContact.png);
}

@media (max-width: 768px) {
    .hero-section-bg {
        background-image: url(@/assets/bg-contact-mbl.png);
    }

    .dark .hero-section-bg {
        background-image: url(@/assets/darkbg-contact-mbl.png);
    }
}
</style>
