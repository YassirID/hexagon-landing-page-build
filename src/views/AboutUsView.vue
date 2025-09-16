<script setup>
import Hero from '@/components/pages/aboutUs/Hero.vue';
import OurJourney from '@/components/pages/aboutUs/OurJourney.vue';
import Philosophy from '@/components/pages/aboutUs/Philosophy.vue';
import Our from '@/components/pages/aboutUs/Our.vue';
import OurClient from '@/components/pages/aboutUs/OurClient.vue';
import Ideas from '@/components/pages/aboutUs/Ideas.vue';
import Gallery from '@/components/pages/aboutUs/Gallery.vue';
import OurTeam from '@/components/pages/aboutUs/OurTeam.vue';
import cta from '@/components/pages/home/cta.vue';

</script>

<template>
    <div class="px-3 space-y-16 md:px-0 min-h-screen dark:bg-black">
        <Hero />
        <OurJourney/>
        <Philosophy />
        <Our />
        <Ideas />
        <OurClient />
        <Gallery />
        <OurTeam/>
        <cta />
    </div>
</template>
