# LLM 集成

> 学习如何使用 Nuxt Content 和 Nuxt LLMs 模块生成 AI 准备好的内容文件。

Nuxt Content 模块集成了 [`nuxt-llms`](https://github.com/nuxtlabs/nuxt-llms)，用于为大型语言模型 (LLMs) 准备内容。当检测到 `nuxt-llms` 时，Content 模块会自动扩展 LLMs 模块，并将类型为 [page](https://content.nuxt.com/docs/collections/types#page-type) 的集合注入到 LLMs 模块中。🚀

## 设置

<prose-steps>

### 安装所需模块

```bash [terminal]
npm install nuxt-llms
```

### 配置你的 `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/content', 'nuxt-llms'],
  llms: {
    domain: 'https://your-site.com',
    title: '你的站点名称',
    description: '你站点的简要描述',
  },
})
```

</prose-steps>

就是这么简单 🚀 `/llms.txt` 文件会被自动生成并预渲染。

## 分区

在生成内容时，你可以创建自定义分区，将内容处理为适合 LLM 使用的格式。

你可以向 `llms.sections` 数组中添加自定义分区，并为每个分区定义 `contentCollection` 和 `contentFilters` 选项。

<prose-warning>

如果在 `contentCollection` 选项中未定义分区，模块将仅把 [page](https://content.nuxt.com/docs/collections/types#page-type) 集合添加到 LLMs 模块。

</prose-warning>

### `contentCollection`

此选项指定要使用哪个内容集合作为来源。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  llms: {
    sections: [
      {
        title: '文档',
        description: '技术文档和指南',
        contentCollection: 'docs',
       },
    ],
  },
})
```

### `contentFilters`

此选项定义用于选择集合中特定内容的过滤器。

你可以精确控制包含哪些内容。每个过滤器包含：

- `field`：要检查的内容属性
- `operator`：比较运算符（`=`、`<>`、`>`、`<`、`LIKE`、`IN`、`NOT IN`、`IS NULL`、`IS NOT NULL` 等）
- `value`：比较的值

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  llms: {
    sections: [
      {
        title: '文档',
        description: '技术文档和指南',
        contentCollection: 'docs',
        contentFilters: [
            // 只包含 Markdown 文件
            { field: 'extension', operator: '=', value: 'md' },
            // 只包含已发布的内容
            { field: 'draft', operator: '<>', value: true },
            // 按目录过滤
            { field: 'path', operator: 'LIKE', value: '/guide%' },
        ]
      },
    ],
  },
})
```

<tip to="https://github.com/nuxtlabs/nuxt-llms">

查看 nuxt-llms 文档以获取有关该模块的更多信息。

</tip>
