# 乡叙心域 - 快速启动指南

## 安装和运行步骤

### 1. 安装依赖

打开终端（PowerShell 或 CMD），在项目根目录运行：

```bash
npm install
```

如果遇到权限问题，请使用：

```bash
npm install --legacy-peer-deps
```

### 2. 启动前端开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:5173 启动（如果端口被占用，会自动选择其他端口）

### 3. 启动后端 API 服务器（可选）

打开新终端窗口，运行：

```bash
npm run server
```

后端 API 将在 http://localhost:5000 启动

### 4. 访问网站

在浏览器中打开：http://localhost:5173

## 常见问题解决

### 问题 1：'vite' 不是内部或外部命令

**解决方案**：
```bash
# 删除 node_modules 和 package-lock.json
rmdir /s /q node_modules
del package-lock.json

# 重新安装依赖
npm install
```

### 问题 2：权限错误

**解决方案**（Windows）：
以管理员身份运行终端，然后：
```bash
npm config set prefix "C:\npm\prefix"
npm install -g vite
```

### 问题 3：端口被占用

**解决方案**：
修改 vite.config.js 中的端口号：
```javascript
server: {
  port: 3000, // 改为你想要的端口
}
```

## 生产环境部署

### 1. 构建项目

```bash
npm run build
```

构建文件将生成在 `dist` 目录

### 2. 预览生产构建

```bash
npm run preview
```

### 3. 部署到服务器

将 `dist` 目录上传到 Web 服务器（如 Nginx、Apache）

## 技术栈说明

- **前端**: React 18 + TypeScript + Vite
- **样式**: TailwindCSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **路由**: React Router 6

## 项目特色

✅ 完全响应式设计，支持手机和电脑
✅ AI 驱动的情感分析和个性化推荐
✅ 数字人陪伴交互
✅ 自动生成心路影像诗
✅ 支持拍照、语音、文字多种打卡方式

## 联系支持

如有问题，请查看项目根目录的 README.md 获取更多信息。

---

**乡叙心域** - 让传统文化治愈现代心灵 🌿
