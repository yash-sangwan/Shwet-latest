import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
    react(),
  ],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser global polyfills
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
      ]
    }
  },
  server:{
    cors: {
      origin: 'https://cdn.sanity.io', // Allow requests from your frontend
      credentials: true, // Allow cookies and credentials to be sent
    },
    headers: {
      // Add these headers to prevent COOP and CORS issues with popups
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  define: {
    'process.env': {}, // This prevents `process` from being undefined
  }
})
