import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // root: '/',
  build: {
    outDir: 'dist',
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined
  //     },
  //   },
  // },
  // server: {
  //   historyApiFallback: true,
  },
});
