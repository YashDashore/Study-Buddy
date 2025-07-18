import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    port : 5173,
    proxy : {
      "/api" : "https://study-buddy-backend-7nhi.onrender.com"
    },
  },
  plugins: [react()],
})
