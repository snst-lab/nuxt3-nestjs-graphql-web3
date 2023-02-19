import { defineStore } from "pinia";

const useSearchStore = defineStore("search", {
  state: () => ({
    keyword: "",
  }),
  actions: {},
});
export const $search = () => useSearchStore();
