import { resolve } from "path";
import { constants } from "../@constants/index";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;500&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      ...constants,
    },
  },
  devServerHandlers: [],
  modules: ["@pinia/nuxt"],
  css: [
    "quasar/dist/quasar.prod.css",
    "assets/css/reset.scss",
    "assets/css/utility.scss",
    "assets/css/base.scss",
    "assets/css/quasar.scss",
    "assets/css/index.scss",
  ],
  alias: {
    "@images": resolve(__dirname, "./assets/images"),
    "@icons": resolve(__dirname, "./assets/icons"),
    "@stores": resolve(__dirname, "./stores/index"),
    "@constants": resolve(__dirname, "../@constants/index"),
    "@tools": resolve(__dirname, "../@tools/index"),
    "@types": resolve(__dirname, "../@types/index"),
  },
});
