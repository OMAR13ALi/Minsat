import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/serialnumber': 'http://localhost:5000',
      '/activationcode': 'http://localhost:5000',
    }
  }
})