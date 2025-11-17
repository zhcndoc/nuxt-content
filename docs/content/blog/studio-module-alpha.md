---
title: Nuxt Studio Alpha 版本发布
authors:
  - name: Baptiste Leproux
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
    to: https://x.com/_larbish
    username: larbish
  - name: Ahad Birang
    avatar:
      src: https://avatars.githubusercontent.com/u/2047945?v=4
    to: https://x.com/farnabaz
    username: farnabaz
  - name: Sébastien Chopin
    avatar:
      src: https://avatars.githubusercontent.com/u/904724?v=4
    to: https://x.com/atinux
    username: atinux
category: Release
date: 2025-11-04T00:00:00.000Z
description: 推出 Nuxt Studio 的第一个 alpha 版本，作为一个免费开源的 Nuxt 模块。通过 GitHub 集成和实时预览，在生产环境中编辑你的内容。
draft: false
image:
  src: /blog/nuxt-studio-module-alpha.png
  alt: Nuxt Studio Alpha 版本发布
---

当 NuxtLabs 加入 Vercel 时，我们承诺将 [nuxt.studio](https://nuxt.studio) 从一个托管平台转变为一个免费开源的模块。今天，我们很高兴宣布 Nuxt Studio 模块的**第一个 alpha 版本**发布。

::u-button{to="https://github.com/nuxt-content/studio" icon="i-simple-icons-github" target="_blank" color="neutral" variant="subtle"}
在 GitHub 上发现 Nuxt Studio 模块。
::

您现在可以直接在生产环境中启用内容编辑，配合实时预览和 GitHub 集成，全部在您自己的 Nuxt 应用内完成。

:video{controls loop src="https://res.cloudinary.com/nuxt/video/upload/v1733494722/contentv3final_rc8bvu.mp4"}

::u-button{to="/admin?redirect=/blog/studio-module-alpha" icon="i-lucide-mouse-pointer-click" external color="neutral" class="mt-4"}
试着编辑这页内容
::

## 🏠 从托管平台到自托管模块

没有 Vercel 的支持，这一里程碑是不可能实现的。他们的支持使我们能够投入资源将 Studio 重构为一个开源模块。

### 有什么不同？

Studio 最初作为托管平台提供，位于 [nuxt.studio](https://nuxt.studio)，现在变成了一个免费的开源 Nuxt 模块，可与您的 Nuxt Content 网站一起部署。

这意味着内容编辑者可以直接在生产环境的自己网站上管理和更新内容，无需本地开发工具或 Git 知识。

- **自托管** — 完全运行在您的基础设施中，和 Nuxt 应用一起
- **无外部依赖** — 不依赖任何 API 或第三方服务
- **免费开源** — 在 MIT 许可证下发布
- **直接集成** — 只需一个简单的 GitHub OAuth 应用即可开始使用

唯一的权衡是 Studio 现在需要一个服务器端路由来做身份验证。尽管 [Nuxt 混合渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering#hybrid-rendering) 仍支持静态生成，但您的站点必须部署在支持 SSR 的平台。

## 📦 Alpha 版本内容

Alpha 版本侧重于 **核心基础设施和稳定性**，避免引入可视化编辑器可能带来的任何漏洞。我们使用 Monaco 编辑器来确保所有文件操作和 GitHub 工作流的稳健性，然后再引入可视化编辑功能。

**Monaco 代码编辑器** → 拥有 Markdown、YAML 和 JSON 语法高亮的 IDE 编辑体验，支持完整的 MDC 语法，带冲突的分屏差异查看器。

**文件操作** → 针对您的 `content/` 目录提供完整的增删改查操作。创建、编辑、删除、重命名和移动文件，内置草稿管理。

**媒体管理** → 集中管理 `public/` 目录中的资源，支持上传、整理、预览和集成。

**Git 集成** → 通过 OAuth 直接向 GitHub 提交，支持冲突检测、作者归属和自定义提交信息。

**实时预览** → 在生产网站上实时预览草稿更改，支持即时更新和并排编辑。

## 🗺️ 未来规划

### Beta 版本 `2025 年第 4 季度`

以我们在 [nuxt.studio](https://nuxt.studio) 上打造的内容为灵感，Beta 阶段将引入开源可视化编辑器，使 Studio 对非技术用户更友好：

- **Markdown 编辑器** — 类似 Notion 的 Markdown 体验
- **基于表单的编辑** — 针对 Markdown frontmatter、YAML 和 JSON 文件的模式表单
- **Vue 组件编辑** — 可视化界面编辑组件的属性和插槽
- **Google OAuth** — 为非 GitHub 用户提供的认证方式

### 稳定版本 `2025 年底`

生产就绪功能、性能优化和稳定性增强。

::warning
年底时，托管平台将关闭，模块将成为编辑 Nuxt Content 网站的唯一方式。
::

### 2026 年及以后

AI 驱动的内容建议、更多 Git 提供商支持和社区驱动的功能。

## 🗄️ 存储架构

Studio 使用三层存储架构以保持内容在浏览器和 GitHub 之间同步。

### 生产数据库 `SQLite WASM`

当您的 Nuxt Content 网站加载时，Nuxt Content v3 会从服务器下载一个 SQLite 数据库快照，并初始化包含您已部署分支全部内容的本地 WASM 数据库。该数据库保持与 GitHub 同步，只要您最后一次部署成功。这是 Studio 编辑内容时更新的生产数据库。

### 草稿存储 `IndexedDB`

Studio 使用基于 IndexedDB 的 [unstorage](https://unstorage.unjs.io/) 维护一个独立草稿层。当您编辑内容时，更改会以草稿形式保存在您的浏览器本地。每次 Studio 加载时，这些草稿会与 SQLite 数据库合并，以渲染生产网站的草稿版本。

::note
草稿仅保存在您的浏览器中，不会在编辑者或设备间共享。
::

### GitHub 仓库 `API 集成`

当您发布时，Studio 通过 GitHub API 直接将草稿更改提交到 GitHub。之后 CI/CD 流水线会自动重新构建并重新部署网站。部署完成后，您需要刷新页面以用最新内容更新浏览器数据库。

## 🔄 同步流程

### 初次加载

::prose-steps{level="4"}
#### 数据库初始化

Nuxt Content 下载构建过程中生成的 SQLite 数据库快照。 :br
此文件包含 `content/` 目录中所有已解析的内容。

#### 草稿恢复

Studio 检查 IndexedDB 中之前会话中存在的草稿，并将其加载到 SQLite 数据库中。

#### 预览

Studio 刷新网站预览，您可以直接在生产网站上查看最新的草稿和编辑内容。
::

### 编辑内容

::prose-steps{level="4"}
#### 草稿修改

更改立即保存到 IndexedDB 作为草稿，状态包括 `created`、`modified` 或 `deleted`。

#### 数据库更新

本地 SQLite 数据库更新以包含草稿内容，实现即时视觉预览。

#### 冲突检测

Studio 将您的草稿内容与 GitHub 上的最新版本进行比对以检测可能的冲突。

  :::note
  **冲突可能发生在：**
  
  :br
  
  - 其他人推送了修改同一文件的提交且该版本正在构建中。
  - 部署失败或未完成，导致生产环境内容落后且与 GitHub 不同步。
  :::
::

### 发布更改

::prose-steps{level="4"}
#### 草稿收集

Studio 汇总所有包含更改的草稿项。

#### GitHub 提交

通过 GitHub API，Studio 创建包含所有更新文件的新提交。

#### 触发部署

您的 CI/CD 平台检测到提交后，自动重新构建并重新部署网站。

#### 等待部署

发布后，Studio 清除本地草稿并等待部署完成。 :br
此期间显示加载状态，生产 SQLite 数据库同步至最新提交。

  :::warning
  在提交部署完成之前，Studio 处于等待状态，生产数据库尚未更新。
  :::
::

## 🚀 立即开始

安装模块并配置您的 GitHub OAuth 应用，开始在生产环境中编辑内容：

```bash
npx nuxi module add nuxt-studio@alpha
```

查看 [安装指南](/docs/studio/setup) 以获取完整的安装和配置说明。

---

我们期待看到您使用 Nuxt Studio 构建的作品。加入 [GitHub Discussions](https://github.com/nuxt-content/studio/discussions) 讨论或 [加入我们的 Discord](https://discord.gg/sBXDm6e8SP)，共同塑造模块的未来。
