import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: fileURLToPath(new URL('../node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('../node_modules/react-dom', import.meta.url)),
      'react/jsx-runtime': fileURLToPath(new URL('../node_modules/react/jsx-runtime.js', import.meta.url)),
      'react/jsx-dev-runtime': fileURLToPath(new URL('../node_modules/react/jsx-dev-runtime.js', import.meta.url)),
    },
  },
  plugins: [react() , tailwindcss()],
})
