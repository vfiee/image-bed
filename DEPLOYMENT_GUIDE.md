# 部署指南

## 部署到 GitHub

### 1. 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 创建一个新仓库，例如命名为 `image-bed`
3. 不要初始化 README、.gitignore 或 license（我们已经有了）

### 2. 推送代码
```bash
# 进入项目目录
cd image-bed

# 初始化本地仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Vue3 image bed with Telegram integration"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/image-bed.git

# 推送代码
git branch -M main
git push -u origin main
```

## 部署到 Cloudflare Pages

### 1. 准备 Cloudflare 账户
1. 访问 https://dash.cloudflare.com/login
2. 登录你的账户

### 2. 获取必要信息
1. 在 Cloudflare Dashboard 中找到你的 Account ID
   - 导航至 "Workers & Pages" → "Overview"
   - Account ID 显示在右侧

2. 创建 Cloudflare API Token
   - 导航至 "My Profile" → "API Tokens"
   - 点击 "Create Token"
   - 使用 "Edit Cloudflare Pages" 模板
   - 记录下 API Token

### 3. 在 Cloudflare Pages 中创建项目
1. 访问 https://dash.cloudflare.com/login
2. 导航至 "Workers & Pages"
3. 点击 "Create application" → "Pages"
4. 选择 "Connect to Git"

### 4. 连接 GitHub 仓库
1. 选择你刚刚创建的 `image-bed` 仓库
2. 点击 "Begin setup"

### 5. 配置构建设置
- 构建命令：`npm run build`
- 构建输出目录：`dist`
- 环境变量：
  - `NODE_VERSION`: `18`

### 6. 环境变量（可选）
如果使用 GitHub Actions 部署，需要在 GitHub 仓库中设置以下 secrets：
- `CF_API_TOKEN`: 你的 Cloudflare API Token
- `CF_ACCOUNT_ID`: 你的 Cloudflare Account ID

## 项目结构说明

```
image-bed/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   ├── views/              # 页面视图
│   ├── utils/              # 工具函数
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia store
│   ├── App.vue             # 主应用组件
│   └── main.js             # 应用入口
├── dist/                   # 构建输出目录
├── .github/workflows/      # GitHub Actions 配置
├── .gitignore
├── package.json
├── vite.config.js
├── unocss.config.js
├── wrangler.toml           # Cloudflare 配置
└── README.md
```

## 使用说明

1. 部署完成后，访问 Cloudflare Pages 分配的域名
2. 在应用中输入你的 Telegram Bot Token
3. 上传图片并获取可访问的链接
4. 所有配置信息会保存在本地存储中

## 安全注意事项

- Bot Token 仅在客户端存储，不会发送到服务器
- 请妥善保管你的 Bot Token
- 建议限制机器人的权限