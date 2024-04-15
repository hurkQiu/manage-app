import { defineStore } from 'pinia';
export const usePageStore = defineStore('counter', {
  state: () => ({ page: '' }),
  actions: {
    setPage(page: string) {
      this.page = page;
    },
  },
});
