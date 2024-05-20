import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { backendLink } from "./lib/data";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: `${backendLink}`,
      },
    },
  },
});
