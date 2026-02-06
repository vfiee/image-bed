// src/stores/imageStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const uploadedImages = ref([])
  const selectedFiles = ref([])
  const botToken = ref('')
  const chatId = ref('')

  function addImage(image) {
    uploadedImages.value.unshift(image)
  }

  function clearSelected() {
    selectedFiles.value = []
  }

  function saveConfig(token, id) {
    botToken.value = token
    chatId.value = id
  }

  function loadConfig() {
    // 加载本地存储的配置
    const savedToken = localStorage.getItem('telegramBotToken')
    const savedChatId = localStorage.getItem('telegramChatId')
    
    if (savedToken) botToken.value = savedToken
    if (savedChatId) chatId.value = savedChatId
  }

  return {
    uploadedImages,
    selectedFiles,
    botToken,
    chatId,
    addImage,
    clearSelected,
    saveConfig,
    loadConfig
  }
})