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
    sourcemap: false,            // No sourcemaps in production (fixes "Missing source maps" audit)
    cssCodeSplit: true,
    assetsInlineLimit: 4096,     // Inline assets <4KB as base64
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Use precise trailing-slash matching to avoid false prefix matches
          // e.g. 'react' must not match 'react-router', 'react-hot-toast', etc.
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('/node_modules/framer-motion/')) {
            return 'vendor-framer';
          }
          if (id.includes('/node_modules/@tanstack/')) {
            return 'vendor-tanstack';
          }
          if (id.includes('/node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
          if (id.includes('/node_modules/axios/')) {
            return 'vendor-axios';
          }
          if (id.includes('/node_modules/react-hot-toast/') || id.includes('/node_modules/date-fns/')) {
            return 'vendor-utils';
          }
          if (id.includes('/node_modules/react-router') || id.includes('/node_modules/@remix-run/')) {
            return 'vendor-router';
          }
          if (id.includes('/node_modules/three/') || id.includes('/node_modules/@react-three/')) {
            return 'vendor-three';
          }
          if (id.includes('/node_modules/recharts/') || id.includes('/node_modules/d3-') || id.includes('/node_modules/victory')) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        }
      }
    }
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


