# Image Bed - 基于 Telegram 的图床系统

一个基于 Vue3 + Telegram Bot API 的简单图床系统，支持本地上传图片并存储到 Telegram。

## 功能特性

- ✅ 响应式设计，支持移动端和PC端
- ✅ 拖拽上传和点击上传
- ✅ 图片预览功能
- ✅ 批量上传
- ✅ 自动复制链接
- ✅ 上传进度显示
- ✅ 本地存储配置信息

## 技术栈

- Vue 3 (Composition API)
- Vite
- UnoCSS (原子CSS)
- Ant Design Vue
- Pinia (状态管理)
- Vue Router

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone <your-repo-url>
cd image-bed
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 配置 Telegram Bot

1. 在 Telegram 中联系 @BotFather 创建一个新的机器人
2. 获取 Bot Token
3. 在应用中输入 Bot Token 即可开始使用

## 部署到 Cloudflare Pages

1. Fork 此仓库
2. 在 Cloudflare Pages 中创建新项目并连接仓库
3. 设置构建配置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - 环境变量：NODE_VERSION = 18

## 项目结构

```
image-bed/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   ├── views/              # 页面视图
│   ├── utils/              # 工具函数
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia store (如使用)
│   ├── App.vue             # 主应用组件
│   └── main.js             # 应用入口
├── dist/                   # 构建输出目录
├── .github/                # GitHub 配置
├── .gitignore
├── package.json
├── vite.config.js
├── unocss.config.js
├── wrangler.toml           # Cloudflare 配置
└── README.md
```

## 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建新组件
2. 使用 Vue 3 Composition API
3. 遵循 UnoCSS 原子类命名规范

### 样式规范

- 使用 UnoCSS 原子类
- 在 `unocss.config.js` 中定义快捷方式
- 保持样式一致性

## 部署

### 本地构建

```bash
npm run build
```

构建后的文件将出现在 `dist/` 目录中，可部署到任意静态文件服务器。

### Cloudflare Pages

使用提供的 GitHub Action 自动部署到 Cloudflare Pages。

## 安全注意事项

- Bot Token 仅在客户端存储，不会发送到服务器
- 用户需自行保管好自己的 Bot Token
- 建议限制机器人的权限

## 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。