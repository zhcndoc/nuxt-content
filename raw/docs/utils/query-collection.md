# queryCollection

> queryCollection 组合函数提供用于查询和获取集合内容的方法。

## 用法

使用自动导入的 `queryCollection` 来查找集合中的内容。这里假设你已在 `content.config.ts` 中定义了 `docs` 集合。

如果你还未定义任何集合，请查看 [如何定义集合](/docs/collections/define#defining-collections)。

```vue [pages/[...slug.vue]
<script>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})
</script>
```

<tip>

`queryCollection` 工具可在 Vue 和 Nitro 中使用。更多关于如何在服务器端使用的信息，请查看 [服务器端用法](#server-usage)。

</tip>

## API

### 类型

```ts
function queryCollection<T extends keyof Collections>(collection: T): CollectionQueryBuilder<Collections[T]>

interface CollectionQueryBuilder<T> {
  where(field: keyof T | string, operator: SQLOperator, value?: unknown): CollectionQueryBuilder<T>
  andWhere(groupFactory: QueryGroupFunction<T>): CollectionQueryBuilder<T>
  orWhere(groupFactory: QueryGroupFunction<T>): CollectionQueryBuilder<T>
  order(field: keyof T, direction: 'ASC' | 'DESC'): CollectionQueryBuilder<T>
  // ... 其他方法
}
```

### `queryCollection(collection: CollectionName)`

创建用于查询指定集合的查询构建器。

- 参数：

  - `collection`：在 `content.config.ts` 中定义集合的键名。

### `path(path: string)`

搜索具有特定 `path` 的内容。（`path` 是 `page` 集合中的特殊字段，基于文件系统路径生成，可作为渲染内容的路由）

- 参数：

  - `path`：匹配的路径字符串。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})
```

### `select(...fields: keyof Collection)`

从集合中选择特定字段返回查询结果。

- 参数：

  - `...fields`：要从集合中选择的字段名称列表。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    .select('path', 'title', 'description')
    .first()
})
```

### `where(field: keyof Collection | string, operator: SqlOperator, value?: unknown)`

向查询添加条件，根据特定字段筛选结果。

- 参数：

  - `field`：要筛选的字段。
  - `operator`：用于比较的 SQL 运算符。可能的值包括：
  
    - `'='`：等于
    - `'>'`：大于
    - `'<'`：小于
    - `'<>'`：不等于
    - `'IN'`：在列表中
    - `'BETWEEN'`：在两个值之间
    - `'NOT BETWEEN'`：不在两个值之间
    - `'IS NULL'`：为 NULL
    - `'IS NOT NULL'`：不为 NULL
    - `'LIKE'`：匹配模式
    - `'NOT LIKE'`：不匹配模式
  - `value`：用于比较的值。类型依所用运算符不同而不同。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    .where('date', '<', '2024-04-04')
    .where('category', '=', 'news')
    .all()
})

// Generated SQL
// SELECT * FROM docs WHERE date < '2024-04-04' AND category = 'news'
```

### `andWhere(groupFactory: QueryGroupFunction<Collection>)`

向查询添加一个 AND 条件组，允许构建更复杂的查询条件。

- 参数：

  - `groupFactory`：一个接收查询构建器的函数，可添加多个条件，这些条件将用 AND 连接组合在一起。

```ts
const { data } = await useAsyncData('recent-docs', () => {
  return queryCollection('docs')
    .where('published', '=', true)
    .andWhere(query => query.where('date', '>', '2024-01-01').where('category', '=', 'news'))
    .all()
})

// Generated SQL
// SELECT * FROM docs WHERE published = true AND (date > '2024-01-01' AND category = 'news')
```

### `orWhere(groupFactory: QueryGroupFunction<Collection>)`

向查询添加一个 OR 条件组，允许构建替代的条件。

- 参数：

  - `groupFactory`：一个接收查询构建器的函数，可添加多个条件，这些条件用 OR 连接组合在一起。

```ts
const { data } = await useAsyncData('featured-docs', () => {
  return queryCollection('docs')
    .where('published', '=', true)
    .orWhere(query => query.where('featured', '=', true).where('priority', '>', 5))
    .all()
})

// Generated SQL
// SELECT * FROM docs WHERE published = true AND (featured = true OR priority > 5)
```

### `order(field: keyof Collection, direction: 'ASC' | 'DESC')`

根据特定字段对查询结果进行排序。

- 参数：

  - `field`：排序字段。
  - `direction`：排序方向，'ASC' 表示升序，'DESC' 表示降序。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    .order('date', 'DESC')
    .all()
})
```

### `limit(limit: number)`

限制查询返回结果的数量。

- 参数：

  - `limit`：返回结果的最大数量。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    .limit(10)
    .all()
})
```

### `skip(skip: number)`

查询时跳过指定数量的结果。

- 参数：

  - `skip`：跳过的结果数量。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    // 跳过前 5 条
    .skip(5)
    .all()
})
```

### `all()`

执行查询并返回所有匹配结果。

- 返回值：返回一个 Promise，解析为所有匹配的文档数组。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs').all()
})
```

### `first()`

执行查询并返回第一个匹配结果。

- 返回值：返回一个 Promise，解析为第一个匹配的文档，若无匹配则为 `null`。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs').first()
})
```

### `count()`

统计基于查询条件匹配的集合条目数量。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    // 计数匹配条目
    .count()
})

// 返回
5 // 匹配数量
```

你也可以将 `count()` 与上述其他方法（如 `where()`）结合使用，以对集合查询应用更多条件。

```ts
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs')
    .where('date', '<', '2024-04-04')
    // 计数匹配条目
    .count()
})

// 返回
3 // 满足条件的匹配数量
```

## 示例

下面是一个完整示例，展示如何获取 `docs` 集合中的文档列表。

```vue [index.vue]
<script setup lang="ts">
const { data: docs } = await useAsyncData('documents-list', () => {
  return queryCollection('docs')
    .order('date', 'DESC')
    .select('title', 'path', 'description')
    .all()
})
</script>

<template>
  <NuxtLink v-for="doc in docs" :key="doc.path" :to="doc.path">
    <h2>{{ doc.title }}</h2>
    <p>{{ doc.description }}</p>
  </NuxtLink>
</template>
```

## 服务器端用法

Nuxt Content 提供了类似的工具用于在服务器端查询集合。唯一区别是你需要将 `event` 作为第一个参数传给 `queryCollection` 函数。

```ts [server/api/[slug].ts]
export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const page = await queryCollection(event, 'docs').path(slug).first()
  return page
})
```

<note>

确保创建 `server/tsconfig.json` 文件，并包含以下内容以避免类型错误：

```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
```

</note>
