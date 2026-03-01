import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    optimizeDeps: {
        include: ['react/jsx-runtime']
      },
    plugins: [react()],
    base: process.env.NODE_ENV === "production" ? "/Pos_app/" : "/", // Explicit base path
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: './index.html' // Explicit HTML entry
        }
      }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true
            },
        },
    },
});