import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  base: './', // <<< 加這個很重要！firebase hosting 靜態檔案要正確找
})
