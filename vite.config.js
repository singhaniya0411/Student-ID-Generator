import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  allowedHosts: [
    '2351a5a4-febe-4305-8bc5-4b896e85632d-00-wtatve7a7481.sisko.replit.dev',
  ],
  plugins: [react(), tailwindcss()],
})
