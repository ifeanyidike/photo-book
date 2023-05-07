// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
//    modules: ['@nuxt/image-edge'],
   runtimeConfig:{
    public: {
        baseURL: process.env.BASE_URL || 'http://localhost:5001'
    }
   },
   generate: {
    routes: ['/']
   }
})
