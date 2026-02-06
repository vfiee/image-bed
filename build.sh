#!/bin/bash
# 构建脚本

# 安装依赖
npm install

# 构建项目
npm run build

echo "构建完成！静态文件位于 dist/ 目录"