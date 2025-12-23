# 集合类型

> 了解你可以在 Nuxt Content 中定义的两种集合类型。

在 Nuxt Content 中，你可以根据集合文件的预期用途为每个集合指定一个类型。集合可以定义为 **page（页面）** 或 **data（数据）** 类型。

对于这两种类型，都会生成内置字段。每个集合都包含以下默认字段：

- `id`: 唯一内容标识符
- `stem`: 不带扩展名的文件路径（用于排序和定位）
- `extension`: 文件扩展名
- `meta`: 不在集合模式中定义的自定义字段

## 页面类型

```ts
defineCollection({
  source: '**/*.md',
  type: 'page'
})
```

<tip>

如果内容文件与网站页面之间是一对一关系，请使用 **page** 类型。

</tip>

### 路径生成

Nuxt Content 会自动为集合中的每个文件生成路径，方便创建 URL 映射。

以下是基于文件结构生成的路径示例：

<table>
<thead>
  <tr>
    <th>
      文件
    </th>
    
    <th>
      路径
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        content/index.md
      </code>
    </td>
    
    <td>
      <code>
        /
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/about.md
      </code>
    </td>
    
    <td>
      <code>
        /about
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/blog/index.md
      </code>
    </td>
    
    <td>
      <code>
        /blog
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/blog/hello.md
      </code>
    </td>
    
    <td>
      <code>
        /blog/hello
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content/1.guide/2.installation
      </code>
    </td>
    
    <td>
      <code>
        /guide/installation
      </code>
    </td>
  </tr>
</tbody>
</table>

<note>

你可以使用辅助函数 [`queryCollection('COLLECTION').path('PATH')`](/docs/utils/query-collection) 按特定路径检索内容。

</note>

### 模式重写

当你使用 **page** 类型时，Nuxt Content 会生成几个常用于网页的标准字段。这些字段提供结构性，并且 **会自动** 应用于集合的模式：

- `path`: 生成的路由路径
- `title`: 页面标题
- `description`: 页面描述
- `seo`: SEO 元数据（与 Nuxt 的 `useSeoMeta` 组合函数配合使用）
- `body`: 解析为 AST 的页面内容
- `navigation`: 页面导航配置（用于 [queryCollectionNavigation](/docs/utils/query-collection-navigation)）

对应应用的模式如下：

```ts
path: z.string(),
  title: z.string(),
  description: z.string(),
  seo: z.intersection(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      meta: z.array(z.record(z.string(), z.any())).optional(),
      link: z.array(z.record(z.string(), z.any())).optional(),
    }),
    z.record(z.string(), z.any()),
  ).optional().default({}),
  body: z.object({
    type: z.string(),
    children: z.any(),
    toc: z.any(),
  }),
  navigation: z.union([
    z.boolean(),
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ]).default(true),
```

<note>

你可以通过在集合模式中定义这些字段来覆盖它们。

</note>

## 数据类型

```ts
defineCollection({
  source: 'authors/**.yml',
  type: 'data'
})
```

数据类型适用于那些不直接对应网页，而是表示你可能想在应用中查询和展示的结构化数据的内容。

对于数据集合，你可以完全控制模式，自定义结构。

<note>

集合类型和文件扩展名之间没有严格的对应关系。例如，**page** 集合可以使用 [Markdown](/docs/files/markdown)、[YAML](/docs/files/yaml) 或 [JSON](/docs/files/json) 文件，**data** 集合也可以使用这些格式中的任何一种。

</note>

## 文件排序

对于这两种类型，你可能希望控制列表中的显示顺序。通过在文件和目录名称中使用数字前缀来指定顺序。Nuxt Content 会使用这些数字对内容列表进行排序。

<note>

Nuxt Content 使用字母顺序进行排序，因此如果需要使用数字顺序，单数字前请加 `0` 前缀。例如，不加 `0` 前缀时，`10.foo.md` 会排在 `2.bar.md` 前面。

</note>

```text [目录结构]
content/
  1.frameworks/
    1.vue.md
    2.nuxt.md
    ...
  2.examples/
    01.nuxthub.md
    02.vercel.md
    03.netlify.md
    04.heroku.md
    ...
    10.cloudflare.md
    index.md
```

<warning>

数字和文件名之间请使用 `.` 字符分隔。使用其他分隔符将无效。

</warning>
