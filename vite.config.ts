import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://HERSHY121.github.io/startbalance/
export default defineConfig({
  plugins: [react()],
  base: '/startbalance/',
})
