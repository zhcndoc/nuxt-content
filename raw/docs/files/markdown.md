# Markdown

> 在你的 Nuxt 应用中创建和查询 Markdown 文件，并使用 MDC 语法集成 Vue 组件。

## 用法

### 定义集合

```ts [content.config.ts]
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string()
      })
    })
  }
})
```

<note to="/docs/collections/types#page-type">

了解更多关于 `page` 集合类型。

</note>

### 创建 `.md` 文件

在 `content/blog/` 目录中创建博客文章。

<code-group>

```md [foo.md]
---
date: 2020-11-11
---

# Foo

这是 Foo 博客文章。
```

```md [bar.md]
---
date: 2024-12-12
---
Hello
我是 bar。很高兴认识你。
```

</code-group>

### 查询 Markdown 文件

现在我们可以查询博客文章：

```ts
// 获取 foo 文章
const fooPost = await queryCollection('blog').path('/blog/foo').first()

// 查找所有文章
const allPosts = await queryCollection('blog').order('date', 'DESC').all()
```

### 显示 Markdown

要显示 Markdown 文件的内容，可以使用 [`<ContentRenderer>`](/docs/components/content-renderer) 组件。

```vue [blog/[slug].vue]
<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})
</script>

<template>
  <!-- 以 Prose 和 Vue 组件渲染博客文章 -->
  <ContentRenderer :value="post" />
</template>
```

<note>

阅读更多关于 [`<ContentRenderer>`](/docs/components/content-renderer) 组件和 [`Prose 组件`](/docs/components/prose)。

</note>

## Frontmatter

Frontmatter 是基于 Markdown 的 CMS 约定，用于为页面提供元数据，如描述或标题。在 Nuxt Content 中，frontmatter 使用 YAML 语法，采用 `key: value` 键值对形式。

这些数据在渲染内容时可用，可以存储你需要的任何信息。

### 语法

你可以在 `content/` 目录的 Markdown 文件顶部，用 `---` 标识符声明 frontmatter 块。

```md [content/index.md]
---
title: '页面标题'
description: '页面的元描述'
---

<!-- 页面内容 -->
```

```ts [example.ts]
const home = await queryCollection('content').path('/').first()

console.log(home.title)
// => '页面标题'
console.log(home.description)
// => '页面的元描述'
console.log(home.body)
// => 页面内容的 AST 对象
```

### 原生参数

<table>
<thead>
  <tr>
    <th>
      
    </th>
    
    <th>
      
    </th>
    
    <th>
      
    </th>
    
    <th>
      
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      键
    </td>
    
    <td>
      类型
    </td>
    
    <td>
      默认值
    </td>
    
    <td>
      描述
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        title
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      页面第一个 <code>
        <h1>
      </code>
    </td>
    
    <td>
      页面标题，也会被注入到元信息 (metas) 中
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      页面第一个 <code>
        <p>
      </code>
    </td>
    
    <td>
      页面描述，将显示在标题下方并注入到元信息 (metas)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        navigation
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      定义页面是否包含在 <a href="/docs/utils/query-collection-navigation">
        <code>
          queryCollectionNavigation
        </code>
      </a>
      
       的返回值中。
    </td>
  </tr>
</tbody>
</table>

<warning>

frontmatter 块中定义的额外参数需要在你的 schema 中定义（参见本页顶部示例中的 date 参数），才能用于查询。

</warning>

## MDC 语法

我们创建了 MDC 语法来增强 Markdown，赋予你在 Markdown 中集成带有插槽和属性的 Vue 组件的能力。

<callout icon="i-simple-icons-visualstudiocode" to="https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc">

安装 **MDC VS Code 扩展**，以获得 MDC 语法的正确语法高亮。

</callout>

### Vue 组件

你可以在 Markdown 文件中使用任意 Vue 组件。

我们有一种特殊语法，使在 Markdown 文件中使用组件更方便。

```mdc [content/index.md]
::component-name
默认插槽内容
::
```

<warning>

若你不使用 `components/content/` 目录，Markdown 中使用的组件必须在你的 Nuxt 应用中标记为 `global`，详情请访问 [Nuxt 3 文档](https://nuxt.com/docs/guide/directory-structure/components)。

</warning>

#### 块级组件

块级组件是接受 Markdown 内容或其他组件作为插槽的组件。

组件必须至少包含一个 `<slot />` 组件来接收格式化文本。

在 markdown 文件中，使用 `::` 标识符调用组件。

<code-group>

```mdc [index.md]
::card
卡片的内容
::
```

```html [Card.vue]
<!-- components/content/Card.vue -->
<template>
  <div class="p-2 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <slot />
  </div>
</template>
```

<code-preview label="预览" icon="i-lucide-eye">
<example-card>

卡片的内容

</example-card>
</code-preview>
</code-group>

#### 插槽

组件的插槽可以接受内容或其他组件。

- **默认插槽** 在块级组件内渲染顶级内容或通过 `#default`。
- **具名插槽** 使用 `#` 标识符来渲染对应内容。

<code-group>

```mdc [index.md]
::hero
我的页面标题

#description
这部分将在 `description` 插槽内渲染。
::
```

```html [Hero.vue]
<template>
  <section>
    <h1 class="text-4xl">
      <slot mdc-unwrap="p" />
    </h1>
    <slot name="description" />
  </section>
</template>
```

<code-preview label="预览" icon="i-lucide-eye">
<example-hero>

我的页面标题<template v-slot:description="">

这部分将在 `description` 插槽内渲染。

</template>
</example-hero>
</code-preview>
</code-group>

<note>

阅读更多关于 [`<slot />`](/docs/components/slot) 组件。

</note>

<tip>

你可以在组件插槽内使用 Markdown：

<code-group>

```mdc [index.md]
::my-title
一个由组件 **渲染** 的 [富文本](/)。
::
```

```html [MyTitle.vue]
<template>
  <h1 class="text-4xl">
    <slot mdc-unwrap="p" />
  </h1>
</template>
```

<code-preview label="预览" icon="i-lucide-eye">
<example-title>

一个由组件 **渲染** 的 [富文本](/)。

</example-title>
</code-preview>
</code-group>
</tip>

#### Props 属性

使用 MDC 传递 props 给组件，有两种方式。

##### **行内方式**

`{}` 标识符使用简洁的 `key=value` 语法向组件传递属性。

<code-group>

```mdc [index.md]
::alert{type="warning"}
这是一个 **警告** 组件。
::
```

```vue [Alert.vue]
<script setup>
const props = defineProps({ type: { type: String } })

const alertClass = computed(() => {
  return {
    warning: 'bg-orange-100 border-orange-200 dark:bg-orange-900 dark:border-orange-800',
    info: 'bg-blue-100 border-blue-200 dark:bg-blue-900 dark:border-blue-800',
    success: 'bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-800',
  }[props.type]
})
</script>

<template>
  <div
    class="text-black p-2 border dark:text-white rounded"
    :class="alertClass"
  >
    <slot mdc-unwrap="p" />
  </div>
</template>
```

<code-preview label="预览" icon="i-lucide-eye">
<example-alert type="warning">

这是一个 **警告** 组件。

</example-alert>
</code-preview>
</code-group>

多个属性用空格分隔：

```mdc
::alert{type="warning" icon="exclamation-circle"}
出错了！
::
```

`v-bind` 简写 `:` 也可用来绑定 frontmatter 中的属性值：

```mdc
---
type: "warning"
---

::alert{:type="type"}
你的警告
::
```

如果要传递数组或对象作为属性给组件，可以将它们作为 JSON 字符串，属性键名前加冒号以自动解码 JSON 字符串。注意，这种情况下应使用单引号包裹字符串值，以便使用双引号传递有效的 JSON 字符串：

<code-group>

```mdc [array.md]
::dropdown{:items='["Nuxt", "Vue", "React"]'}
::
```

```mdc [number-array.md]
::dropdown{:items='[1,2,3.5]'}
::
```

```mdc [object.md]
::chart{:options='{"responsive": true, "scales": {"y": {"beginAtZero": true}}}'}
::
```

</code-group>

##### **YAML 方式**

YAML 方式用 `---` 标识符声明逐行一个 prop，便于可读性。

<code-group>

```mdc [index.md]
::icon-card
---
icon: IconNuxt
description: 发挥 Nuxt 及其生态系统的全部力量。
title: Nuxt 架构。
---
::
```

```html [IconCard.vue]
<script setup>
defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  description: {
    type: String,
    default: '默认描述'
  },
  icon: {
    type: String,
    default: 'IconMarkdown'
  }
})
</script>

<template>
  <div class="p-6 border bg-white dark:bg-black dark:border-gray-700 rounded">
    <component :is="icon" class="w-20 h-20" />
    <h2 class="text-3xl font-semibold mb-2">
      {{ title }}
    </h2>
    <p>{{ description }}</p>
  </div>
</template>
```

<code-preview label="预览" icon="i-lucide-eye">
<example-icon-card description="发挥 Nuxt 及其生态系统的全部力量。" icon="i-simple-icons-nuxtdotjs" title="Nuxt 架构。">



</example-icon-card>
</code-preview>
</code-group>

### 属性 (Attributes)

属性对于高亮和修改段落部分内容很有用。语法与行内组件和 Markdown 链接语法非常相似。

可能的值包括所有命名属性、以 `.class-name` 形式的类名，以及以 `#id-name` 形式的 ID。

<code-group>

```mdc [index.md]
Hello [World]{style="color: green;" .custom-class #custom-id}!
```

<code-preview label="预览" icon="i-lucide-eye">

Hello <span className="custom-class" id="custom-id" style="color: green;">

World

</span>

 !

</code-preview>
</code-group>

除了 mdc 组件和 `span`，属性语法还适用于图像、链接、内联 `code`、**粗体** 和 _斜体_ 文本。

<code-group>

```md [index.md]
属性适用于：

- [链接](#attributes){style="background-color: green;"}, `代码`{style="color: cyan;"},
- _斜体_{style="background-color: yellow; color:black;"} 和 **加粗**{style="background-color: lightgreen;"} 文本。
```

<code-preview label="预览" :prose="true" prose="">

属性适用于：

- [链接](#attributes), `代码`,
- *斜体* 和 **加粗** 文本。

</code-preview>
</code-group>

### 绑定数据

你可以使用 `{{ $doc.variable || 'defaultValue' }}` 语法在 Markdown 文档中绑定数据。这些值可以在文档顶部的 YAML frontmatter 中定义，在每个 MDC 组件内定义，或通过 `<ContentRenderer>` 组件的 `data` 属性注入。

#### 在 YAML 中定义

```mdc
---
title: '页面标题'
description: '页面元描述'
customVariable: '自定义值'
---

# 标题是 {{ $doc.title }} ，customVariable 是 {{ $doc.customVariable || 'defaultValue' }}
```

#### 在外部定义 `<ContentRenderer>`

```html [test.vue]
<template>
  <div>
    <ContentRenderer :value="data" :data="mdcVars"/>
    <button type="button" v-on:click="mdcVars.name = 'Hugo'">更改名称</button>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content').path('/test').first());
const mdcVars = ref({ name: 'Maxime'});
</script>
```

```mdc [test.md]
# 你好 {{ $doc.name || '世界' }}
```

## Prose 组件

在 Nuxt Content 中，prose 表示由 Markdown 语法生成的 HTML 标签，如标题和链接。

每个 HTML 标签对应一个 Vue 组件，你可以根据需求覆盖它们，例如 `<p>` 对应 `<ProseP>`。

如果想定制 Prose 组件，建议的步骤如下：

- 查看原始的 [组件源码](https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose)。
- 使用完全相同的 props。
- 在你的 `components/content/` 目录下，命名相同文件。
- 根据需要定制 🚀。

<note to="/docs/components/prose">

请阅读 Prose 组件章节，获取完整的 Prose 参考。

</note>

## 代码高亮

Nuxt Content 使用 [Shiki](https://github.com/shikijs/shiki) 实现代码高亮，主题与 VSCode 一致。

代码高亮同时适用于 [`ProsePre`](/docs/components/prose#prosepre) 和 [`ProseCode`](/docs/components/prose#prosecodeinline)。

代码块的每一行数字存储在 `line` 属性中，便于单行标注与样式定制。

<callout>

[阅读 API 参考，了解如何配置或完全禁用语法高亮。](/docs/getting-started/configuration)

</callout>

## 图片

你可以将图片添加到你的 `public` 目录：

```bash [目录结构]
content/
  index.md
public/
  image.png
nuxt.config.ts
package.json
```

然后在 `content` 目录的 markdown 文件中这样使用：

```md [content/index.md]
![我的图片](/image.png)
```

## 摘要

内容摘要或概要可以通过使用 `<!--more-->` 作为分隔符从内容中提取。

```md [content/index.md]
---
title: 介绍
---

学习如何使用 `@nuxt/content`。

<!--more-->

更多分割线后的完整内容。
```

描述字段 (description) 会包含摘要内容，除非 frontmatter 中已定义。

如果文本中没有 `<!--more-->` 分隔符，则摘要字段为未定义。

<tip>

如果想使用摘要功能，应在集合 schema 中定义 `excerpt` 字段。

```ts [content.config.ts]
const content = defineCollection({
  type: 'page',
  source: '**',
  schema: z.object({
    excerpt: z.object({
      type: z.string(),
      children: z.any(),
    }),
  }),
})
```

阅读关于 [集合 schema](/docs/collections/define#collection-schema) 的更多内容。

</tip>

示例变量会注入到文档中：

```json
{
  "excerpt": Object,
  "body": Object,
  // ... 其他键
}
```
