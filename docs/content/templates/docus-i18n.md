---
slug: docus-i18n
subtitle: ""
title: Docus I18n
baseDir: .starters/i18n
branch: main
category: docs
createdAt: 2023-11-15T17:41:03.087Z
demo: https://docus.dev
description: 使用 Markdown 和 Nuxt I18n 编写漂亮的国际化文档 uesssh
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
> 一个漂亮的国际化入门模板，使用 Docus 创建多语言文档

这是一个 i18n Docus 入门模板，提供了构建漂亮多语言文档站点所需的一切，支持 Markdown 和 Vue 组件。

## ✨ 特性

- 🌍 **国际化** - 原生 i18n 支持多语言文档
- 🎨 **精美设计** - 简洁现代的文档主题
- 📱 **响应式** - 移动优先响应设计  
- 🌙 **暗色模式** - 内建暗/亮模式支持
- 🔍 **搜索** - 每种语言的全文搜索功能
- 📝 **增强 Markdown** - 扩展的 Markdown 支持自定义组件
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

您的多语言文档站点将在 `http://localhost:3000` 运行

## 🌍 语言

此入门模板预配置了：
- 🇺🇸 **英语** (`en`) - 默认语言
- 🇫🇷 **法语** (`fr`) - 法语翻译

## 📁 项目结构

```
my-docs/
├── content/              # 你的 Markdown 内容
│   ├── en/              # 英文内容
│   │   ├── index.md     # 英文首页
│   │   └── docs/        # 英文文档
│   └── fr/              # 法语内容
│       ├── index.md     # 法语首页
│       └── docs/        # 法语文档
├── public/              # 静态资源
├── nuxt.config.ts       # 配置了 i18n 的 Nuxt 配置
└── package.json         # 依赖和脚本
```

### 内容结构

内容按语言组织，方便管理翻译：

```
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

i18n 入门模板生成带语言前缀的 URL：

- 英语: `/en/getting-started/installation`
- 法语: `/fr/getting-started/installation`
- 默认语言回退: `/getting-started/installation` （重定向至英语）

## ⚡ 构建工具

此模板预配置了：

- [Nuxt 4](https://nuxt.com) - Web 框架
- [Nuxt Content](https://content.nuxt.com/) - 基于文件的 CMS
- [Nuxt i18n](https://i18n.nuxt.com/) - 国际化支持
- [Nuxt UI](https://ui.nuxt.com) - 高级 UI 组件
- [Nuxt Image](https://image.nuxt.com/) - 优化图片组件
- [Tailwind CSS 4](https://tailwindcss.com/) - 实用优先 CSS 框架
- [Docus Layer](https://www.npmjs.com/package/docus) - 文档主题

## 📖 文档

有关如何自定义你的 Docus 项目的详细说明，请访问 [Docus 文档](https://docus.dev)

## 🚀 部署

生产构建：

```bash
npm run build
```

构建好的文件将位于 `.output` 目录，可部署至任何支持 Node.js 的主机。

## 📄 许可

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
      content: 提供大量可完全定制的组件
    - label: TypeScript
      content: 完整的类型开发体验
    - label: Nuxt Studio
      content: 支持 Nuxt Studio，快速更新和预览
    - label: Search
      content: 基于 Fuse.js 的全文搜索模态框
    - label: Nuxt Image
      content: 强大的图片组件
    - label: Nuxt Content
      content: 强大的内容组件    
  ---
  :::
::
