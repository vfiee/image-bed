// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '@/views/UploadView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UploadView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router