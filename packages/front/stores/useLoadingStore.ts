import { defineStore } from "pinia";
import { Loading } from "quasar";

const useLoadingStore = defineStore("loading", {
  state: () => ({
    pageRenderKey: 0,
  }),
  actions: {
    show() {
      Loading.show();
    },
    hide() {
      setTimeout(() => {
        Loading.hide();
      }, 200);
    },
    reRenderPage() {
      this.pageRenderKey = Number(!this.pageRenderKey);
    },
  },
});
export const $loading = () => useLoadingStore();
