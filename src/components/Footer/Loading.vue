<template>
  <div class="relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center">
    <!-- Animated Background - Digital Grid with Particles -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute w-full h-full animate-moveGrid bg-digital-pattern opacity-20"></div>
      <div class="absolute w-full h-full">
        <div v-for="i in 50" :key="i" 
             class="absolute w-1 h-1 bg-blue-600 rounded-full opacity-50 animate-float animate-pulse-particle"
             :style="randomParticleStyle()">
        </div>
      </div>
    </div>

    <!-- Portal Tunnel -->
    <div class="z-10 relative w-44 h-44 rounded-full border-4 border-blue-600 border-dashed animate-rotateOuter shadow-[0_0_60px_15px_rgba(6,182,212,0.3)]">
      <div class="absolute inset-3 rounded-full border-4 border-blue-700 animate-pulse-inner"></div>
      <div class="absolute inset-8 bg-blue-600 rounded-full blur-xl opacity-40"></div>
    </div>

    <!-- HEXATECH Branding -->
     <div class="absolute flex bottom-20 w-[15ch]  text-3xl font-extrabold tracking-[0.3em] z-10 ">
    <!-- Typewriter Text -->
    <p
      class="text-nowrap overflow-hidden text-blue-600 typewriter " 
    >
  <span class="content">HEXAGON INC.</span>
    </p>
  </div>
  </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showImage = ref(false)
const showText = ref(false)

onMounted(() => {
  setTimeout(() => {
    showImage.value = true
  }, 1300)

  setTimeout(() => {
    showText.value = true
  }, 2500)
})

const randomParticleStyle = () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${2 + Math.random() * 3}s`,
  animationDelay: `${Math.random() * 5}s`,
})
</script>

<style scoped>
*{
  font-family: 'Orbitron', sans-serif;
}
@keyframes rotateOuter {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes pulse-inner {
  0%, 100% {
    box-shadow: 0 0 20px rgba(6, 88, 212, 0.5),
                0 0 40px rgba(6, 40, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(6, 78, 212, 0.8),
                0 0 60px rgba(6, 81, 212, 0.6);
  }
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.1s ease forwards;
}
.typewriter {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  border-right: 2px solid white;
  animation: typewriter 1.5s steps(15) forwards, cursorBlink 1s step-end infinite;
  will-change: width;
  contain: layout style;
}


@keyframes typewriter {
  from { width: 0; }
  to { width: 14ch; } 
}

@keyframes cursorBlink {
  0%, 40%, 80% { border-right-color: white; }
  20%, 60%, 100% { border-right-color: transparent; }
}

@keyframes moveGrid {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}
@keyframes pulseParticle {
  0%, 100% { transform: scale(0.9); opacity: 0.2; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

.animate-rotateOuter {
  animation: rotateOuter 5s linear infinite;
}
.animate-pulse-inner {
  animation: pulse-inner 2.5s ease-in-out infinite;
}
.animate-fadeIn {
  animation: fadeIn 2s ease-out forwards;
}
.animate-moveGrid {
  animation: moveGrid 30s linear infinite;
}
.animate-pulse-particle {
  animation: pulseParticle infinite alternate;
}


@keyframes float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(0.5);
    opacity: 0;
  }
}
.animate-float {
  animation: float linear infinite;
}

.bg-digital-pattern {
  background-image: 
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}


</style>
