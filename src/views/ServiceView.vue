<script setup>
import WhoWeAre from '@/components/pages/service/WhoWeAre.vue';
import CTA from '@/components/pages/home/cta.vue';
import Review from '@/components/pages/home/Review.vue';
import Hero from '@/components/pages/service/Hero.vue';
import Benefits from '../components/pages/service/Benefits.vue';
import Why from '../components/pages/service/Why.vue';
import AboutUs from '../components/pages/home/AboutUs.vue';

</script>

<template>
    <div class="dark:bg-black overflow-x-hidden">
        <Hero />
        <AboutUs />
        <Benefits />
        <Why />
        <WhoWeAre />
        <Review />
        <CTA />
    </div>
</template>
