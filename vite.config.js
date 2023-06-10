import { fileURLToPath, URL } from 'node:url'
const { resolve } = require('path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        globals: {
          Plyr: 'Plyr',
          Vue: "Vue",
          VueRouter: "VueRouter",
          VueDemi: "VueDemi",
          VueI18n: "VueI18n",
          Pinia: "Pinia"
        }
      }
    }
  }
})
