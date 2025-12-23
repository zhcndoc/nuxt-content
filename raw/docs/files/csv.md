# CSV

> 如何定义、编写和查询 CSV 数据。

## 单文件源

当你将集合指向单个 CSV 文件（而不是通配符）时，Nuxt Content **将每一数据行作为集合中的一个独立项目处理**。

- **定义集合**：将 `source` 设置为单个 `.csv` 文件的路径。
- **项目生成**：每一数据行成为一个项目，行字段位于顶层（没有 `body` 数组）。
- **ID**：项目的 ID 后缀为 `#<rowNumber>`，其中 `#1` 是表头之后的第一行数据。

```ts [content.config.ts]
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    people: defineCollection({
      type: 'data',
      source: 'org/people.csv',
      schema: z.object({
        name: z.string(),
        email: z.string().email()
      })
    })
  }
})
```

```csv [content/org/people.csv]
name,email
Alice,alice@example.com
Bob,bob@example.com
```

每一行都会生成一个独立项目。例如，第一行数据项目 ID 以 `#1` 结尾，第二行以 `#2` 结尾。你可以按任意列查询：

```ts
const { data: alice } = await useAsyncData('alice', () =>
  queryCollection('people')
    .where('email', '=', 'alice@example.com')
    .first()
)

const { data: allPeople } = await useAsyncData('all-people', () =>
  queryCollection('people')
    .order('name', 'ASC')
    .all()
)
```

<note>

- 表头行为必需，不会转换为项目。
- 单文件源中，项目字段位于顶层（无 `body`）。
- 若想将每个 CSV 文件视作单个项目，且所有行在 `body` 中，请使用通配符路径如 `org/**.csv`。
:::

## 多文件源

如果你在配置中使用类似 `*/**.csv`，Nuxt Content 会有不同处理：<br />

**每个文件（非每行）将视为一个项目**，各行数据解析为项目对象中 `body` 字段的数组。

```ts [content.config.ts]
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    charts: defineCollection({
      type: 'data',
      source: 'charts/**.csv',
      schema: z.object({
        // CSV 文件中 body 字段非常重要，无此字段无法访问数据数组
        body: z.array(z.object({
          label: z.string(),
          value: z.number()
        }))
      })
    })
  }
})
```

创建图表文件于 `content/charts/` 目录。

<code-group>

```csv [content/charts/chart1.csv]
label,value
A,100
B,200
C,300
```

```csv [content/charts/chart2.csv]
label,value
Foo,123
Bar,456
Baz,789
```

</code-group>

<warning>

每个 CSV 文件应含有定义列名的表头行，解析时用作对象键名。

</warning>

现在我们可以查询图表数据了：

```vue
<script lang="ts" setup>
// 查询单个图表
const { data: chart1 } = await useAsyncData('chart1', () => {
  return queryCollection('charts')
    .where('id', '=', 'charts/charts/chart1.csv')
    .first()
})

// 获取所有图表
const { data: charts } = await useAsyncData('charts', () => {
  return queryCollection('charts')
    .order('id', 'ASC')
    .all()
})
</script>

<template>
  <ul>
    <li v-for="chart in charts" :key="chart.id">
      <!-- CSV 数据位于 chart.body 数组中 -->
      <p v-for="data in chart.body" :key="data.label">
        {{ data.label }} - {{ data.value }}
      </p>
    </li>
  </ul>
</template>
```

## 配置

你可以在 `nuxt.config.ts` 中配置 CSV 文件的解析方式：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      csv: {
        // 将 CSV 数据转换为 JSON 对象
        json: true,
        // 指定分隔符（默认为 ','）
        delimiter: ','
      }
    }
  }
})
```

启用 `json: true` 后，每行会转成一个 JavaScript 对象，表头作为键名：

```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

## 自定义分隔符

如果你的 CSV 使用不同分隔符，可在配置中指定：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      csv: {
        delimiter: ';' // 使用分号作为分隔符
      }
    }
  }
})
```

这样会解析如下格式的 CSV 文件：

```csv [semicolon-data.csv]
id;name;email
1;John Doe;john@example.com
2;Jane Smith;jane@example.com
```

<note>

如果不需要 CSV 支持，可通过设置 `csv: false` 禁用 CSV 解析器。

</note>
</note>
