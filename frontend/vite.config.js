import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    cors: {
      origin: 'https://cdn.sanity.io', // Allow requests from your frontend
      credentials: true, // Allow cookies and credentials to be sent
    },
    headers: {
      // Add these headers to prevent COOP and CORS issues with popups
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  }
})
