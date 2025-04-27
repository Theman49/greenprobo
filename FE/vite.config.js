import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "/",
  preview: {
    port: 4173, // You can change the port if needed
    open: true,
    historyApiFallback: true, // Ensure this is true for SPA routing
  },
})
