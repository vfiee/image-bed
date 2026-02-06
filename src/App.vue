<!-- src/App.vue -->
<script setup>
import { RouterView } from 'vue-router'
import { Layout, LayoutHeader, LayoutContent } from 'ant-design-vue'
</script>

<template>
  <Layout class="min-h-screen flex flex-col">
    <LayoutHeader class="bg-primary text-white flex items-center justify-between px-4 md:px-6">
      <div class="text-xl font-bold flex items-center">
        <span class="i-carbon-image-magnify mr-2"></span>
        Image Bed
      </div>
    </LayoutHeader>
    <LayoutContent class="py-4 px-4 md:px-6 flex-grow">
      <RouterView />
    </LayoutContent>
    <footer class="py-4 px-4 text-center text-gray-500 text-sm border-t">
      © 2026 Image Bed - Powered by Vue3 & Telegram
    </footer>
  </Layout>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>