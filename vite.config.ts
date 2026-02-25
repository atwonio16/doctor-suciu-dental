import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      'entity-introducing-signal-incurred.trycloudflare.com',
      '.trycloudflare.com',
    ],
  },
  build: {
    // Ensure proper handling of dynamic imports for admin routes
    rollupOptions: {
      output: {
        manualChunks: {
          'admin': ['./src/admin/index.tsx'],
        },
      },
    },
    // Increase chunk size warning limit for admin panel
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging
    sourcemap: mode === 'development',
  },
}))
