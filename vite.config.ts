import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve, extname, relative } from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { glob } from 'glob'
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-leetcode',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      input: Object.fromEntries(
               glob.sync('src/**/*.{ts,tsx}').map(file => [
                 // The name of the entry point
                 // lib/nested/foo.ts becomes nested/foo
                 relative(
                   'src',
                   file.slice(0, file.length - extname(file).length)
                 ),
                 // The absolute path to the entry file
                 // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                 fileURLToPath(new URL(file, import.meta.url))
               ])
             ),
      output: {
        entryFileNames: '[name].js',
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


  plugins: [
    react(), 
    dts({ exclude: ['src/tests'] }), 
    libInjectCss()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss('./tailwind.config.js')],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup",
    pool: 'forks'
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
