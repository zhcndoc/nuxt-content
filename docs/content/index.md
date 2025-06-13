---
seo:
  title: 基于 Git 的 Nuxt 项目内容管理系统
  description: Nuxt Content 是 Nuxt 的一个模块，提供了一种简单的方式来管理应用内容。它允许开发者以 Markdown、YAML 或 JSON 文件格式编写内容，然后在应用中查询并展示这些内容。
---

::u-page-hero
  :::div{.hidden.sm:block}
    ::::u-color-mode-image
    ---
    class: size-full absolute bottom-0 inset-0 z-[-1]
    dark: /home/hero-dark.svg
    light: /home/hero-light.svg
    ---
    ::::
  :::

#title{unwrap="p"}
基于 Git 的 :br Nuxt 项目内容管理系统。

#description
Nuxt Content 是 Nuxt 的一个模块，提供了一种简单的方式管理您的应用内容。它允许开发者以 Markdown、YAML、CSV 或 JSON 文件格式编写内容，然后在应用中查询并展示它们。

#links{unwrap="p"}
  :::u-button
  ---
  label: 开始使用
  size: xl
  to: /docs/getting-started/installation
  trailingIcon: i-lucide-arrow-right
  ---
  :::

  :::u-button
  ---
  color: neutral
  label: 打开可视化编辑器
  size: xl
  target: _blank
  to: https://nuxt.studio
  variant: subtle
  ---
  :::
::

::u-page-section
#features
  :::u-page-feature
  ---
  icon: i-lucide-files
  ---
  #title{unwrap="p"}
  基于文件的 CMS
  
  #description{unwrap="p"}
  以 Markdown、YAML、CSV 或 JSON 格式编写内容，并在组件中查询。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-filter
  ---
  #title{unwrap="p"}
  查询构建器
  
  #description{unwrap="p"}
  使用类 MongoDB 的 API 查询内容，按需获取正确的数据。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title{unwrap="p"}
  SQLite 驱动
  
  #description{unwrap="p"}
  向内容中添加自定义字段，适用于各种类型的项目。
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-markdown
  ---
  #title{unwrap="p"}
  Markdown 与 Vue
  
  #description{unwrap="p"}
  在 Markdown 文件中使用 Vue 组件，支持 props、插槽和嵌套组件。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list-minus
  ---
  #title{unwrap="p"}
  代码高亮
  
  #description{unwrap="p"}
  结合 Shiki 集成支持 VS Code 主题，在网站上显示漂亮的代码块。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-mouse-pointer-click
  ---
  #title{unwrap="p"}
  可视化编辑器
  
  #description{unwrap="p"}
  通过我们的可视化编辑器 Nuxt Studio，让团队成员轻松编辑 Nuxt Content 项目。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-panel-left
  ---
  #title{unwrap="p"}
  导航生成
  
  #description{unwrap="p"}
  从内容文件生成结构化对象，几分钟内展示导航菜单。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-heading-1
  ---
  #title{unwrap="p"}
  文章组件
  
  #description{unwrap="p"}
  使用 Vue 组件自定义 HTML 排版标签，让内容风格统一。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  ---
  #title{unwrap="p"}
  部署无处不在
  
  #description{unwrap="p"}
  Nuxt Content 兼容所有托管服务，支持静态、服务端、无服务器和边缘部署。
  :::
::

::u-page-section
#title
内容管理所需的一切

#description
结合基于文件的简单性与 Vue 组件的强大功能。构建内容丰富的网站，从文档页到复杂应用。

  :::div{.hidden.sm:block}
    ::::u-color-mode-image
    ---
    class: size-full absolute top-0 inset-0
    dark: /home/features-dark.svg
    light: /home/features-light.svg
    ---
    ::::
  :::
::

::u-page-section
---
reverse: true
orientation: horizontal
---
  :::code-group
    ::::preview-card{.!h-[458px] icon="i-lucide-eye" label="预览"}
      :::::example-landing-hero
      ---
      class: "!h-[458px]"
      image: /mountains/everest.jpg
      ---
      #title
      珠穆朗玛峰。
      
      #description
      珠穆朗玛峰是世界上海拔最高的山峰，海拔8848米。
      :::::
    ::::
  
  ```mdc [content/index.md]
  ---
  title: 山峰网站
  description: 一个关于世界最具标志性山峰的网站。
  ---
  
  ::landing-hero
  ---
  image: /mountains/everest.png
  ---
  #title
  珠穆朗玛峰。
  
  #description
  珠穆朗玛峰是世界上海拔最高的山峰，海拔8848米。
  ::
  ```
  
  ```vue [components/LandingHero.vue]
  <script setup lang="ts">
  defineProps<{ image: string }>()
  </script>
  
  <template>
    <section class="flex flex-col sm:flex-row sm:items-center flex-col-reverse gap-4 py-8 sm:gap-12 sm:py-12">
      <div>
        <h1 class="text-4xl font-semibold">
          <slot name="title" />
        </h1>
        <div class="text-base text-gray-600 dark:text-gray-300">
          <slot name="description" />
        </div>
      </div>
      <img :src="image" class="w-1/2 rounded-lg">
    </section>
  </template>
  ```
  :::

#title
Markdown 遇见 [Vue]{.text-(--ui-primary)} 组件

#description
我们创造了 MDC 语法，让你可以在 Markdown 文件中使用带有 props 和插槽的 Vue 组件。

#features
  :::u-page-feature
  ---
  icon: i-lucide-list
  ---
  #title{unwrap="p"}
  用 frontmatter 语法指定 props
  :::

  :::u-page-feature
  ---
  icon: i-lucide-hash
  ---
  #title{unwrap="p"}
  使用 `#` 来定义组件插槽
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code-xml
  ---
  #title{unwrap="p"}
  添加任意其他 HTML 属性
  :::

#links
  :::u-button
  ---
  color: neutral
  label: 了解更多关于 MDC
  to: /docs/files/markdown#mdc-syntax
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  :::
::

::u-page-section
---
orientation: horizontal
---
  :::code-group
  ```vue [pages/blog.vue]
  <script setup lang="ts">
  const { data: posts } = await useAsyncData('blog', () => {
    return queryCollection('blog').all()
  })
  </script>
  
  <template>
    <div>
      <h1>博客</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  ```
  
  ```ts [content.config.ts]
  import { defineContentConfig, defineCollection, z } from '@nuxt/content'
  
  export default defineContentConfig({
    collections: {
      blog: defineCollection({
        source: 'blog/*.md',
        type: 'page',
        // 为文档集定义自定义 schema
        schema: z.object({
          tags: z.array(z.string()),
          image: z.string(),
          date: z.Date()
        })
      })
    }
  })
  ```
  :::

#title
[类型安全]{.text-(--ui-secondary)} 查询

#description
使用集合定义内容结构，并通过 schema 验证实现完全的类型安全查询。

#features
  :::u-page-feature
  ---
  icon: i-lucide-layout-grid
  ---
  #title{unwrap="p"}
  为相似内容文件创建集合
  :::

  :::u-page-feature
  ---
  icon: i-lucide-circle-check
  ---
  #title{unwrap="p"}
  为集合 frontmatter 定义 schema
  :::

  :::u-page-feature
  ---
  icon: i-lucide-text-cursor
  ---
  #title{unwrap="p"}
  在 Vue 文件中获得自动补全
  :::

#links
  :::u-button
  ---
  color: neutral
  label: 了解更多关于内容集合
  to: /docs/collections/define
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  :::
::

::u-page-section
---
reverse: true
orientation: horizontal
---
:video{autoplay controls loop src="https://res.cloudinary.com/nuxt/video/upload/v1733494722/contentv3final_rc8bvu.mp4"}

 

#title{unwrap="p"}
让 [任何人编辑]{.text-(--ui-primary)} 您的网站

#description
通过 **Studio** 编辑您的 Nuxt Content 网站——我们的 CMS 平台，提供类似 Notion 的 Markdown 编辑器和为 `YAML` 与 `JSON` 文件生成的表单。支持实时预览和在线协作。

#features
  :::u-page-feature
  ---
  icon: i-lucide-mouse-pointer-click
  ---
  #title{unwrap="p"}
  拖拽式 Markdown 可视化编辑器
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-text
  ---
  #title{unwrap="p"}
  为 YML 和 JSON 文件生成表单
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-google
  ---
  #title{unwrap="p"}
  邀请编辑者通过 Google 登录并发布更改
  :::

#links
  :::u-button
  ---
  color: neutral
  label: 探索 Studio
  to: /studio
  trailingIcon: i-lucide-arrow-right
  ---
  :::
::

::u-page-section
  :::div{.hidden.sm:block}
    ::::u-color-mode-image
    ---
    class: size-full absolute bottom-0 inset-0 z-[-1]
    dark: /home/cta-dark.svg
    light: /home/cta-light.svg
    ---
    ::::
  :::

#title
为您的 Nuxt 项目添加基于 Git 的 CMS。

#links
  :::u-button
  ---
  label: 阅读文档
  to: /docs/getting-started/installation
  trailingIcon: i-lucide-arrow-right
  ---
  :::

  :::u-button
  ---
  color: neutral
  label: 打开 Studio
  target: _blank
  to: https://nuxt.studio
  variant: outline
  ---
  :::
::
