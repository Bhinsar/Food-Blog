import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   server: {
    port: 3000, 
   },
  plugins: [react()],
  ss: {
    postcss: './postcss.config.js', // Ensure PostCSS is referenced here
  },
})
