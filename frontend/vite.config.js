import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:4000",
        secure: false,
      },
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  envDir: './',  // This tells Vite to look for environment variables in the root directory
  envFile: '.ennv'  // Specify the custom file name here
})
