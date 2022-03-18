import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  clearScreen: false,
  server: {
    hmr: true
  },
  plugins: [svelte()]
});
