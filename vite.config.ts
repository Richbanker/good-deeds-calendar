import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Чтобы все пути работали при размещении в Telegram Mini App (не на корне домена)
  build: {
    outDir: 'dist', // по умолчанию, но можно поменять
    sourcemap: false, // если нужно отключить карты исходников в продакшене
    minify: 'esbuild',
  },
  server: {
    port: 5173,
    open: true,
  },
});
