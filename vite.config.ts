import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [vue(), vueJsx()],

  optimizeDeps: {
    exclude: ['vue-demi']
	},
  
  server: {
    proxy: {
      "/api": "http://testapi.xuexiluxian.cn"
    }
  }
});
