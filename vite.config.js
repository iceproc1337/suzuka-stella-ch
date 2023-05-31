import { fileURLToPath, URL } from 'node:url'
const { resolve } = require('path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        en: resolve(__dirname, '/en/index.html'),
        ja: resolve(__dirname, '/ja/index.html'),
      }
    }
  }
})
