import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pagesBasePath = process.env.VITE_BASE_PATH?.replace(/\/$/, '')

// https://vite.dev/config/
export default defineConfig({
  base: pagesBasePath ? `${pagesBasePath}/` : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
