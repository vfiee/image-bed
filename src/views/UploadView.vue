<!-- src/views/UploadView.vue -->
<template>
  <div class="upload-container max-w-4xl mx-auto">
    <div class="card mb-6" v-if="!botToken || !chatId">
      <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 class="text-lg font-medium text-yellow-800 mb-2">环境配置提示</h3>
        <p class="text-yellow-700 mb-2">当前未检测到环境变量配置的Bot Token和Chat ID</p>
        <p class="text-sm text-yellow-600">请联系管理员配置环境变量：</p>
        <ul class="text-sm text-yellow-600 mt-1">
          <li>VITE_TELEGRAM_BOT_TOKEN - Telegram Bot Token</li>
          <li>VITE_TELEGRAM_CHAT_ID - Telegram Chat ID</li>
        </ul>
      </div>
    </div>

    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">上传图片</h2>
      <div 
        class="upload-area border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop"
        @click="triggerFileSelect"
      >
        <input 
          ref="fileInputRef"
          type="file" 
          accept="image/*" 
          multiple 
          class="hidden" 
          @change="handleFileSelect"
        />
        <div class="flex flex-col items-center justify-center">
          <div class="i-carbon-cloud-upload text-4xl mb-3"></div>
          <p class="text-gray-600 mb-2">点击选择文件或拖拽图片到此处</p>
          <p class="text-sm text-gray-500">支持 JPG, PNG, GIF, WEBP 格式</p>
        </div>
      </div>
    </div>

    <!-- 图片预览区域 -->
    <div v-if="selectedFiles.length > 0" class="card mb-6">
      <h3 class="text-lg font-medium mb-4">待上传图片</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div 
          v-for="(file, index) in selectedFiles" 
          :key="index"
          class="relative group"
        >
          <img 
            :src="file.previewUrl" 
            :alt="file.name"
            class="w-full h-32 object-cover rounded-lg"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              @click="removeFile(index)"
              class="text-white hover:text-danger"
            >
              <span class="i-carbon-trash-can text-xl"></span>
            </button>
          </div>
          <p class="text-xs mt-1 truncate">{{ file.name }}</p>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <a-button 
          type="primary" 
          :loading="uploading" 
          :disabled="selectedFiles.length === 0 || !botToken"
          @click="uploadToTelegram"
        >
          {{ uploading ? '上传中...' : `上传 (${selectedFiles.length})` }}
        </a-button>
      </div>
    </div>

    <!-- 已上传图片列表 -->
    <div v-if="uploadedImages.length > 0" class="card">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium">已上传图片</h3>
        <a-button @click="copyAllLinks" v-if="uploadedImages.length > 0">
          复制全部链接
        </a-button>
      </div>
      <div class="space-y-3">
        <div 
          v-for="(image, index) in uploadedImages" 
          :key="index"
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
        >
          <div class="flex items-center mb-2 sm:mb-0">
            <img :src="image.url" :alt="image.filename" class="w-16 h-16 object-cover rounded mr-3" />
            <div>
              <p class="font-mono text-sm break-all">{{ image.filename }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(image.uploadTime) }}</p>
            </div>
          </div>
          <div class="flex space-x-2 w-full sm:w-auto">
            <a-input 
              :value="image.url" 
              readonly 
              size="small"
              class="flex-grow"
            />
            <a-button 
              size="small" 
              @click="copyLink(image.url)"
            >
              复制
            </a-button>
            <a-button 
              size="small" 
              @click="previewImage(image.url)"
            >
              预览
            </a-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 上传进度弹窗 -->
    <a-modal 
      v-model:open="progressVisible" 
      title="上传进度" 
      :footer="null"
      :mask-closable="false"
      :closable="false"
    >
      <div v-for="(progressItem, index) in uploadProgress" :key="index" class="mb-3">
        <p class="text-sm font-medium truncate">{{ progressItem.filename }}</p>
        <a-progress 
          :percent="progressItem.percent" 
          :status="progressItem.status"
          size="small"
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import TelegramApi from '@/utils/telegramApi'

const fileInputRef = ref(null)
const selectedFiles = ref([])
const uploadedImages = ref([])
const uploading = ref(false)
const progressVisible = ref(false)
const uploadProgress = ref([])

// 从环境变量读取配置
const botToken = ref(import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '')
const chatId = ref(import.meta.env.VITE_TELEGRAM_CHAT_ID || '')

// 文件选择处理
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const triggerFileSelect = () => {
  fileInputRef.value.click()
}

const handleDragOver = (event) => {
  event.preventDefault()
}

const handleDrop = (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = (files) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  if (imageFiles.length === 0) {
    message.warning('请选择有效的图片文件')
    return
  }
  
  imageFiles.forEach(file => {
    const previewUrl = URL.createObjectURL(file)
    selectedFiles.value.push({
      file,
      previewUrl,
      name: file.name
    })
  })
}

const removeFile = (index) => {
  const file = selectedFiles.value[index]
  URL.revokeObjectURL(file.previewUrl)
  selectedFiles.value.splice(index, 1)
}

// 上传到Telegram
const uploadToTelegram = async () => {
  if (selectedFiles.value.length === 0) return
  if (!botToken.value) {
    message.error('未配置 Telegram Bot Token')
    return
  }
  
  uploading.value = true
  progressVisible.value = true
  uploadProgress.value = selectedFiles.value.map((item, index) => ({
    filename: item.name,
    percent: 0,
    status: 'active',
    index
  }))
  
  try {
    // 初始化Telegram API
    const telegramApi = new TelegramApi(botToken.value, chatId.value)
    
    // 逐个上传图片
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const fileData = selectedFiles.value[i]
      
      // 更新进度
      const progressItem = uploadProgress.value.find(item => item.index === i)
      if (progressItem) {
        progressItem.percent = 30
        
        try {
          // 实际上传到Telegram
          const result = await telegramApi.sendPhoto(fileData.file, `Image: ${fileData.name}`)
          
          if (result.success) {
            // 添加到已上传列表
            uploadedImages.value.unshift({
              url: result.url,
              filename: fileData.name,
              uploadTime: new Date().toISOString(),
              fileId: result.fileId
            })
            
            progressItem.percent = 100
            progressItem.status = 'success'
          } else {
            throw new Error(result.error || '上传失败')
          }
        } catch (error) {
          console.error('上传单张图片失败:', error)
          progressItem.status = 'exception'
          progressItem.percent = 0
          throw error
        }
      }
    }
    
    message.success(`成功上传 ${selectedFiles.value.length} 张图片`)
    selectedFiles.value = []
  } catch (error) {
    console.error('上传失败:', error)
    message.error(error.message || '上传失败，请重试')
    
    uploadProgress.value.forEach(item => {
      if (item.status !== 'success') {
        item.status = 'exception'
      }
    })
  } finally {
    uploading.value = false
    setTimeout(() => {
      progressVisible.value = false
    }, 1000)
  }
}

// 复制链接
const copyLink = async (url) => {
  try {
    await navigator.clipboard.writeText(url)
    message.success('链接已复制')
  } catch (err) {
    console.error('复制失败:', err)
    message.error('复制失败')
  }
}

const copyAllLinks = async () => {
  try {
    const allLinks = uploadedImages.value.map(img => img.url).join('\n')
    await navigator.clipboard.writeText(allLinks)
    message.success('所有链接已复制')
  } catch (err) {
    console.error('复制失败:', err)
    message.error('复制失败')
  }
}

// 预览图片
const previewImage = (url) => {
  window.open(url, '_blank')
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

// 清理预览URL
onUnmounted(() => {
  selectedFiles.value.forEach(file => {
    if (file.previewUrl) {
      URL.revokeObjectURL(file.previewUrl)
    }
  })
})
</script>

<style scoped>
.upload-area {
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: #1890ff;
  background-color: #f0f8ff;
}
</style>