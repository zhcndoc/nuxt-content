# 迁移

> 如何从 v2 迁移到 v3

Nuxt Content v3 已经从头重建，带来了一个具有增强功能的新库。虽然我们设计了与 Content v2 类似的概念和组件，但破坏性变更是不可避免的。

别担心，你不需要修改你的内容文件。我们确保 Content v3 以与 Content v2 相同的方式处理内容。

## 变更

### Vue 工具

- `queryContent()` API 被新的 `queryCollection()` 替代

<prose-tip>

新 API 基于 SQL，内容查询发生在特定的集合中。

</prose-tip>

- `fetchContentNavigation()` API 被新的 `queryCollectionNavigation()` 替代
- Surroundings （周边）现在有自己的独立 API：`queryCollectionItemSurroundings()`
- 放弃了文档驱动模式：`Markdown` 文件将不再自动转换为 Nuxt 页面，你需要自己创建页面，[查看此部分了解如何创建](/docs/components/content-renderer#example-usage)。
- 移除 `useContent()` 组合函数
- `searchContent()` 被新的 `queryCollectionSearchSections` API 取代
- 可以方便地使用 `queryCollectionSearchSections` API 实现全文搜索，[查看此部分了解如何使用](/docs/advanced/fulltext-search)

### 组件

- 所有内容应使用 `<ContentRenderer>` 组件渲染。`<ContentDoc>`、`<ContentList>`、`<ContentNavigation>` 和 `<ContentQuery>` 组件在 v3 中被移除。
- `<ContentSlot>` 和 `<MDCSlot>` 组件在 v3 中不再支持。组件可以直接使用 Vue 原生的 `<slot>` 组件。

<prose-note>

`<ContentSlot>` 和 `<MDCSlot>` 最初用于在渲染前操作内容并移除 slot 内容的包裹段落。此取消包裹行为现在通过 `<slot>` 组件上的 `mdc-unwrap` 属性支持。例如：`<slot mdc-unwrap="p" />`

</prose-note>

- 放置在 `components/content` 目录下的组件不再自动注册为全局组件。如果你使用[动态渲染](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)来渲染这些组件（即在 markdown 文件外部渲染），你必须在 Nuxt 应用中手动注册它们。详细操作请查看 [Nuxt - 自定义组件目录](https://nuxt.com/docs/guide/directory-structure/components#custom-directories)文档。

### 类型

- `import type { NavItem } from '@nuxt/content/dist/runtime/types'` 替换为 `import type { ContentNavigationItem } from '@nuxt/content'`

### 通用

- `_dir.yml` 文件重命名为 `.navigation.yml`
- 模块选项中不再有 source 选项，你需要在 `content.config.ts` 中为你的集合定义[多个源](/docs/collections/sources)。
- 文档中的 `._path` 现在重命名为 `.path`，同样所有带 `_` 前缀的内部字段被移除或重命名。
- 移除 `useContentHelpers()`
- 模块默认不忽略点文件，若需忽略可在集合源的 `exclude` 选项中添加 `ignore: ['**/.*']`。
- 由于 SQL 限制，排序现在使用字母顺序而非数字顺序。更多信息请查看[文件排序](/docs/collections/types#ordering-files)部分。
- 模块选项相较 v2 有所更改，详情请查看[配置页面](/docs/getting-started/configuration)。

### Nuxt Studio 集成

- [studio 模块](https://nuxt.studio) 已被弃用，新的通用 `Preview API` 已直接集成到 Nuxt Content 中，可从依赖和 `nuxt.config.ts` 的模块中移除 `@nuxthq/studio` 包。只需在 Nuxt 配置文件中启用预览模式并绑定 Studio API。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
})
```

- 为了让 [app 配置文件](/docs/studio/config)能够在 Studio 中保持可更新，只需将 `nuxt.schema.ts` 文件中的辅助函数导入从 `@nuxthq/studio/theme` 更新为 `@nuxt/content/preview`。

## 在 v3 实现文档驱动模式

在 Content v3 中实现文档驱动模式非常简单。你只需在 Nuxt 中创建一个通配页面，并基于路由路径获取内容。

```vue [pages/[...slug].vue]
<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <div>
    <header><!-- ... --></header>

    <ContentRenderer v-if="page" :value="page" />

    <footer><!-- ... --></footer>
  </div>
</template>
```

## 将 `queryContent` 转换为 `queryCollections`

如上所述，`queryContent` 被基于新的集合的 `queryCollection` 取代。两者主要有两个区别：

1. `queryCollection` 构建的是 SQL 数据库的查询。
2. `queryCollection` 只在指定的集合内搜索。你需要知道集合的名称（配置中的键名）。

```ts [根据路径查找内容]
// Content v2
const v2Query = await queryContent(route.path).findOne()
// Content v3 - 不要忘记在 `content.config.ts` 中创建 `content` 集合
const v3Query = await queryCollection('content').path(route.path).first()
```

```ts [使用自定义过滤器查找内容]
// Content v2
const v2Query = await queryContent()
  .where({ path: /^\/hello\/.*/ })
  .find()
// Content v3 - 不要忘记在 `content.config.ts` 中创建 `content` 集合
const v3Query = await queryCollection('content')
  .where('path', 'LIKE', '/hello%')
  .first()
```

<prose-note to="/docs/collections/define">

查看专门关于集合的章节以获取更多信息

</prose-note>

## 转换 `queryContent().findSurround()`

Surround 现在有了自己独立的 API。

```ts
const targetPath = '/docs'

// Content v2
const v2Surround = await queryContent(targetPath)
  .only(['title', 'description', 'navigation'])
  .findSurround(withoutTrailingSlash(route.path))

// Content v3 - 不要忘记在 `content.config.ts` 中创建 `content` 集合
const v3Surround = await queryCollectionItemSurroundings(
  'content',
  targetPath,
  {
    fields: ['title', 'description', 'navigation']
  }
)
```

<prose-note>

查看专门章节以获取更多关于 Surround 的信息

</prose-note>

## 合并 `ProsePre`、`ProseCode` 和 `ProseCodeInline` 组件

许多 `ProsePre` 组件是 `ProseCode` 组件的轻量包装。我们将这三个组件整合成两个组件。现在 `ProsePre` 与多行代码块没有区别。

1. MDC 现在会将单个反引号 ``` 映射并解析为 `ProseCode`，而非 `ProseCodeInline`。
2. MDC 现在会将以三个反引号 ````` 开始的代码块映射并解析为 `ProsePre` 组件。

**建议更改：**

1. 将现有的 `ProseCode` 逻辑迁移到 `ProsePre`
2. 将你的 `ProseCodeInline` 组件重命名为 `ProseCode`

## `_dir.yml` 文件重命名为 `.navigation.yml`

在 Content v3 中，我们将 `_dir.yml` 重命名为 `.navigation.yml`，该新名称更好地反映了这些文件的作用。<br />


模块使用这些文件收集目录信息以生成导航。

请注意，为了让模块能访问这些文件，你应该以包含这些文件的方式定义你的集合源，例如使用 `source: '**'` 或 `source: '**/*.{md|yml}'` 会包含这些文件，而 `source: '**/*.md'` 则不会。

## 忽略点文件

默认情况下，Content v3 不忽略点文件。如果你想忽略它们，可以在集合源的 `exclude` 选项中添加 `ignore: ['**/.*']`。

```ts
defineCollection({
  source: {
    include: '**',
    exclude: ['**/.*']
  }
})
```

注意，上述模式也会从集合中排除 `.navigation.yml` 文件。如果你使用 `.navigation.yml` 并希望保留它们，可以使用 `**/.(!(navigation.yml))` 模式来排除所有点文件但保留 `.navigation.yml`。

```ts
defineCollection({
  source: {
    include: '**',
    exclude: ['**/.!(navigation.yml)']
  }
})
```
