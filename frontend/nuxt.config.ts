import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    assetsInclude: ['**/*.MP4', '**/*.mp4', '**/*.mp3', '**/*.m4a'],
    server: {
      proxy: {
        '/api': {
          target: 'http://160.191.50.189:8080', 
          changeOrigin: true, 
          rewrite: (path) => path.replace(/^\/api/, ''), 
        },
      },
    },
  },

  compatibilityDate: '2024-11-09'
})