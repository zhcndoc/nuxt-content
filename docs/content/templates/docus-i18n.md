---
slug: docus-i18n
subtitle: ""
title: Docus 国际化
baseDir: .starters/i18n
branch: main
category: docs
createdAt: 2023-11-15T17:41:03.087Z
demo: https://docus.dev
description: 使用 Markdown 和 Nuxt I18n 编写优美的国际化文档 uesssh
licenseType: nuxt-ui
mainScreen: /templates/docus.webp
name: docus
owner: nuxt-content
image1: /blog/docus.webp
image2: ""
image3: ""
draft: true
---

::template-core
> 这是一个美观且支持国际化的启动模板，用来用 Docus 创建多语言文档

这是 i18n Docus 启动模板，提供了构建美观多语言文档站点所需的一切，支持使用 Markdown 和 Vue 组件。

## ✨ 特性

- 🌍 **国际化** - 原生支持多语言文档的 i18n
- 🎨 **美观设计** - 干净、现代的文档主题
- 📱 **响应式** - 移动优先的响应式设计  
- 🌙 **暗黑模式** - 内置暗黑/亮色模式支持
- 🔍 **搜索** - 每种语言的全文搜索功能
- 📝 **增强 Markdown** - 扩展的 Markdown，支持自定义组件
- 🎨 **可定制** - 便捷的主题和品牌定制
- ⚡ **快速** - 针对 Nuxt 4 进行了性能优化
- 🔧 **TypeScript** - 全面支持 TypeScript

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

您的多语言文档网站将在 `http://localhost:3000` 运行

## 🌍 支持语言

此启动模板预配置了：

- 🇺🇸 **英语** (`en`) - 默认语言
- 🇫🇷 **法语** (`fr`) - 法语翻译

## 📁 项目结构

```text
my-docs/
├── content/              # 你的 Markdown 内容
│   ├── en/              # 英文内容
│   │   ├── index.md     # 英文首页
│   │   └── docs/        # 英文文档
│   └── fr/              # 法语内容
│       ├── index.md     # 法语首页
│       └── docs/        # 法语文档
├── public/              # 静态资源
├── nuxt.config.ts       # 配置包括 i18n 设置的 Nuxt 配置
└── package.json         # 依赖及脚本
```

### 内容结构

内容按语言组织，便于管理翻译：

```text
content/
├── en/                   # 英文内容
│   ├── index.md
│   ├── 1.getting-started/
│   │   ├── installation.md
│   │   └── configuration.md
│   └── 2.essentials/
│       ├── markdown.md
│       └── components.md
└── fr/                   # 法语内容
    ├── index.md
    ├── 1.getting-started/
    │   ├── installation.md
    │   └── configuration.md
    └── 2.essentials/
        ├── markdown.md
        └── components.md
```

## 🔗 URL 结构

i18n 启动模板生成带语言前缀的 URL：

- 英文: `/en/getting-started/installation`
- 法语: `/fr/getting-started/installation`
- 默认语言 fallback: `/getting-started/installation`（重定向到英文）

## ⚡ 使用技术栈

此启动模板预配置了：

- [Nuxt 4](https://nuxt.zhcndoc.com) - Web 框架
- [Nuxt Content](https://nuxt-content.zhcndoc.com/) - 基于文件的 CMS
- [Nuxt i18n](https://i18n.nuxt.com/) - 国际化支持
- [Nuxt UI](https://ui.nuxt.com) - 高级 UI 组件库
- [Nuxt Image](https://image.nuxt.com/) - 图片优化组件
- [Tailwind CSS 4](https://tailwindcss.zhcndoc.com/) - 原子化 CSS 框架
- [Docus Layer](https://www.npmjs.com/package/docus) - 文档主题

## 📖 文档

有关定制你的 Docus 项目的详细文档，请访问 [Docus 文档](https://docus.dev)

## 🚀 部署

生产环境构建：

```bash
npm run build
```

构建生成的文件位于 `.output` 目录，可部署到任何支持 Node.js 的托管服务。

## 📄 许可证

[MIT 许可证](https://opensource.org/licenses/MIT)

#right
  :::template-features
  ---
  features:
    - label: Nuxt 4
      content: Web 框架
    - label: Nuxt I18n
      content: 国际化支持
    - label: Nuxt UI
      content: 丰富且完全可定制的组件集合
    - label: TypeScript
      content: 完整的类型开发体验
    - label: Nuxt Studio
      content: 由 Nuxt Studio 支持快速更新和预览
    - label: Search
      content: 由 Fuse.js 驱动的全文搜索模态框
    - label: Nuxt Image
      content: 强大的图片组件
    - label: Nuxt Content
      content: 强大的内容组件
  ---
  :::
::
