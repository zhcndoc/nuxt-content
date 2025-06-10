---
name: 视觉化 YAML 和 JSON 文件编辑
title: 视觉化 YAML 和 JSON 文件编辑
description: 通过自动生成的表单编辑 YAML 和 JSON 文件。
date: 2024-10-28T01:00:00.000Z
image:
  src: /docs/studio/json-yml-forms.png
authors:
  - name: Baptiste Leproux
    to: https://x.com/_larbish
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
category: studio
---

::warning
本文发表于 [Content](https://github.com/nuxt/content) 和 [Studio](https://github.com/nuxtlabs/studio-module) 模块于 2025 年 1 月 6 日合并之前。因此，文中内容可能存在一些不一致之处。Studio 模块现已废弃，并作为 Content 模块的可选功能提供。请参阅 [此指南](/docs/getting-started) 了解如何启用。
::

## `YAML` 和 `JSON` 文件的自动生成表单

:video{controls loop src="https://res.cloudinary.com/nuxt/video/upload/v1730132248/yml-json-form_n9czcs.mp4"}

延续我们让 Nuxt Studio 成为非技术用户编辑 Nuxt 网站内容工具的旅程，我们很高兴地宣布，现在可以通过生成的视觉表单来编辑 `YAML` 和 `JSON` 文件。这次更新免去了用户直接操作复杂文件语法（如 YAML 或 JSON）的需求。

::callout{icon="i-ph-info"}
目前数组尚未通过表单支持，但我们计划在 Nuxt Content v3 发布集合和用户定义的 schema 后进行支持。详见下文章节。
::

### 同步导航

此次更新同时改进了非 Markdown 格式（如 YAML 和 JSON）预览与所选文件间的同步导航。请将 Studio 模块更新至最新版本 `v2.2.0` 以应用此修复。

## 迈向 Nuxt Content v3

我们很高兴地宣布，Nuxt Content v3 的第四个 alpha 版本已发布，且 [**草稿文档**](https://content.nuxt.com/) 已开放。

### 下一步？

未来几个月，我们将专注于测试和优化 Nuxt Content v3，确保其稳健且适合生产环境发布。以下是与 Nuxt Studio 相关的主要改进：

- **合并 Studio 模块**：不久后，Studio 模块将直接集成进 Nuxt Content。Nuxt Content v3 发布后，只需在 `nuxt.config.ts` 文件中设置 `content.editor: true` 即可启用 Studio。该简化意味着无需额外模块，安装更快捷。
- **统一文档**：模块合并后，我们将把 [Content](https://content.nuxt.com) 和 [Studio](https://nuxt.studio) 的文档及网站合并为一个综合资源。Studio 平台本身（用户登录后可用）将作为独立站点保留。
- **充分利用 Studio 中的数据结构和集合**：借助 Nuxt Content v3，Studio 平台将支持并适配 [集合](/docs/collections/define) 和用户定义的 schema，实现针对 YAML、JSON 文件及 Markdown 的 front-matter 的基于 schema 的表单生成。

这些更新体现了我们为您的 Nuxt 网站提供最佳内容编辑平台的承诺。敬请期待！