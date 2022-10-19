import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode);
  return {
    base: '/opendota/',
    plugins: [vue(), svgLoader({ defaultImport: 'component' })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
