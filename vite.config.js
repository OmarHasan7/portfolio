// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // publicDir: 'static', // serves files from 'static' directory

  assetsInclude: ['**/*.svg', '**/*.webp'],
  
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        ar: '/ar/index.html',
      }
    }
  },
})  