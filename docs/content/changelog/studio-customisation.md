---
name: Studio 表单自定义
title: Studio 表单自定义
description: Studio 表单是基于您内容配置文件中定义的集合模式动态生成的。
date: 2025-02-20T01:00:00.000Z
image:
  src: /blog/studio-form-generation.png
  alt: 基于集合模式生成的 Frontmatter 表单
authors:
  - name: Baptiste Leproux
    to: https://x.com/_larbish
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
category: content
draft: false
---

::warning
本文发布于 v3.7 之前，请参考[本指南](https://github.com/nuxt/content/blob/main/CHANGELOG.md#370-2025-09-12)进行迁移。
::

[Studio](https://nuxt.studio) 表单是基于您内容配置文件中定义的集合模式动态生成的。无论您是在编辑 `Markdown` 文件的 [frontmatter](/docs/files/markdown#frontmatter)，还是 `JSON` / `YAML` 文件，这种行为都是适用的。

:video{autoplay controls poster="https://res.cloudinary.com/nuxt/video/upload/v1739982761/frontmatterform_yjafgt.png" src="https://res.cloudinary.com/nuxt/video/upload/v1739982761/frontmatterform_yjafgt.mp4"}

## **使用** `zod` **模式定义您的表单**

Nuxt Content 利用 [zod](https://github.com/colinhacks/zod) 让您定义一种类型安全的内容模式。此模式不仅用于验证您的数据，还为 **Studio** 中的表单生成提供支持。

### **内置的 zod 辅助工具**

您可以通过向集合添加 `schema` 属性并使用 [zod](https://github.com/colinhacks/zod) 模式来定义您的内容模式。

`@nuxt/content` 暴露了一个 `z` 对象，包含一组用于常见数据类型的 [Zod](/) 工具。

::prose-code-group
```ts [content.config.ts]
export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        draft: z.boolean().default(false),
        category: z.enum(['Alps', 'Himalaya', 'Pyrenees']).optional(),
        date: z.date(),
        image: z.object({
          src: z.string().editor({ input: 'media' }),
          alt: z.string(),
        }),
        slug: z.string().editor({ hidden: true }),
        icon: z.string().optional().editor({ input: 'icon' }),
        authors: z.array(z.object({
          slug: z.string(),
          username: z.string(),
          name: z.string(),
          to: z.string(),
          avatar: z.object({
            src: z.string(),
            alt: z.string(),
          }),
        })),
      }),
    }),
  },
})    
```

  :::code-preview{icon="i-lucide-eye" label="生成的表单"}
  ![表单预览](/docs/studio/preview-schema.png)
  :::
::

### **原生输入映射**

原始 Zod 类型会自动映射为 **Studio** 中相应的表单输入：

- **字符串** → 文本输入框
- **日期** → 日期选择器
- **数字** → 数字输入（计数器）
- **布尔值** → 开关切换
- **枚举** → 下拉选择框
- **字符串数组** → 徽章输入列表
- **对象数组** → 可折叠项嵌套表单

:video{autoplay controls loop poster="https://res.cloudinary.com/nuxt/video/upload/v1740679550/arrayobjectandstring_r1jpvz.jpg" src="https://res.cloudinary.com/nuxt/video/upload/v1740679550/arrayobjectandstring_r1jpvz.mp4"}

### 自定义输入映射

内容不仅限于原始类型。您可以使用 `editor` 方法自定义表单字段，该方法通过元数据扩展 Zod 类型，以增强编辑器界面功能。

这使您能够定义自定义输入或者隐藏字段。

#### 用法

```ts [content.config.ts]
mainScreen: z.string().editor({ input: 'media' })
```

#### 选项

##### `input: 'media' | 'icon'`

您可以设置编辑器输入类型。目前支持 icon 和 media，因为它们已在 Studio 编辑器中被处理。

##### `hidden: Boolean`

此选项可用于避免字段在 Studio 编辑器中显示。

::prose-tip
Studio 输入完全可扩展。我们可以根据用户需求创建任意数量的输入控件。
::
