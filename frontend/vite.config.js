import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,            // No sourcemaps in production
    cssCodeSplit: true,
    assetsInlineLimit: 4096,     // Inline assets <4KB as base64
    chunkSizeWarningLimit: 1500,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  clearScreen: false,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.js',
    css: true,
  },
});


