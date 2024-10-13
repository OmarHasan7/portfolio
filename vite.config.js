// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // or '' for relative paths

  publicDir: 'static', // serves files from 'static' directory

  assetsInclude: ['**/*.svg', '**/*.png'],  
})  