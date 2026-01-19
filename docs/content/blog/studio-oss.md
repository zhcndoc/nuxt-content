---
title: Nuxt Studio 现已免费并开源
description: 我们正式发布了 Nuxt Studio，作为一个免费、开源、自托管的模块。传统的 nuxt.studio 平台即将关闭，现在成为官方文档。你的内容编辑体验将继续，并且由你自主掌控。
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
categories: []
category: release
date: 2026-01-05
draft: false
image:
  src: /blog/Nuxt-Studio-is-Dead.png
  alt: Nuxt Studio 官方发布图
seo:
  title: Nuxt Studio 现已免费并开源
  description: 我们正式发布了 Nuxt Studio，作为一个免费、开源、自托管的模块。传统的 nuxt.studio 平台即将关闭。你的内容编辑体验将继续，并且由你自主掌控。
---

**Nuxt Studio 已死，Nuxt Studio 万岁。**

我们承诺将在 2025 年底前发布，如今我们兑现了承诺：我们正式发布了首个稳定版本的 Nuxt Studio，作为一个**免费、开源的 Nuxt 模块**。同时，我们正在逐步关闭传统的 [nuxt.studio](https://nuxt.studio) 平台，它现已成为新的官方文档。

::u-button
---
color: neutral
icon: i-simple-icons-github
target: _blank
to: https://github.com/nuxt-content/nuxt-studio
variant: outline
---
在 GitHub 上了解 Nuxt Studio 模块。
::

## 🌄 为什么我们要关闭 [nuxt.studio](https://nuxt.studio)

当 NuxtLabs 加入 Vercel 时，我们承诺让我们的高级产品免费并开源。我们已经对 [Nuxt UI](https://ui.nuxt.com) 采取了相同方式，并很快应用到 [NuxtHub](https://hub.nuxt.com)。

对我们来说，这意味着一切。这是一个完全专注于构建**免费、开源且人人可用**的工具的机会。

这也是 Studio 平台即将停用的原因。

## 🚀 认识新的 Studio 模块

我们从头重建了 Studio，作为一个 Nuxt 模块。结果是一个完全自托管的内容管理解决方案，与您的 Nuxt Content 网站配合运行。

### 有哪些不同？

- **自托管** — 完全在你的基础设施上，与 Nuxt 应用一起运行
- **免费开源** — 采用 MIT 许可证发布
- **开发集成** — 支持开发模式下使用

## 📦 功能

此稳定版本包含你在生产环境中编辑内容所需的一切：

### TipTap 可视化编辑器

基于 [TipTap](https://tiptap.dev/) 并通过 [Nuxt UI Editor](https://ui.nuxt.com/pro/components/editor) 组件集成，带来更现代的类 Notion Markdown 内容编辑体验：

- 富文本编辑，支持标题、格式、链接等
- 支持 MDC 组件以插入 Vue 组件
- Vue 组件属性编辑器，支持可视属性编辑
- 拖放操作支持内容块重新排序
- 斜杠命令快速访问格式选项
- 内容和 MDC 语法实时转换

### 基于表单的编辑器

基于你的[集合定义](/docs/collections/define)自动生成结构化表单：

- 自动为 Frontmatter、YAML 和 JSON 文件生成表单
- 自定义媒体和图标选择输入组件
- 原生类型映射（字符串 → 文本，布尔 → 开关，枚举 → 选择）
- 支持数组和对象

### 文件操作

对你的 `content/` 目录进行完整的增删改查：创建、编辑、删除、重命名和移动文件，并内置草稿管理。

### 媒体管理

集中管理 `public/` 目录内的资产，支持上传、组织及预览。

### Git 集成

可直接提交到 GitHub 或 GitLab，支持冲突检测、作者归属和自定义提交信息。

### 实时预览

在生产网站上实时预览草稿更改，支持即时更新和并排编辑。

### 多语言支持

Studio 界面支持包括英语、法语、德语、西班牙语、日语、中文等 17 种语言。

### 认证选项

多种认证提供者：GitHub OAuth、GitLab OAuth、Google OAuth，或基于自定义流程的认证。

## 📦 快速开始

使用 Nuxt CLI 安装该模块：

```bash [Terminal]
npx nuxt module add nuxt-studio
```

本地开始编辑或配置你的仓库以用于生产环境：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    repository: {
      provider: 'github',
      owner: 'your-username',
      repo: 'your-repo',
      branch: 'main'
    }
  }
})
```

::tip{to="https://nuxt.studio/setup"}
请参考完整的安装指南以获取详细设置说明。
::

## 📅 关闭时间表

::prose-steps
### 现在

你已经可以迁移到新模块。所有现有订阅已被取消。

### 2026

传统的 nuxt.studio 平台将成为新的官方文档，我们将日复一日持续改进该模块。
::

::note
[nuxt.studio](http://nuxt.studio) 平台始终只是一个编辑层。你的内容存储在你的 Git 仓库中，你完全掌控。平台关闭不会对你部署的网站或其行为产生任何影响。
::

## 🔄 迁移指南

迁移非常简单：

1. **安装模块**：参见[安装文档](https://nuxt.studio/setup)
2. **配置认证**：设置 [GitHub](https://nuxt.studio/git-providers#github)、[GitLab](https://nuxt.studio/git-providers#gitlab) 或 [Google OAuth](https://nuxt.studio/auth-providers#google)
3. **移除旧代码**：Nuxt Content 的未来版本将自动移除所有旧的 Studio 相关代码，你也可以现在将 Nuxt Content 配置中的 `preview` 键移除。

## 🗺 未来规划

我们致力于让这款开源模块体验更佳。2026 年将推出：

- **AI 内容生成** — 智能内容建议与辅助
- **TipTap 扩展开放** — 我们将开放已构建的 (与 MDC 语法相关的) TipTap 扩展，方便你在 [Nuxt UI Editor](https://ui.nuxt.com/docs/components/editor) 中使用
- **社区驱动特性** — 根据你的反馈进行改进

## 🙏 感谢

你的反馈塑造了旧版与新版 Studio。你的支持促成了这次转变。

感谢 Vercel，推动了开源的实现。

我们期待看到你用新的 Nuxt Studio 模块构建出精彩作品。加入 [GitHub 讨论](https://github.com/nuxt-content/nuxt-studio/discussions) 或者 [加入我们的 Discord](https://discord.gg/sBXDm6e8SP)，共同塑造内容编辑的未来。

---

如果你在迁移时需要帮助，请在我们的 [Discord 服务器](https://discord.gg/sBXDm6e8SP) 联系我们。
