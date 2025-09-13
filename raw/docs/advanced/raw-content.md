# 原始内容

> 访问应用中的内容原始数据

在内容版本 2 中，有很多关于在生产环境访问内容原始数据的请求。在内容版本 3 中，可以将内容原始数据传递到生产环境。

为了将原始内容传递到生产环境，您需要在集合的 schema 中定义 `rawbody` 字段。就是这么简单。

Nuxt Content 会检测到 schema 中这个神奇的字段，并用原始内容填充它。

```ts [content.config.ts]
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: '**',
      type: 'page',
      schema: z.object({
        rawbody: z.string()
      })
    })
  }
})
```

您可以使用 `queryCollection()` 来获取原始内容。

```vue [pages/index.vue]
<script setup lang="ts">
const route = useRoute()
const { data } = useAsyncData('page-' + route.path, () => queryCollection('docs').path(route.path).first())
</script>

<template>
  <pre>{{ data.rawbody }}</pre>
</template>
```

如果您不想传递某个文件的原始内容，可以在该文件的 frontmatter 中添加 `rawbody: ''`。`rawbody` 的自动填充值就像一个默认值，当您在 frontmatter 中定义了 `rawbody` 时，会覆盖自动填写的值。

```md [content.md]
---
title: 我的页面
rawbody: ''
---
```

<callout>

重要的是要确保 frontmatter 字段的数据类型与集合 schema 中定义的类型相同。在本例中，`rawbody` 是字符串类型，您应考虑传递空字符串。请勿使用布尔值或其他类型的值。

</callout>
