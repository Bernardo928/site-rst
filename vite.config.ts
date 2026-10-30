import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: isSsrBuild ? {} : { output: { manualChunks: { three: ['three'], gsap: ['gsap'] } } },
  },
}))
