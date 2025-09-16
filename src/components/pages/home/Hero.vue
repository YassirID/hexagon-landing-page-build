<script setup>
import { Application } from '@splinetool/runtime';
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref(null);
const heroBg = ref(null);
let app = null;
let resizeObserver = null;
let bgObserver = null;

const desktopScene = 'https://prod.spline.design/t5Pqly-sHJn3K-5I/scene.splinecode';
const mobileScene = 'https://prod.spline.design/8f82t5oV-Uwh6EST/scene.splinecode';

const getSceneUrl = () => window.innerWidth >= 768 ? desktopScene : mobileScene;

const loadSpline = async () => {
  if (!canvas.value) return;

  app = new Application(canvas.value);
  await app.load(getSceneUrl());
};

const handleResize = () => {
  // Ganti scene jika ukuran layar berubah cukup signifikan
  const newScene = getSceneUrl();
  if (app && newScene !== app.sceneUrl) {
    app.dispose(); // Hancurkan scene lama
    app = new Application(canvas.value); // Buat ulang
    app.load(newScene); // Load scene baru
  }
};

onMounted(() => {
  loadSpline(); 
  if (heroBg.value) {
    bgObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('lazy-bg-loaded');
            bgObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '200px' }
    );
    bgObserver.observe(heroBg.value);
  }
});


onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (resizeObserver) resizeObserver.disconnect();
  if (bgObserver) bgObserver.disconnect();
});
</script>

<template>
  <div class="relative h-screen max-h-[900px] mb-16 pt-24 md:pt-16">
    <div ref="heroBg" class="w-full h-full hero-section-bg absolute left-1/2 -translate-x-1/2 bg-no-repeat z-0 -mt-[48px]">
      <canvas
        ref="canvas"
        class=" border dark:border-black border-white"
      ></canvas>
      <span
        class="bg-gradient-to-b absolute bottom-0 via-50% md:via-80% via-white dark:via-black/95 from-transparent w-full h-1/2 to-white dark:to-black z-[2]"
      ></span>
    </div>
    <div class="absolute flex flex-col items-center -translate-x-1/2 left-1/2 -bottom-16 gap-9">
      <div class="scrolldown" style="--color: #136FF8">
        <div class="chevrons">
          <div class="chevrondown"></div>
          <div class="chevrondown"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.hero-section-bg {
    /* background-image is moved to .lazy-bg-loaded to enable lazy loading */
    background-position-x: center;
    background-position-y: center;
}
.hero-section-bg.lazy-bg-loaded {
    background-image: url(@/assets/Ornament.png);
}
@media (max-width: 768px) {
    .hero-section-bg.lazy-bg-loaded {
        background-image: url(@/assets/home-bg-mobile.png);
    }
}

.scrolldown {
    --color: white;
    --sizeX: 30px;
    --sizeY: 50px;
    position: relative;
    width: var(--sizeX);
    height: var(--sizeY);
    margin-left: calc(var(--sizeX) / 2);
    border: calc(var(--sizeX) / 10) solid var(--color);
    border-radius: 50px;
    box-sizing: border-box;
    margin-bottom: 16px;
    cursor: pointer;
}

.scrolldown::before {
    content: "";
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: var(--color);
    border-radius: 100%;
    animation: scrolldown-anim 2s infinite;
    box-sizing: border-box;
    box-shadow: 0px -5px 3px 1px #2a547066;
}

@keyframes scrolldown-anim {
    0% {
        opacity: 0;
        height: 6px;
    }
    40% {
        opacity: 1;
        height: 10px;
    }
    80% {
        transform: translate(0, 20px);
        height: 10px;
        opacity: 0;
    }
    100% {
        height: 3px;
        opacity: 0;
    }
}

.chevrons {
    padding: 6px 0 0 0;
    margin-left: -3px;
    margin-top: 48px;
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chevrondown {
    margin-top: -6px;
    position: relative;
    border: solid var(--color);
    border-width: 0 3px 3px 0;
    display: inline-block;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
}

.chevrondown:nth-child(odd) {
    animation: pulse54012 500ms ease infinite alternate;
}

.chevrondown:nth-child(even) {
    animation: pulse54012 500ms ease infinite alternate 250ms;
}

@keyframes pulse54012 {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.5;
    }
}
</style>
