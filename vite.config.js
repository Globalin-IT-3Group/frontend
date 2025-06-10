import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // SSE 프록시
      "/sse": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: false, // SSE는 웹소켓이 아니므로 false
      },
      // WebSocket 프록시
      "/ws": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        ws: true, // WebSocket은 true
      },
    },
  },
});
