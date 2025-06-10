---
title: 介绍 Nuxt Studio v2
description: 我们很高兴地宣布 Nuxt Studio v2 的发布，这是为您的 Nuxt Content 网站带来全新编辑体验的大版本更新
image:
  src: /blog/nuxt-studio-v2.png
authors:
  - name: Baptiste Leproux
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
    to: https://x.com/_larbish
    username: larbish
date: 2024-06-13T00:00:00.000Z
category: studio
---

::warning
本文发表于 2025 年 1 月 6 日 [Content](https://github.com/nuxt/content) 和 [Studio](https://github.com/nuxtlabs/studio-module) 模块合并之前。因此，内容可能存在一些不一致。Studio 模块现已废弃，作为 Content 模块的可选功能提供。了解如何在[此指南](/docs/getting-started)中启用它。
::

我们很高兴宣布 Nuxt Studio v2 的发布，这是一次重大更新，带来了全新界面，特别基于用户反馈为用户量身设计。

::tip
Studio 针对 **Nuxt Content** 项目进行了优化，但唯一真正的要求是拥有包含 Markdown 文件的 *content* 文件夹。这个简单配置足以开始使用该平台编辑和发布文件。
::

### **更加直观的界面**

![Nuxt studio v2 界面](/blog/v2-interface.webp)

版本 2 的主要改进是对界面的**全面重构**。我们将其设计得更直观、更易用，尤其对非技术用户更友好。我们的目标是简化用户体验，让创建和设置项目变得更轻松。新界面简洁明快，旨在优化您的工作流程。

### **谷歌认证**

![谷歌和 GitHub 认证](/blog/google-github.webp)

我们现在提供两种不同的认证方式。您可以用 **GitHub** 或 **Google** 登录。这两种方式赋予相同的编辑权限，但由于 Studio 与 GitHub 同步，部分功能专属 GitHub 用户，尤其是项目创建。

::warning
由于 Google 用户无法创建项目，需**加入已有项目的团队**以进行编辑。
::

### **最简配置即可编辑文件**

您现在无需任何配置即可编辑内容，只需导入您的仓库即可。您可以浏览文件和媒体，编辑内容并发布到 GitHub。

团队协作功能也已支持。

![类 Notion 编辑器支持协作](/blog/collaborate.webp)

::warning
编辑器中的媒体在未设置实时预览前不会显示（详见下文）。
::

### 简化的实时预览设置

![实时预览开启于类 Notion 编辑器与网站之间](/blog/preview.webp)

由于实时预览功能需要部署的 URL，我们使设置尽可能简单。

虽然 GitHub Pages 部署依然可用且无需您配置，但自托管项目的要求已简化，移除了令牌校验。[启用 Studio 模块](https://nuxt.studio/docs/get-started/setup#enable-the-live-preview) 是**唯一剩下的要求。**

::warning{to="https://github.com/nuxtlabs/studio-module"}
务必使用最新版本的 **Studio 模块** 以确保兼容性及访问新功能。
::

### 全新的文档

随着全新平台上线，带来了[新文档](https://nuxt.studio/docs/get-started/introduction)。欢迎查阅，深入了解全新的 Studio。

无论您是[编辑者](https://nuxt.studio/docs/editors/introduction)还是[开发者](https://nuxt.studio/docs/developers/introduction)，现在都有专属的文档章节。

### Studio 的新方向

大多数可用 CMS 解决方案要么面向开发者提供高度可定制化，要么面向内容编辑者非常友好，Studio 希望兼顾二者。

**开发者提供工具，使编辑者专注内容，无需任何技术知识。**

::tip
我们的类 Notion 编辑器前景广阔，期待与社区共同发展。
::

###