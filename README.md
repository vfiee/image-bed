# Image Bed 

一个基于 Vue3 + Telegram Bot API 的简单图床系统，支持本地上传图片并存储到 Telegram。

## 功能特性

- ✅ 响应式设计，支持移动端和PC端
- ✅ 拖拽上传和点击上传
- ✅ 图片预览功能
- ✅ 批量上传
- ✅ 自动复制链接
- ✅ 上传进度显示
- ✅ 本地存储配置信息

## 快速开始

1. 克隆项目
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`
4. 构建生产版本：`npm run build`

## 部署到 Cloudflare Pages

1. 连接你的 GitHub 仓库
2. 设置构建配置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - 环境变量：NODE_VERSION = 18

## 使用方法

1. 在 Telegram 中通过 @BotFather 创建机器人并获取 Token
2. 在应用中输入 Bot Token
3. 上传图片并获取访问链接
