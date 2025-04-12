import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, 
    proxy: {
      '/api': {
        // target: 'http://localhost:8080', //if run mannually
        target: 'http://wetalk-be:8080', // for docker
        changeOrigin: true,
        secure: false
      }
    }
  },
})
