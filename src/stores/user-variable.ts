import { defineStore } from "pinia";

export const userVariables = defineStore({
  id: "userVariables",
  state: () => {
    return {
    	isAuthenticated: false
	}
  }
});
