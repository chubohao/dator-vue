import { defineStore } from "pinia";

export const userVariables = defineStore({
  id: "userVariables",
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    toAuthenticated() {
      this.isAuthenticated = true;
    },
    toNotAuthenticated() {
      this.isAuthenticated = false;
    },
  },
});
