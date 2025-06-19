import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist', // Output build files to root/dist instead of src/dist
  },
  plugins: [tailwindcss()],
});
