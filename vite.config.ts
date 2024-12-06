import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // React 플러그인
import path from 'path';
import viteCompression from 'vite-plugin-compression'; // 압축 플러그인

export default defineConfig({
  plugins: [
    react(),
    viteCompression(), // 압축 플러그인 추가
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @를 src 경로로 설정
    },
  },
  server: {
    port: 3000, // 서버 포트를 3000으로 설정
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // React 관련 패키지를 분리
        },
      },
    },
  },
});
