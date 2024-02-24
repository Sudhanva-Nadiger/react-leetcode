import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-leetcode',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: "tailwindcss",
        }
      }
    },
    minify: true,
    sourcemap: true,
    emptyOutDir: true,
  },


  plugins: [react(), dts(
    {
      exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
    }
  ), libInjectCss()],
  css: {
    postcss: {
      plugins: [tailwindcss('./tailwind.config.js')],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup",
  },
  server: {
    open: true,
    cors:  true,
    proxy: {
      '/leetcode': {
        target: 'https://leetcode.com/graphql',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/leetcode/, '')
      },
    }
  },
})
