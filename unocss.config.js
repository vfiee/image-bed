// unocss.config.js
import { defineConfig, presetUno, presetAttributify, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
    colors: {
      primary: '#1890ff',
      secondary: '#52c41a',
      danger: '#ff4d4f',
      warning: '#faad14'
    }
  }
})