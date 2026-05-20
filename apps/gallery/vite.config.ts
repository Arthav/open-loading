import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@arthav/open-loading": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url)
      )
    }
  }
});
