import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
