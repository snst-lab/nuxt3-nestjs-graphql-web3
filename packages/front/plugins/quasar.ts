import { Quasar, Loading, QSpinnerDots } from "quasar";
import * as All from "quasar";
// import langJa from "quasar/lang/ja";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    config: {
      dark: "auto",
    },
    components: All,
    plugins: {},
    // lang: langJa,
  });
});

Loading.setDefaults({
  spinner: QSpinnerDots,
  spinnerColor: "pink",
  backgroundColor: "white",
});
