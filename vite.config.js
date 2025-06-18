import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    proxy: {
      // SSE 프록시
      "/sse": {
        target: "localhost:8080",
        changeOrigin: true,
        ws: false, // SSE는 웹소켓이 아니므로 false
      },
      // WebSocket 프록시
      "/ws": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        ws: true, // WebSocket은 true
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // ← /api를 떼고 백엔드로!
      },
    },
  },
});
