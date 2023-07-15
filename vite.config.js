import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// tell vite to use externals
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteExternalsPlugin({
      videojs: 'video-js',
      vue: "Vue",
      VueRouter: "VueRouter",
      VueDemi: "VueDemi",
      VueI18n: "VueI18n",
      Pinia: "Pinia",
      VueVirtualScroller: "VueVirtualScroller"
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
