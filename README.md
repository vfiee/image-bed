# Image Bed

一个基于 Vue3 + Telegram Bot API 的简单图床系统，支持本地上传图片并存储到 Telegram。

## 功能特性

- ✅ 响应式设计，支持移动端和PC端
- ✅ 拖拽上传和点击上传
- ✅ 图片预览功能
- ✅ 批量上传
- ✅ 自动复制链接
- ✅ 上传进度显示
- ✅ 环境变量配置Bot信息

## 快速开始

1. 克隆项目
2. 安装依赖：`npm install`
3. 配置环境变量（见下文）
4. 启动开发服务器：`npm run dev`
5. 构建生产版本：`npm run build`

## 环境变量配置

创建 `.env` 文件并填入以下信息：

```bash
# Telegram Bot 配置
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

## 部署到 Cloudflare Pages

1. 连接你的 GitHub 仓库
2. 在 Cloudflare Pages 控制台设置环境变量：
   - `VITE_TELEGRAM_BOT_TOKEN`: 你的 Telegram Bot Token
   - `VITE_TELEGRAM_CHAT_ID`: 你的 Telegram Chat ID
3. 设置构建配置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - 环境变量：NODE_VERSION = 18

## 使用方法

1. 在 Telegram 中通过 @BotFather 创建机器人并获取 Token
2. 配置环境变量
3. 上传图片并获取访问链接
