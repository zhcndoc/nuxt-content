---
slug: docus
subtitle: ""
title: Docus
baseDir: .starters/default
branch: main
category: docs
createdAt: 2023-11-15T17:41:03.087Z
demo: https://docus.dev
description: 用 Markdown 编写美观的文档
licenseType: nuxt-ui-pro
mainScreen: /templates/docus.webp
name: docus
owner: nuxtlabs
image1: /blog/docus.webp
image2: ""
image3: ""
---

::template-core
> 一个美观、极简的 Docus 文档创建入门模板

这是默认的 Docus 入门模板，提供了使用 Markdown 和 Vue 组件构建漂亮文档网站所需的一切。

## ✨ 特性

- 🎨 **美观设计** - 干净、现代的文档主题
- 📱 **响应式** - 移动优先响应式设计  
- 🌙 **暗黑模式** - 内置暗/亮模式支持
- 🔍 **搜索** - 全文搜索功能
- 📝 **增强 Markdown** - 支持带自定义组件的扩展 Markdown
- 🎨 **高度可定制** - 轻松主题和品牌定制
- ⚡ **快速性能** - 针对 Nuxt 4 优化
- 🔧 **TypeScript 支持** - 完全支持 TypeScript

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

你的文档站点将运行在 `http://localhost:3000`

## 📁 项目结构

```
my-docs/
├── content/              # 你的 Markdown 内容
│   ├── index.md          # 主页
│   ├── 1.getting-started/  # 入门部分
│   └── 2.essentials/     # 重要文档
├── public/               # 静态资源
└── package.json          # 依赖和脚本
```

## ⚡ 内置技术栈

此入门模板预配置了以下组件：

- [Nuxt 4](https://nuxt.com) - Web 框架
- [Nuxt Content](https://content.nuxt.com/) - 基于文件的 CMS
- [Nuxt UI Pro](https://ui.nuxt.com/pro) - 高级 UI 组件
- [Nuxt Image](https://image.nuxt.com/) - 优化图片加载
- [Tailwind CSS 4](https://tailwindcss.com/) - 原子化 CSS 框架
- [Docus Layer](https://www.npmjs.com/package/docus) - 文档主题

## 📖 文档

要获取关于定制你的 Docus 项目的详细文档，请访问 [Docus 文档](https://docus.dev)

## 🚀 部署

生产环境构建：

```bash
npm run build
```

构建好的文件会输出到 `.output` 目录，支持部署到任何支持 Node.js 的托管服务。

## 📄 许可证

[MIT 许可证](https://opensource.org/licenses/MIT) 

#right
  :::template-features
  ---
  features:
    - label: Nuxt 3
      content: 基于 Nuxt 3，性能与 SEO 表现优异。
    - label: Markdown
      content: 使用 Nuxt Content 支持的 MDC 编写页面内容。
    - label: Nuxt UI
      content: 提供大量完全可定制的组件。
    - label: TypeScript
      content: 完全类型化的开发体验。
    - label: Nuxt Studio
      content: 兼容 Nuxt Studio，实现快速更新与预览。
    - label: Search
      content: 由 Fuse.js 驱动的全文搜索模态框。
  ---
  :::
::