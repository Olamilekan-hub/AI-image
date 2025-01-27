import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");',
      },
    },
  },
  resolve: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
    },
});
