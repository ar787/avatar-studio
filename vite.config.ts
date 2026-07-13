import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: true,
      proxy: {
        '/api': {
          target:
            mode === 'development'
              ? env.VITE_DEV_API_URL
              : env.VITE_PROD_API_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
            if (id.includes('@tanstack')) return 'tanstack';
            if (id.includes('@reduxjs') || id.includes('react-redux'))
              return 'redux';
            if (id.includes('node_modules')) return 'vendor';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
  };
});
