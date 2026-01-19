---
slug: docus
subtitle: ""
title: Docus
baseDir: .starters/default
branch: main
category: docs
createdAt: 2023-11-15T17:41:03.087Z
demo: https://docus.dev
description: 使用 Markdown 编写优美的文档
licenseType: nuxt-ui
mainScreen: /templates/docus.webp
name: docus
owner: nuxt-content
image1: /blog/docus.webp
image2: ""
image3: ""
---

::template-core
> 一个漂亮且简洁的 Docus 文档启动模板

这是默认的 Docus 启动模板，提供你构建优美文档网站所需的一切，支持 Markdown 和 Vue 组件。

## ✨ 特性

- 🎨 **精美设计** - 干净、现代的文档主题
- 📱 **响应式** - 移动优先响应式设计  
- 🌙 **暗黑模式** - 内置暗/亮模式支持
- 🔍 **搜索** - 全文搜索功能
- 📝 **Markdown 增强** - 支持带有自定义组件的扩展 Markdown
- 🎨 **可定制** - 轻松主题和品牌定制
- ⚡ **快速** - 针对 Nuxt 4 优化性能
- 🔧 **TypeScript** - 完整的 TypeScript 支持

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

你的文档站点将运行在 `http://localhost:3000`

## 📁 项目结构

```text
my-docs/
├── content/              # 你的 Markdown 内容
│   ├── index.md          # 主页
│   ├── 1.getting-started/  # 入门章节
│   └── 2.essentials/    # 核心文档
├── public/               # 静态资源
└── package.json          # 依赖和脚本
```

## ⚡ 内置技术栈

该启动模板预配置了：

- [Nuxt 4](https://nuxt.com) - Web 框架
- [Nuxt Content](https://content.nuxt.com/) - 基于文件的 CMS
- [Nuxt UI](https://ui.nuxt.com) - 高级 UI 组件
- [Nuxt Image](https://image.nuxt.com/) - 图像优化
- [Tailwind CSS 4](https://tailwindcss.com/) - 实用工具优先 CSS
- [Docus Layer](https://www.npmjs.com/package/docus) - 文档主题

## 📖 文档

有关如何自定义你的 Docus 项目的详细文档，请访问 [Docus Documentation](https://docus.dev)

## 🚀 部署

生产环境构建：

```bash
npm run build
```

构建完成的文件将位于 `.output` 目录，可部署到任何支持 Node.js 的托管服务。

## 📄 许可证

[MIT 许可证](https://opensource.org/licenses/MIT)

#right
  :::template-features
  ---
  features:
    - label: Nuxt 3
      content: 由 Nuxt 3 提供支持，优化性能与 SEO。
    - label: Markdown
      content: 通过 Nuxt Content 使用 MDC 编写页面。
    - label: Nuxt UI
      content: 提供非常丰富且可完全定制的组件集。
    - label: TypeScript
      content: 完全类型化的开发体验。
    - label: Nuxt Studio
      content: 由 Nuxt Studio 支持，实现快速更新与预览。
    - label: Search
      content: 由 Fuse.js 支持的全文搜索模态框。
  ---
  :::
::