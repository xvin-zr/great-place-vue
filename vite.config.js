import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({
  })],
  esbuild: { loader: { '.js': 'jsx' } },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.129.213.182:6006/hqc',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
