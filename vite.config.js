import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Định nghĩa biến global cho các thư viện cũ như sockjs-client kế thừa
    global: 'window', 
  },
})
