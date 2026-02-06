import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 transition duration-200 ease-in-out'],
        ['flex-center', 'flex items-center justify-center'],
        ['card', 'border border-gray-200 rounded-lg shadow-sm p-4']
      ],
      rules: [
        ['rounded-btn', { 'border-radius': 'var(--btn-radius, 0.5rem)' }]
      ]
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})