import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // プロジェクトのルートを指定
  build: {
    outDir: "dist", // ビルドの出力フォルダ
    rollupOptions: {
      input: "public/index.html", // ここを明示的に指定
    },
  },
  server: {
    port: 3000,
  },
});
