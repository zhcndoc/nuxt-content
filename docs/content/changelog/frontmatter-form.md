---
name: 可视化 Front-matter 编辑  
title: 可视化 Front-matter 编辑  
description: 现在可以通过可视化界面编辑页面元数据，而不必使用 YAML。  
date: 2024-10-17T00:00:00.000Z  
image:  
  src: /blog/frontmatters.png  
authors:  
  - name: Baptiste Leproux  
    avatar:  
      src: https://avatars.githubusercontent.com/u/7290030?v=4  
    to: https://x.com/_larbish  
category: studio  
---

::warning  
本文发布于 2025 年 1 月 6 日 [Content](https://github.com/nuxt/content) 和 [Studio](https://github.com/nuxtlabs/studio-module) 模块合并之前。因此，本文可能存在一些不一致之处。Studio 模块现已弃用，作为 Content 模块的可选功能提供。请参阅[这份指南](/docs/getting-started)了解如何启用。  
::

## 可视化 Front-Matter 编辑

现在您无需编写 `YAML` 语法即可编辑 markdown front-matter。Nuxt Studio 会自动生成用户友好的表单，简化元数据编辑。

:video{autoplay controls loop poster="https://res.cloudinary.com/nuxt/video/upload/v1729157955/frontmatterform2_rmh58v.jpg" src="https://res.cloudinary.com/nuxt/video/upload/v1729157955/frontmatterform2_rmh58v.mp4"}

## 什么是 Front-matter？

Front-matter 是基于 Markdown 的 CMS 中用于为页面提供元数据（如描述、标题等）的约定。在 [Nuxt Content](/docs/files/markdown#front-matter) 中，front-matter 使用的是 YAML 语法。

::callout{icon="i-ph-info" to="/docs/files/markdown#front-matter"}  
关于 front-matter 语法的详细信息，请参阅 Nuxt Content 文档。  
::

## 我们非技术编辑器的最后一环

Nuxt Studio 从发布编辑器起就以非技术用户为设计核心。我们的目标是让每个人都能轻松编辑 markdown 和内容。

自动生成 front-matter 表单是下一步的合理进展。通过摆脱 YAML 语法的复杂性，简化了非开发者的编辑流程，提供动态输入选项，如图片选择器、日期选择器、布尔切换等。此增强使我们实现了完全可视化且用户友好的内容管理体验。

## 扩展至所有 YAML 和 JSON 文件

不久之后，表单生成功能将扩展至您在 Nuxt Studio 中编辑的所有 `YAML` 和 `JSON` 文件，让结构化数据的操作更为轻松便捷。

## 展望 Nuxt Content v3

::callout{icon="i-ph-lightbulb"}  
本节内容仅为 [Nuxt Content v3](https://github.com/nuxt/content/tree/v3) 的预告，我们将很快发布更详尽的博文。  
::

我们正积极开发下一重大版本 Nuxt Content，这将带来显著的性能提升和新功能，进一步提升内容管理体验。

### 性能优化

Nuxt Content v2 的一大挑战是需要较大的包体积来存储所有内容文件，这在向边缘平台（如 [NuxtHub](https://hub.nuxt.com/)）部署时造成了问题。

为解决此问题，Nuxt Content v3 在生产环境中不再使用基于文件的存储方式，而是采用 SQL 数据库系统。此变更对用户透明。我们为开发模式、静态生成、服务器渲染及通过 NuxtHub 的边缘部署提供零配置支持。

### 引入 Collections（集合）

Collections 是 Nuxt Content 项目中相关内容项的分组，帮助更高效地组织和管理大型数据集。

#### 定义 Collections

您可以在 `content.config.ts` 文件中定义 collections，Nuxt Content 将用它配置数据库结构、类型工具及用于查找、解析和查询内容的方法。

#### Collections 方案（Schema）

方案可确保 collections 内部的一致性，并改善 TypeScript 类型定义，增强与 Nuxt Content 工具的集成。

```ts [content.config.ts]
import { defineCollection, z } from '@nuxt/content'

// 导出 collections
export const collections = {
  // 使用 `defineCollection` 工具定义 collection
  posts: defineCollection({
    // 指定该 collection 中内容的类型
    type: 'page',
    // 加载匹配此模式的所有文件
    source: 'blog/**/*.md',
    // 为该 collection 定义自定义 schema
    schema: z.object({
      date: z.date(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      badge: z.object({
        label: z.string(),
        color: z.string()
      })
    })
  }),
}
```

### 针对 Nuxt Studio 精心打造

::warning  
本文发布于 v3.7 之前，了解如何迁移请参考[此指南](https://github.com/nuxt/content/blob/main/CHANGELOG.md#370-2025-09-12)。  
::

Nuxt Studio 最初与 Nuxt Content v2 同步开发，但在 v3 中，我们以 Nuxt Studio 体验为目标重构模块。我们的宗旨是打造最佳内容编辑 CMS 平台，同时提供极佳的开发者体验。

例如，collection schema 将助力我们进一步增强 Studio 中的表单生成。您甚至可以直接在 schema 中设置字段的编辑器类型。

```ts [content.config.ts]
image: z.object({
    src: z.string().editor({ type: 'media' }),
    alt: z.string()
}),
icon: z.string().editor({ type: 'icon' })
```

::callout{icon="i-ph-lightbulb" to="https://github.com/nuxt/content/tree/main"}  
Nuxt Content v3 已正式发布。欢迎尝试并向我们反馈意见。  
::