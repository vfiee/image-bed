// src/utils/telegramApi.js
class TelegramApi {
  constructor(botToken, chatId) {
    this.botToken = botToken
    this.chatId = chatId
    this.baseUrl = 'https://api.telegram.org/bot'
  }

  async sendPhoto(photoBlob, caption = '') {
    const formData = new FormData()
    formData.append('chat_id', this.chatId)
    formData.append('photo', photoBlob, photoBlob.name)
    if (caption) {
      formData.append('caption', caption)
    }

    try {
      const response = await fetch(`${this.baseUrl}${this.botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.ok) {
        // 返回图片的file_id和其他信息
        const photo = result.result.photo
        const fileId = photo[photo.length - 1].file_id // 最高质量的图片
        return {
          success: true,
          fileId,
          messageId: result.result.message_id,
          url: `https://api.telegram.org/file/bot${this.botToken}/${fileId}`,
          originalResponse: result
        }
      } else {
        throw new Error(result.description || 'Unknown error')
      }
    } catch (error) {
      console.error('Error sending photo to Telegram:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async getFileUrl(fileId) {
    try {
      const response = await fetch(`${this.baseUrl}${this.botToken}/getFile?file_id=${fileId}`)
      const result = await response.json()
      
      if (result.ok) {
        return `${this.baseUrl}${this.botToken}/${result.result.file_path}`
      } else {
        throw new Error(result.description || 'Unknown error')
      }
    } catch (error) {
      console.error('Error getting file URL:', error)
      throw error
    }
  }

  async sendMessage(text, options = {}) {
    const params = {
      chat_id: this.chatId,
      text: text,
      ...options
    }

    try {
      const response = await fetch(`${this.baseUrl}${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }
}

export default TelegramApi