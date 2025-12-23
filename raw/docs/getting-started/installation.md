# 安装

> 在你的 Nuxt 应用中开始使用 Nuxt Content v3。

## 安装包

选择你喜欢的包管理器来安装 Nuxt Content v3：

<code-group>

```bash [pnpm]
pnpm add @nuxt/content
```

```bash [yarn]
yarn add @nuxt/content
```

```bash [npm]
npm install @nuxt/content
```

```bash [bun]
bun add @nuxt/content
```

</code-group>

## 注册模块

在你的 `nuxt.config.ts` 文件中添加 Nuxt Content 模块：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/content']
})
```

## 自动安装

使用 `create-nuxt` CLI 创建新 Nuxt 项目时，可以直接从交互式模块选择器中选择 `@nuxt/content`。这将自动为你安装并注册该模块。

<code-group>

```bash [npm]
npm create nuxt <project-name>
```

```bash [yarn]
yarn create nuxt <project-name>
```

```bash [pnpm]
pnpm create nuxt <project-name>
```

```bash [bun]
bun create nuxt <project-name>
```

```bash [deno]
deno -A npm:create-nuxt@latest <project-name>
```

</code-group>

<note color="warning">

当你在 Node.js 中运行项目时，Nuxt Content 会询问你使用哪个数据库连接器。
你可以选择安装 `better-sqlite3` 或 `sqlite3` 包。

<br />

如果你不想安装任何包，可以使用从 Node.js@v22.5.0 或更新版本自带的原生 SQLite。
请查看 [`experimental.nativeSqlite` 配置](/docs/getting-started/configuration#experimentalnativesqlite-deprecated-use-sqliteconnector)。

</note>

## 创建你的第一个集合

在项目根目录创建一个 `content.config.ts` 文件：

```ts [content.config.ts]
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
})
```

该配置创建了一个默认的 `content` 集合，用于处理项目 `content` 文件夹内的所有 Markdown 文件。你可以根据需要自定义集合配置。

<tip>

`type: page` 表示内容文件和网站页面之间是一对一的关系。

</tip>

<note to="/docs/collections/define">

了解更多，请查看我们的 **集合指南**。

</note>

## 创建你的第一个 Markdown 页面

在项目根目录创建 `content/index.md` 文件：

```md [content/index.md]
# 我的第一个页面

这里是一段内容。
```

查看更多关于编写 [Markdown 页面](/docs/files/markdown) 的信息。

## 显示你的页面

创建 `pages/index.vue` 文件并展示页面内容：

```vue [pages/index.vue]
<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>首页未找到</div>
</template>
```

<note icon="i-lucide-info">

如果你在一个新的 Nuxt 项目中安装 Nuxt Content，并且项目中没有 `pages` 目录，你还需要更新 `app.vue` 文件，通过添加 `NuxtPage` 组件来允许渲染页面。（如果你的项目已有页面，则无需此操作。）

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</note>

<tip icon="i-lucide-rocket">

就是这样！你已经创建了你的第一个 Nuxt Content 页面。

</tip>
