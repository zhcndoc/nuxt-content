---
seo:
  title: 认识 Studio，为所有人打造的内容编辑
  description: Nuxt Studio 为您的 Nuxt Content 项目带来可视化编辑。
    任何人都可以借助我们多功能的编辑器贡献网站内容，该编辑器
    兼容 markdown、YAML 或 JSON——无需技术专长。为开发者打造，
    适用于所有人。
---

::u-page-hero
  :::div{.hidden.sm:block}
    ::::u-color-mode-image
    ---
    class: size-full absolute bottom-0 inset-x-4 z-[-1]
    dark: /home/hero-dark.svg
    light: /home/hero-light.svg
    ---
    ::::
  :::

#title{unwrap="p"}
认识 Studio，内容编辑 :br 面向每个人。

#description
**Nuxt Studio** 为您的 Nuxt Content 项目带来可视化编辑。任何人都可以借助我们多功能的编辑器贡献网站内容，该编辑器兼容 markdown、YAML 或 JSON。无需技术专长。*为开发者打造，适用于所有人。*

#links{unwrap="p"}
  :::u-button
  ---
  label: 免费开始使用
  size: xl
  target: _blank
  to: https://nuxt.studio/signin
  trailingIcon: i-lucide-arrow-right
  ---
  :::

  :::u-button
  ---
  color: neutral
  label: 阅读文档
  size: xl
  to: /docs/studio/setup
  variant: subtle
  ---
  :::
::

::u-page-section
#features
  :::u-page-feature
  ---
  icon: i-lucide-circle-user
  ---
  #title{unwrap="p"}
  GitHub 与 Google 认证
  
  #description{unwrap="p"}
  为各角色提供个性化工作空间：开发者、撰写者及客户。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-pen
  ---
  #title{unwrap="p"}
  轻松更新内容
  
  #description{unwrap="p"}
  从 Markdown 到 YAML 编辑，我们的可视化编辑器专为非技术用户设计。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-users
  ---
  #title{unwrap="p"}
  实时协作
  
  #description{unwrap="p"}
  利用我们的协作功能，团队成员能实时共同撰写。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sparkles
  ---
  #title{unwrap="p"}
  从代码到编辑
  
  #description{unwrap="p"}
  开发者构建基础，撰写者则可安全地编辑内容。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-panels-top-left
  ---
  #title{unwrap="p"}
  发布前审核
  
  #description{unwrap="p"}
  在网站上线前审核您的更改内容。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-mouse-pointer-click
  ---
  #title{unwrap="p"}
  即用模板
  
  #description{unwrap="p"}
  利用为 SaaS 网站、博客、文档等预构建的模板快速开始。
  :::
::

::u-page-section
---
orientation: horizontal
---
  :::code-group
  ```vue [components/content/HomeFeature.vue]
  <script setup lang="ts">
    defineProps({
      icon: {
        type: String,
        default: 'i-ph-cursor-click',
      },
    })
  </script>
  
  <template>
    <div class="flex items-start gap-3">
      <div class="flex items-center justify-center border rounded-lg p-1.5">
        <UIcon :name="icon" />
      </div>
      <div class="flex flex-col">
        <h3 class="font-semibold">
          <slot name="title" />
        </h3>
        <span>
          <slot name="description" />
        </span>
      </div>
    </div>
  </template>
  ```
  
  ```mdc [content/index.md]
  ::home-feature
    ---
    icon: i-mdi-vuejs
    ---
    #title
    嵌入式 Vue 组件
    #description
    可在类 Notion 编辑器中编辑插槽与属性。
  ::
  ```
  
    ::::preview-card{icon="i-lucide-eye" label="编辑器"}
    ![Studio 中的 Vue 组件编辑](/docs/studio/home-content-studio-dark.webp)
    ::::
  :::

#title{unwrap="p"}
开发者创建 [编辑体验]{.text-(--ui-primary)}

#description
开发者以自己的方式构建基础设施：自定义组件、媒体库及网站配置。

#features
  :::u-page-feature
  ---
  icon: i-lucide-settings-2
  ---
  #title{unwrap="p"}
  可定制且可编辑的 Vue 组件
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-markdown
  ---
  #title{unwrap="p"}
  使用我们的可视化编辑器编辑 Markdown
  :::

  :::u-page-feature
  ---
  icon: i-lucide-brush
  ---
  #title{unwrap="p"}
  可视化编辑您的 app.config
  :::

#links
  :::u-button
  ---
  color: neutral
  label: 了解更多关于自定义组件
  to: /docs/files/markdown#vue-components
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
:video{autoplay controls loop src="https://res.cloudinary.com/nuxt/video/upload/v1744126742/studio/finalpropscomps_usfabp.mp4"}

#title{unwrap="p"}
让 [任何人编辑]{.text-(--ui-primary)} 您的 Nuxt Content 网站

#description
团队和客户获得功能强大的可视化编辑器用于内容管理，从文本编辑到媒体管理——全程无需接触代码。

#features
  :::u-page-feature
  ---
  icon: i-lucide-mouse-pointer-click
  ---
  #title{unwrap="p"}
  带拖拽的 Markdown 可视化编辑器
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-text
  ---
  #title{unwrap="p"}
  为 `YML` 和 `JSON` 文件生成表单
  :::

  :::u-page-feature
  ---
  icon: i-lucide-image
  ---
  #title{unwrap="p"}
  集中管理所有媒体资源
  :::
::

::u-page-section
---
orientation: horizontal
---
  :::u-color-mode-image
  ---
  class: size-full
  dark: /home/pro-dark.svg
  light: /home/pro-light.svg
  ---
  :::

#title
[一起编辑]{.text-(--ui-primary)}，即时预览

#description
团队协同编辑内容并通过实时预览看到网站实时变化。从文本编辑到组件更新，每一次更改都会反映在最终网站设计中。体验无延迟、无需手动刷新且顺畅的内容创作流程。

#features
  :::u-page-feature
  ---
  icon: i-lucide-files
  ---
  #title{unwrap="p"}
  实时在网站上查看您的更改
  :::

  :::u-page-feature
  ---
  icon: i-lucide-link
  ---
  #title{unwrap="p"}
  分享带有实时更新的预览链接给任何人
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list
  ---
  #title{unwrap="p"}
  发布前回顾所有更改
  :::
::

::u-page-section
  :::div{.hidden.sm:block}
    ::::u-color-mode-image
    ---
    class: size-full absolute bottom-0 inset-x-4 z-[-1]
    dark: /home/cta-dark.svg
    light: /home/cta-light.svg
    ---
    ::::
  :::

#title
编辑您的 [Nuxt Content]{.text-(--ui-primary)} 网站的[最佳方式]{.text-(--ui-primary)}

#links
  :::u-button
  ---
  label: 免费开始使用
  target: _blank
  to: https://nuxt.studio/signin
  trailingIcon: i-lucide-arrow-right
  ---
  :::

  :::u-button
  ---
  color: neutral
  label: 查看价格
  to: /studio/pricing
  variant: outline
  ---
  :::

#description
导入您的 Nuxt Content 网站并邀请团队立即协作。
::
