---
prose: true
seo:
  title: 基于 Git 的 Nuxt 项目内容管理系统
  description: Nuxt Content 是一个用于 Nuxt 的模块，提供了一种简单的方法来管理您应用程序的内容。它允许开发者以 Markdown、YAML 或 JSON 文件的形式编写内容，然后在他们的应用程序中查询和显示这些内容。
  ogImage: https://nuxt-content.zhcndoc.com/social.png
---

::u-page-hero
---
orientation: horizontal
---
  :::code-group
  ```mdc [content/index.md]
  ---
  title: 山岳网站
  description: 一个关于世界上最具标志性山脉的网站。
  ---

  ::my-vue-hero-component{orientation="horizontal"}
  #title
  欢迎来到山岳网站。
  #description
  这是关于山岳网站的描述。
  ::

  这是包含**加粗**和_斜体_文本的段落。
  ```

  ```vue [pages/index.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('home', () => {
    return queryCollection('content').path('/').first()
  })

  useSeoMeta({
    title: data.value?.title,
    description: data.value?.description
  })
  </script>

  <template>
    <ContentRenderer :value="data" />
  </template>
  ```
  :::

#headline
  :::u-button
  ---
  class: mb-3 rounded-full
  size: sm
  to: https://nuxt.studio
  trailing-icon: i-lucide-arrow-right
  variant: outline
  ---
  Nuxt Studio 已发布
  :::

#title
基于 [git]{.text-primary} 的 Nuxt CMS。

#description
Nuxt Content 是 Nuxt 的一个模块，为您的应用提供了一种简便的内容管理方式。它允许开发者使用 Markdown、YAML 或 JSON 文件撰写内容，然后在应用中查询并展示。

#links
  :::u-button
  ---
  label: 开始使用
  size: lg
  to: /docs/getting-started/installation
  trailingIcon: i-lucide-arrow-right
  ---
  :::

:u-input-copy{value="npx nuxt module add content"}
::

::u-container{.pb-12.xl:pb-24}
  :::u-page-grid
    ::::u-page-feature
    ---
    icon: i-lucide-files
    ---
    #title{unwrap="p"}
    基于文件的 CMS

    #description{unwrap="p"}
    使用 Markdown、YAML、CSV 或 JSON 编写内容，并在组件中查询。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-filter
    ---
    #title{unwrap="p"}
    查询构建器

    #description{unwrap="p"}
    使用类似 MongoDB 的 API 查询内容，在正确时间提取所需数据。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-database
    ---
    #title{unwrap="p"}
    SQLite 支持

    #description{unwrap="p"}
    为内容添加自定义字段，适用于各种类型的项目。
    ::::

    ::::u-page-feature
    ---
    icon: i-simple-icons-markdown
    ---
    #title{unwrap="p"}
    Markdown 与 Vue 结合

    #description{unwrap="p"}
    在 Markdown 文件中使用 Vue 组件，支持 props、slots 及嵌套组件。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-list-minus
    ---
    #title{unwrap="p"}
    代码高亮

    #description{unwrap="p"}
    通过 Shiki 集成，支持 VS Code 主题，在网站上展示美观的代码块。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-mouse-pointer-click
    ---
    #title{unwrap="p"}
    可视化编辑器

    #description{unwrap="p"}
    让您的团队使用 Nuxt Studio — 我们的可视化编辑器，编辑 Nuxt Content 项目。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-panel-left
    ---
    #title{unwrap="p"}
    导航生成

    #description{unwrap="p"}
    从内容文件生成结构化对象，在几分钟内展示导航菜单。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-heading-1
    ---
    #title{unwrap="p"}
    Prose 组件

    #description{unwrap="p"}
    使用 Vue 组件自定义 HTML 排版标签，为内容提供一致的样式。
    ::::

    ::::u-page-feature
    ---
    icon: i-lucide-globe
    ---
    #title{unwrap="p"}
    全平台部署

    #description{unwrap="p"}
    Nuxt Content 兼容所有主机提供商，支持静态、服务器、无服务器和边缘部署。
    ::::
  :::
::

::u-page-section
#title
内容管理所需的一切

#description
结合基于文件的简洁性与 Vue 组件的强大功能。构建内容丰富的网站，从文档页面到复杂应用。

  :::div{.hidden.md:block}
  :u-color-mode-image{.size-full.absolute.top-0.inset-0 dark="/home/features-dark.svg" light="/home/features-light.svg"}
  :::
::

::u-page-section
---
reverse: true
orientation: horizontal
---
  :::tabs
    ::::tabs-item{icon="i-lucide-eye" label="预览"}
      :::::browser-frame
        ::::::example-landing-hero
        ---
        image: /mountains/everest.jpg
        ---
        #title
        珠穆朗玛峰。

        #description
        珠穆朗玛峰是世界最高的山峰，海拔 8848 米。
        ::::::
      :::::
    ::::

    ::::tabs-item{icon="i-simple-icons-markdown" label="content/index.md"}
    ```mdc [content/index.md]
    ---
    title: 山岳网站
    description: 一个关于世界上最具标志性山脉的网站。
    ---

    ::landing-hero
    ---
    image: /mountains/everest.jpg
    ---
    #title
    珠穆朗玛峰。

    #description
    珠穆朗玛峰是世界最高的山峰，海拔 8848 米。
    ::

    ```
    ::::

    ::::tabs-item
    ---
    icon: i-simple-icons-vuedotjs
    label: components/LandingHero.vue
    ---

    ```vue [components/LandingHero.vue]
      <script setup lang="ts">
      defineProps<{
        image: string 
      }>()
      </script>
      
      <template>
        <section class="flex flex-col sm:flex-row sm:items-center gap-4 py-8 sm:gap-12 sm:py-12">
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
    ::::
  :::

#title
Markdown 遇见 [Vue]{.text-(--ui-primary)} 组件

#description
我们创造了 MDC 语法，让您能在 Markdown 文件内使用带 props 和 slots 的 Vue 组件。

#features
  :::u-page-feature
  ---
  icon: i-lucide-list
  ---
  #title{unwrap="p"}
  使用 frontmatter 语法指定 props
  :::

  :::u-page-feature
  ---
  icon: i-lucide-hash
  ---
  #title{unwrap="p"}
  使用 `#` 调用组件插槽
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code-xml
  ---
  #title{unwrap="p"}
  添加其他 HTML 属性
  :::

#links
  :::u-button
  ---
  color: neutral
  label: 了解更多 MDC
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
  :::tabs
    ::::tabs-item{icon="i-simple-icons-vuedotjs" label="pages/blog.vue"}
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
    ::::

    ::::tabs-item{icon="i-simple-icons-typescript" label="content.config.ts"}
    ```ts [content.config.ts]
    import { defineContentConfig, defineCollection } from '@nuxt/content'
    import { z } from 'zod'

    export default defineContentConfig({
      collections: {
        blog: defineCollection({
          source: 'blog/*.md',
          type: 'page',
          // 为文档集合定义自定义 schema
          schema: z.object({
            tags: z.array(z.string()),
            image: z.string(),
            date: z.Date()
          })
        })
      }
    })
    ```
    ::::
  :::

#title
支持 [类型安全]{.text-(--ui-secondary)} 的查询

#description
通过集合定义内容结构，使用 schema 验证和完善的类型安全进行查询。

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
  在 Vue 文件中获得自动补全支持
  :::

#links
  :::u-button
  ---
  color: neutral
  label: 了解更多内容集合
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
:video{autoplay controls loop src="https://res.cloudinary.com/nuxt/video/upload/v1767647099/studio/studio-demo_eiofld.mp4"}

#title{unwrap="p"}
让[任何人编辑]{.text-(--ui-primary)}您的网站

#description
  :::u-button
  ---
  color: primary
  target: _blank
  to: https://nuxt.studio
  variant: outline
  ---
  试用 Nuxt Studio
  :::

使用我们的免费开源可视化界面**Studio 模块**，直接在线生产环境编辑您的 Nuxt Content 网站内容。

#features
  :::u-page-feature
  ---
  icon: i-lucide-mouse-pointer-click
  ---
  #title{unwrap="p"}
  在生产网站直接实时预览内容
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-text
  ---
  #title{unwrap="p"}
  支持 Markdown、YML 和 JSON 文件的可视化编辑器
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-git
  ---
  #title{unwrap="p"}
  直接在您的 Git 代码托管服务发布更改
  :::
::

::u-page-section
  :::div{.hidden.md:block}
  :u-color-mode-image{.size-full.absolute.bottom-0.inset-0.z-[-1] dark="/home/cta-dark.svg" light="/home/cta-light.svg"}
  :::

#title
为您的 Nuxt 项目添加基于 git 的 CMS。

#links
:u-button{label="开始阅读文档" to="/docs/getting-started/installation" trailing-icon="i-lucide-arrow-right"}
::
