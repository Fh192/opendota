import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: '/opendota/',
  plugins: [vue(), svgLoader({ defaultImport: 'component' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
