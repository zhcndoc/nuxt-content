# 全文搜索

> 使用 Nuxt Content 实现网站全文搜索

Content 模块提供了一个便捷的工具 [`queryCollectionSearchSections`](/docs/utils/query-collection-search-sections)，用于将内容文件拆分成可搜索的章节。这对于在网站中实现全文搜索非常有用。你可以将该工具的结果与 [Nuxt UI Content Search](https://ui.nuxt.com/pro/components/content-search) 或其他搜索库如 [Fuse.js](https://fusejs.io/)、[minisearch](https://lucaong.github.io/minisearch) 等结合使用。

## Nuxt UI

Nuxt UI 提供了一个现成的全文搜索组件。你可以将 `queryCollectionSearchSections` 的结果传递给该组件的 `files` 属性来使用。

详细阅读 [Nuxt UI Content Search](https://ui.nuxt.com/pro/components/content-search)。

<code-group>

```vue [UContentSearchExample.vue]
<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('docs'))

const searchTerm = ref('')
</script>

<template>
  <UContentSearch
    v-model:search-term="searchTerm"
    :files="files"
    :navigation="navigation"
    :fuse="{ resultLimit: 42 }"
  />
</template>
```

<code-preview icon="i-lucide-eye" label="实时预览">
<example-fulltext-content-search>



</example-fulltext-content-search>
</code-preview>
</code-group>

## MiniSearch 示例

详细阅读 [minisearch](https://lucaong.github.io/minisearch)。

<code-group>

```vue [MiniSearchExample.vue]
<script setup lang="ts">
import MiniSearch from 'minisearch'

const query = ref('')
const { data } = await useAsyncData('search', () => queryCollectionSearchSections('docs'))

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

// 将数据添加到 MiniSearch 实例中
miniSearch.addAll(toValue(data.value))
const result = computed(() => miniSearch.search(toValue(query)))
</script>

<template>
  <UContainer class="p-4">
    <UCard>
      <UInput v-model="query" placeholder="搜索..." />
      <ul>
        <li v-for="link of result" :key="link.id" class="mt-2">
          <NuxtLink :to="link.id">{{ link.title }}</NuxtLink>
          <p class="text-gray-500 text-xs">{{ link.content }}</p>
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>
```

<code-preview icon="i-lucide-eye" label="实时预览">
<example-fulltext-mini-search>



</example-fulltext-mini-search>
</code-preview>
</code-group>

## Fuse.js 示例

详细阅读 [Fuse.js](https://fusejs.io)。

<code-group>

```vue [FusejsExample.vue]
<script setup lang="ts">
import Fuse from 'fuse.js'

const query = ref('')
const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('docs'))

const fuse = new Fuse(data.value, {
  keys: ['title', 'description']
})

const result = computed(() => fuse.search(toValue(query)).slice(0, 10))
</script>

<template>
  <UContainer class="p-4">
    <UCard>
      <UInput v-model="query" placeholder="搜索..." class="w-full" />
      <ul>
        <li v-for="link of result" :key="link.item.id" class="mt-2">
          <UButton variant="ghost" class="w-full" :to="link.item.id">
            {{ link.item.title }}
            <span class="text-gray-500 text-xs">
              {{ link.item.content?.slice(0, 100) }}...
            </span>
          </UButton>
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>
```

<code-preview icon="i-lucide-eye" label="实时预览">
<example-fulltext-fusejs>



</example-fulltext-fusejs>
</code-preview>
</code-group>
