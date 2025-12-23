# queryCollectionItemSurroundings

> queryCollectionItemSurroundings 组合函数用于查找特定路径的兄弟内容项。

## 类型

```ts
function queryCollectionItemSurroundings<T extends keyof PageCollections>(
  collection: T,
  path: string,
  opts?: SurroundOptions<keyof PageCollections[T]>
): ChainablePromise<T, ContentNavigationItem[]>

interface ChainablePromise<T extends keyof PageCollections, R> extends Promise<R> {
  where(field: keyof PageCollections[T] | string, operator: SQLOperator, value?: unknown): ChainablePromise<T, R>
  andWhere(groupFactory: QueryGroupFunction<PageCollections[T]>): ChainablePromise<T, R>
  orWhere(groupFactory: QueryGroupFunction<PageCollections[T]>): ChainablePromise<T, R>
  order(field: keyof PageCollections[T], direction: 'ASC' | 'DESC'): ChainablePromise<T, R>
}
```

## 用法

使用自动导入的 `queryCollectionItemSurroundings` 可以查找集合中特定内容项的前后兄弟项目。这对于创建相关内容页面间的导航非常有用。

该函数返回一个可链式调用的 Promise，允许你添加额外的查询条件：

```vue [pages/[...slug].vue]
<script setup lang="ts">
const { data } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('docs', '/foo')
    .where('published', '=', true)
    .order('date', 'DESC')
})
</script>
```

<tip>

`queryCollectionItemSurroundings` 工具可以在 Vue 和 Nitro 中使用。详情请查看 [服务器端使用](#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E4%BD%BF%E7%94%A8) 章节，了解如何在服务器端使用。

</tip>

## Type

```ts
function queryCollectionItemSurroundings<T extends keyof PageCollections>(
  collection: T,
  path: string,
  opts?: SurroundOptions<keyof PageCollections[T]>
): ChainablePromise<T, ContentNavigationItem[]>

interface ChainablePromise<T extends keyof PageCollections, R> extends Promise<R> {
  where(field: keyof PageCollections[T] | string, operator: SQLOperator, value?: unknown): ChainablePromise<T, R>
  andWhere(groupFactory: QueryGroupFunction<PageCollections[T]>): ChainablePromise<T, R>
  orWhere(groupFactory: QueryGroupFunction<PageCollections[T]>): ChainablePromise<T, R>
  order(field: keyof PageCollections[T], direction: 'ASC' | 'DESC'): ChainablePromise<T, R>
}
```

## API

### `queryCollectionItemSurroundings(collection: CollectionName, path: string, opts?: SurroundOptions)`

查找集合中特定内容项的相邻项（前一项和后一项）。

- 参数：

  - `collection`：在 `content.config.ts` 中定义的集合的键名。
  - `path`：当前内容项的路径。
  - `opts`：（可选）包含以下属性的对象：
  
    - `before`：（可选）当前项之前要获取的项目数，默认值为 1。
    - `after`：（可选）当前项之后要获取的项目数，默认值为 1。
    - `fields`：（可选）附加要包含在相邻项中的字段数组。
- 返回值：一个可链式调用的 Promise，解析为包含相邻项目的数组。该 Promise 包含用于添加查询条件的方法：

  - `where(field, operator, value)`：添加 WHERE 条件
  - `andWhere(groupFactory)`：添加分组的 AND 条件
  - `orWhere(groupFactory)`：添加分组的 OR 条件
  - `order(field, direction)`：添加 ORDER BY 子句

最终结果将是一个数组，结构如下：

- 使用默认选项时为 `[previousItem, nextItem]`
- 使用自定义 `before` 和 `after` 值时为 `[...previousItems, ...nextItems]`

数组中的每个项均为 `ContentNavigationItem` 类型，若该位置无项目则为 `null`。

## 示例

基础用法，无额外查询条件：

```vue [pages/[...slug].vue]
<script setup lang="ts">
const { data } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('docs', '/foo')
})
</script>

<template>
  <div class="flex justify-between">
    <NuxtLink v-if="data?.[0]" :to="data[0].path">
      ← {{ data[0].title }}
    </NuxtLink>
    <NuxtLink v-if="data?.[1]" :to="data[1].path">
      {{ data[1].title }} →
    </NuxtLink>
  </div>
</template>
```

带有额外查询条件的示例：

```vue [pages/[...slug].vue]
<script setup lang="ts">
const { data } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('docs', '/foo', {
    before: 1,
    after: 1,
    fields: ['badge', 'description']
  })
    .where('_draft', '=', false)
    .where('_partial', '=', false)
    .order('date', 'DESC')
})
</script>
```

## 服务器端使用

Nuxt Content 提供了类似的工具用于服务器端查询集合。唯一不同的是你需要将 `event` 作为第一个参数传递给 `queryCollectionItemSurroundings` 函数。

```ts [server/api/surroundings.ts]
export default eventHandler(async (event) => {
  const surroundings = await queryCollectionItemSurroundings(event, 'docs', '/foo')
  return surroundings
})
```

<note>

请确保创建 `server/tsconfig.json` 文件，内容如下，以避免类型错误。

```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
```

</note>
