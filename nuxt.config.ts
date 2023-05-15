// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available server-side
        githubSecret: process.env.GITHUB_TOKEN,
        // Keys within public are also exposed client-side
        public: {
          apiBase: '/api'
        }
      },
      css: ['~/assets/css/main.css'],
      postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
})
