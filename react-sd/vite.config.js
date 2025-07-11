import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // 🌍 Allows other devices to access
    port: 5174,             // 🔁 Keep default or change if needed
    allowedHosts: [         // ✅ Add your ngrok URL host here
      '67d0-2402-4000-2280-595b-6808-290a-ed5f-e69b.ngrok-free.app',
    ],
  },
})
