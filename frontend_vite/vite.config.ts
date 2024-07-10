import { defineConfig } from "vite";
import { UserConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    host: true,
    hmr: {
      path: "/hmr",
      port: 7000,
    },
  },
};

export default defineConfig(config);
