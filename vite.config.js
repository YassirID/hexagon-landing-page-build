import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['model-viewer'].includes(tag),
        },
      },
    }),
    vueDevTools(),
    viteCompression(), 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'three': fileURLToPath(new URL('./node_modules/three', import.meta.url)) 
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
