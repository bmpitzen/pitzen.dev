// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-06-10",
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "",
  },
  app: {
    head: {
      meta: [
        // Block AI crawlers globally
        { name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      ]
    }
  }
});
