# 从 Vue 组件继承 Schema

> 使用 property().inherit() 将 Vue 组件的 props 复用为集合 Schema 的一部分。

你可以将 Vue 组件的 props 复用为集合 Schema 的一部分。这有助于保持内容模型与界面的一致，减少重复，并防止偏差。

## 工作原理

Nuxt Content 提供了一个 `property()` 辅助函数，用于增强你的验证器并添加以下功能：

- **inherit(path)**：用位于 `path` 的 Vue 组件推断出的 props JSON Schema 替换当前的对象 Schema

底层机制是，Nuxt Content 通过 `nuxt-component-meta` 读取组件的 props，并将其转换为 JSON Schema，然后合并到你的集合 Schema 中。

## 示例

```ts [content.config.ts]
import { defineContentConfig, defineCollection, z, property } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        // 复用本地组件的 props
        hero: property(z.object({})).inherit('app/components/HeroSection.vue'),

        // 复用依赖包中的组件 props（路径像导入一样解析）
        button: property(z.object({})).inherit('@nuxt/ui/components/Button.vue')
      })
    })
  }
})
```

## 说明

- `inherit()` 的参数会像模块路径一样解析。你可以传入相对于项目根目录的相对路径或包路径。
- `inherit()` 期望用在对象字段上（例如 `property(z.object({}))`）。
- 支持嵌套使用：你可以将继承的对象放在其他对象或数组中；Nuxt Content 会递归替换 `$content.inherit` 标记。
- 如果组件无法解析，Schema 会回退到原始的对象定义。

<tip>

如果你需要在组件 props 基础上自定义输入框，可以将 `inherit()` 和 `editor(...)` 配合使用，从而获得更好的 Studio 表单体验。

</tip>
