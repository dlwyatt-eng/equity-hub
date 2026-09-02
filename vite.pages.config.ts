import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: "pages",
  base: "/equity-hub/",
  publicDir: "../public",
  server: {
    host: "0",
    port: 4173,
    strictPort: true,
    allowedHosts: ["terminal.local"],
  },
  plugins: [react()],
  build: {
    outDir: "../pages-dist",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(__dirname, "pages/index.html") },
  },
});
