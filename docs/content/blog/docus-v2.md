---
title: Docus，华丽回归
description: Nuxt 文档主题和 CLI 以全新架构重写的版本 2 回来了。
seo:
  title: Docus v2 — Nuxt 文档主题的回归
date: 2025-06-10T00:00:00.000Z
category: content
draft: true
image:
  src: /blog/docus.webp
  alt: Docus 登陆页面
authors:
  - name: Baptiste Leproux
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
    to: https://x.com/_larbish
    username: larbish
---

我们彻底重写了 [Docus](https://docus.dev) 主题。以 Nuxt 生态系统为动力、由 Nuxt UI 设计，带来一个全新且现代的基础，旨在提供最佳的文档体验。

目标很简单：汲取 **Nuxt 生态系统中最优秀的部分**，交付一个强大、优雅且易于维护的文档主题。

## **Docus v2 有什么新变化？**

### **📦 一个真正的** [Nuxt]{.text-primary} **应用，只有一个依赖**

Docus 构建于 [Nuxt 3](https://nuxt.com) 之上（已启用 4 版本兼容模式，已为 Nuxt 4 做好准备）。这意味着你的文档是一个完整的 Nuxt 应用，可访问 Nuxt 的全部功能：组件、模块、插件、运行时配置等。

**但**，**最棒的是**... 你只需安装 **docus** 这个包。它捆绑了所有必要的官方 Nuxt 模块，让你可以在几秒钟内开始编写文档。在你的项目中只需一个 `package.json` 文件和一个包含 Markdown 文件的 `content/` 文件夹，就能马上开始。

::prose-tip{to="https://docus.dev/concepts/nuxt"}
了解更多 Docus 中的 Nuxt 层专属章节。
::

### **✨ 由** [Nuxt]{.text-primary} **UI Pro 设计**

Docus v2 由 **Nuxt UI Pro** 驱动，开箱即用美观、响应式且无障碍的主题。配合 **Tailwind CSS v4**、**CSS 变量** 和 **Tailwind Variants API**，你的文档默认美观且完全可定制。

你可以通过简单修改 `app.config.ts` ，全局或逐组件调整颜色、更新排版或组件样式。

::prose-tip{to="https://docus.dev/concepts/theme"}
了解更多 Docus 中的 UI 主题专属章节。
::

::prose-note
目前需要 UI Pro 许可证，但我们正努力很快让其免费向所有人开放。
::

### **✍️ 拥有超能力的 Markdown（由** [Nuxt]{.text-primary} **Content 支持的 MDC 语法）**

写文档从未如此简单。只需一个 Markdown 文件夹即可。此外，借助 Nuxt Content 和 MDC 语法，你可以在 Markdown 中嵌入交互式 Vue 组件，使用任何 Nuxt UI 组件或自定义组件。

::prose-tip{to="https://docus.dev/concepts/edition"}
了解更多 Docus 中的 MDC 语法专属章节。
::

### 🖥️ 准备好支持 [Nuxt]{.text-primary} Studio

Docus 完美配合 **Nuxt Studio**，让你完全在浏览器中管理和编辑文档。无需终端，无需本地环境设置，是与非技术贡献者协作或团队集中管理文档的理想方式。

::prose-tip{to="https://docus.dev/getting-started/studio"}
了解更多 Docus 中的 Studio 编辑器专属章节。
::

### **🔍 开箱即用的 SEO**

技术 SEO 既复杂又乏味。Docus 提供了一个稳健的默认可选设置，开箱即用，同时让你完全控制 SEO 元数据，从页面元信息到社交分享图片。

::prose-tip{to="https://docus.dev/concepts/configuration"}
了解更多 Docus 中的应用配置专属章节。
::

### **🔧 通过组件覆盖实现完全自定义**

需要替换部分布局或 UI？Docus 使用 **Nuxt Layers** 让你覆盖我们定义的核心组件。只需在项目的 `components/` 目录中创建同名组件，Docus 会自动使用它。

::prose-tip{to="https://docus.dev/concepts/customization"}
了解更多 Docus 中组件覆盖专属章节。
::

### **🤖 默认集成大型语言模型（LLMs）**

Docus 默认集成了 `nuxt-llms`，为大型语言模型（LLMs）准备你的内容。所有文档页面均被注入，且自动生成并预渲染 `/llms.txt` 文件。

::prose-tip{to="https://docus.dev/concepts/llms"}
了解更多 Docus 中 LLMs 集成专属章节。
::

### **🧠 为即刻使用的文档提供智能默认**

Docus 含有贴心默认设置，节省你的时间：

- ✅ 根据文件夹结构自动生成侧边栏导航
- 🔍 使用 Fuse.js 支持全文搜索
- ✨ 优化排版和布局
- 🌙 支持开箱即用的暗黑模式
- 🖼️ 集成 Nuxt Image，实现响应式和优化图像

### **🔁 简单迁移**

从任何基于 Markdown 的系统迁移都非常简单：将 `.md` 文件放入 `content/` 文件夹，立即上线。

## **接下来是什么？**

### **🔧 今天就试试 Docus**

```bash
npx docus init docs
```

就这么简单 🚀 你可以编辑 `content/` 文件夹开始编写文档了。

::prose-tip{to="https://docus.dev"}
访问文档以了解 Docus 的全部内容。
::

### **🤝 贡献**

我们已将仓库迁移到 **NuxtLabs** GitHub 组织，并清理了问题跟踪器，重新开始。

无论是修复 Bug、建议新功能还是编写文档，我们都非常欢迎你的帮助。欢迎反馈、贡献和关于 Docus 未来的讨论！