import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vercelのデプロイに適した設定
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // 出力ディレクトリ
  },
  server: {
    port: 3000,
  },
});
