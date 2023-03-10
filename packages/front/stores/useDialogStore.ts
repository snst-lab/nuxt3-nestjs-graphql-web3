import { defineStore } from "pinia";

const useDialogStore = defineStore("dialog", {
  state: () => ({
    isShow: {} as Record<string, boolean>,
    args: {} as Json,
  }),
  actions: {
    show(name: string, args?: Json, hasUrl?: boolean) {
      document.body.style.top = "0px";
      if (hasUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("dialog", name);
        if (args) {
          url.searchParams.set("args", JSON.stringify(args));
        }
        window.history.pushState(null, "", url.href);
      }
      this.isShow[name] = true;
      this.args[name] = args ?? {};
    },
    hide(name: string) {
      const url = new URL(window.location.href);
      url.searchParams.delete("dialog");
      url.searchParams.delete("args");
      window.history.pushState(null, "", url.href);
      this.isShow[name] = false;
      this.args[name] = {};
    },
  },
});
export const $dialog = () => useDialogStore();
