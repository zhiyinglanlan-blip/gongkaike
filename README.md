# 跨学科数据小侦探 (React + Vite)

这是一个使用 React 和 Vite 构建的完全静态前端应用。

## 部署到本地运行的步骤

### 1. 安装 Node.js
如果你还没有安装 Node.js，请前往 [Node.js 官网](https://nodejs.org/) 下载并安装较新的版本（建议 v18 或以上）。

### 2. 初始化环境
在项目根目录打开终端，安装项目依赖：
```bash
npm install
```

### 3. 本地开发服务器
如果需要在本地修改和预览：
```bash
npm run dev
```
之后在浏览器中访问终端提示的地址（例如 `http://localhost:3000`）。这会开启热更新功能（HMR）。

### 4. 生产环境构建 & 部署
若需要构建打包文件用于部署（如部署到 Vercel、Netlify、GitHub Pages 或你自己的静态服务器如 Nginx 等），执行以下命令：
```bash
npm run build
```
这将在项目根目录生成一个 `dist` 文件夹，里面包含了可部署的全部静态资源文件。

你可以使用任何静态服务器来预览它，例如使用 `serve`：
```bash
npx serve dist
```

## 注意事项

- 本项目由 Google AI Studio 辅助生成，采用 React 19 和最新的 TailwindCSS v4。
- 所有的数据流均在前端处理，当前不需要额外启动后端服务。
- 为了保证正确渲染文字转语音 (TTS) 功能，请确保在主流支持 Web Speech API 的现代浏览器中运行项目。
