import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
      },
    }
  },
})
