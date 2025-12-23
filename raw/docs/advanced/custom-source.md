# 自定义来源

> 定义一个自定义来源以获取数据。

默认情况下，Nuxt Content 提供了一些内置的来源，例如本地文件来源和远程 Github 来源。但是，对于某些情况来说，这些还不够，例如，你想从远程 API 获取数据。这种情况下，你可以定义一个自定义来源来获取数据并在你的集合中使用它。

使用 `defineCollectionSource`，你可以定义一个自定义来源。

```ts
import { defineCollectionSource } from '@nuxt/content'

const hackernewsSource = defineCollectionSource({
  getKeys: () => {
    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(data => data.map((key: string) => `${key}.json`))
  },
  getItem: (key: string) => {
    const id = key.split('.')[0]
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(res => res.json())
  },
})
```

然后你可以在你的集合中使用这个来源。

```ts [content.config.ts]
import { defineContentConfig, defineCollectionSource, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const hackernewsSource = defineCollectionSource({
  getKeys: () => {
    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(data => data.map((key: string) => `${key}.json`))
  },
  getItem: (key: string) => {
    const id = key.split('.')[0]
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(res => res.json())
  },
})

const hackernews = defineCollection({
  type: 'data',
  source: hackernewsSource,
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.string(),
    score: z.number(),
    url: z.string(),
    by: z.string(),
  }),
})

export default defineContentConfig({
  collections: {
    hackernews,
  },
})
```
