import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['primevue']
  },
  css: [
    '@/assets/scss/reset.scss',
    '@/assets/scss/common.scss',
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_mixins.scss";@import "@/assets/scss/_colors.scss";',
        },
      },
    },
  },
})
