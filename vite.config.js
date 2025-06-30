import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const backendURL = env.VITE_BASE_URI;
  const wsURL = env.VITE_WS_URI;

  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    server: {
      host: "0.0.0.0",
      proxy: {
        "/sse": {
          target: backendURL,
          changeOrigin: true,
          ws: false,
        },
        "/ws": {
          target: wsURL,
          changeOrigin: true,
          ws: true,
        },
        "/api": {
          target: backendURL,
          changeOrigin: true,
          ws: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
