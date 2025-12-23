# 路线图

> 跟踪 Nuxt Studio 的开发进度，发现未来版本计划推出的功能。

此路线图概述了自托管 Nuxt Studio 模块的开发阶段。我们致力于构建一个强大的开源内容管理系统，专为 Nuxt Content 网站打造。

<prose-note>

此路线图可能会根据社区反馈和优先级调整而变化。欢迎加入 [GitHub 讨论区](https://github.com/nuxt-content/studio/discussions) 或 [加入 Discord](https://discord.gg/sBXDm6e8SP) 一起助力 Nuxt Studio 的未来发展。

</prose-note>

## 当前状态：Beta 发布

<badge>

v1.0.0-beta - 当前版本

</badge>

Beta 版本专注于核心功能和稳定性。Beta 现包含 TipTap 可视化编辑器（默认）、Monaco 代码编辑器以及用于 YAML/JSON 文件和 Frontmatter 的新表单编辑器，提供针对所有内容类型支持 MDC 组件的完整编辑体验。

## 发布阶段

### ✅ 第一阶段 - Alpha

**重点**：核心基础设施、文件操作和 GitHub 集成

<prose-steps level="4">

#### 内容编辑器

专业编辑体验，包含 TipTap 可视化编辑器（默认）、Monaco 代码编辑器和表单编辑器。

#### 表单编辑器

基于架构的表单，用于编辑 Markdown 文件中的 Frontmatter、YAML 和 JSON 文件。

#### 文件操作

对 `content/` 目录下的内容文件支持完整的增删查改操作。

#### 媒体管理

集中式媒体库，管理 `public/` 目录的资源，支持 AVIF 格式。

#### Git 集成

直接向 GitHub 提交，具备完整版本控制功能。

#### 实时预览

在生产网站上实时预览变更内容。

#### 国际化 (i18n)

支持 Studio 界面的多语言（16 种语言：阿拉伯语、保加利亚语、德语、英语、西班牙语、波斯语、芬兰语、法语、印尼语、意大利语、日语、荷兰语、波兰语、巴西葡萄牙语、乌克兰语、中文）。

#### GitLab 集成

支持 GitLab 作为 Git 提供商，除 GitHub 外的另一选择。

#### 开发模式

支持本地开发，无需身份验证。

#### Google OAuth 认证

为非 GitHub 用户提供另一认证方式。

</prose-steps>

### 🚧 第二阶段 - Beta <badge>当前</badge>

**重点**：高级组件管理

Beta 阶段将引入增强的组件编辑能力。

<prose-steps level="4">

#### Vue 组件属性编辑器

用于编辑 Vue 组件属性的可视化界面。

**状态：** 🚧 开发中

#### 自定义 OAuth

提供工具供用户自行处理认证。

**状态：** 🚧 开发中

</prose-steps>

### 🔮 第三阶段 - 稳定版发布

**重点**：生产环境准备及高级功能

**目标发布时间**：2025 年底

稳定版将包括性能优化及适合生产环境的功能。

### 🌟 第四阶段 - 高级功能（未来）

**重点**：AI 集成、集合视图及社区功能

**目标发布时间**：2026 年

长期愿景为拓展 Studio 功能并整合 AI 驱动的内容推荐。
