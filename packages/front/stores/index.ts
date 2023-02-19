export * from "./useLoadingStore";
export * from "./useDialogStore";
export * from "./useSearchStore";
export * from "./useAuthStore";
export * from "./useWalletStore";

import { defineStore } from "pinia";

const useGeneralStore = defineStore("general", {
  state: () => ({ value: {} }),
  persist: {
    enabled: true,
    lifetime: "session",
    scope: "global",
  },
  getters: {},
  actions: {
    get(key?: string) {
      if (!key) {
        return this.value;
      }
      return this.value[key as keyof {}] ?? null;
    },
    set(obj: Record<string, any>) {
      Object.assign(this.value, obj);
    },
    clear(key?: string) {
      if (!key) {
        this.value = {};
        return;
      }
      delete (this.value as Record<string, any>)[key];
    },
  },
});
export const $store = () => useGeneralStore();
