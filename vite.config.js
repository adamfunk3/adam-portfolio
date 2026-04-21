import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: './' works for both GitHub Pages project sites (/repo-name/) and custom domains.
  // If your repo name differs from the URL path, adjust this to '/your-repo-name/'
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
