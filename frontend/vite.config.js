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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2') || id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animation';
            }
            return 'vendor-others';
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