---
title: 迁移 Nuxt UI Pro 文档入门模板
description: 如何升级您的 Nuxt UI Pro 文档到 Content 和 UI v3
image:
  src: /blog/migrate-docs-starter.png
authors:
  - name: Baptiste Leproux
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
    to: https://x.com/_larbish
    username: larbish
date: 2025-01-21T01:00:00.000Z
category: 迁移
---

# 如何将您的 Nuxt 文档网站升级到 Content x UI v3

**2025 年以「三」的力量开启！**

新年伊始，我们喜爱的工具迎来了重大更新。UI 团队即将发布 **UI / UI Pro 库** 的 **3 版本**（目前处于 alpha 版本），而 Content 团队已经发布了 **Nuxt Content v3**。

这些更新意味着所有结合了 **Content** 和 **UI** 的入门模板都需要更新以适配最新版本。为帮助您顺利完成迁移，本指南将演示如何将 **Nuxt UI Pro Docs Starter** 迁移到全新的 **Content v3 和 Nuxt UI v3** 包。

::prose-tip{to="https://github.com/nuxt-ui-pro/docs/tree/v3"}
查看 UI Pro 文档入门模板仓库源码。
::

## Content 迁移（v2 → v3）

### 1. 将包更新到 v3

::code-group
```bash [pnpm]
pnpm add @nuxt/content@^3
```

```bash [yarn]
yarn add @nuxt/content@^3
```

```bash [npm]
npm install @nuxt/content@^3
```

```bash [bun]
bun add @nuxt/content@^3
```
::

### 2. 创建 `content.config.ts` 文件

该配置文件定义数据结构。集合（collection）代表一组相关内容。以 docs starter 为例，包含两个不同的集合，`landing` 集合代表主页，另一个 `docs` 集合包含文档页面。

```js [content.config.ts]
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.yml'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.yml']
      },
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional()
      })
    })
  }
})
```

在 [`page`](/docs/collections/types#page-type) 类型提供的内置字段基础上，我们为 `docs` 集合额外添加了 `links` 字段，以便在文档的 [页面头部](https://ui3.nuxt.dev/components/page-header) 有选择地显示它们。

::prose-tip
`type: page` 表示内容文件与网站页面之间存在一一对应关系。
::

### 3. 迁移 `app.vue`

::prose-steps{level="4"}
#### 导航抓取方法更新：从 `fetchContentNavigation` 迁移为 `queryCollectionNavigation`

  :::prose-code-group
  ```ts [app.vue (v3)]
  const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
  
  ```
  
  ```ts [app.vue (v2)]
  const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
  ```
  :::

#### 内容搜索命令面板数据使用新方法 `queryCollectionSearchSections`

  :::prose-code-group
  ```ts [app.vue (v3)]
  const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
    server: false,
  })
  ```
  
  ```ts [app.vue (v2)]
  const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
    default: () => [],
    server: false
  })
  ```
  :::
::

### 4. 迁移首页

::prose-steps{level="4"}
#### 首页数据抓取方法更新：从 `queryContent` 迁移为 `queryCollection`

  :::prose-code-group
  ```ts [index.vue (v3)]
  const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
  ```
  
  ```ts [index.vue (v2)]
  const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
  ```
  :::

#### 使用 [`page`](/docs/collections/types#page-type) 类型提供的 `seo` 字段填充 `useSeoMeta`

```ts [index.vue]
useSeoMeta({
  title: page.value.seo.title,
  ogTitle: page.value.seo.title,
  description: page.value.seo.description,
  ogDescription: page.value.seo.description
})
```

  :::prose-note
  请注意，当未设置时，`seo` 字段会被根级的 `title` 和 `description` 自动覆盖。
  :::
::

### 5. 迁移捕获全部文档页面

::prose-steps{level="4"}
#### 文档页面及其周边内容抓取更新为使用 `queryCollection` 和 `queryCollectionItemSurroundings`

  :::prose-code-group
  ```ts [docs/[...slug\\].vue (v3)]
  const { data } = await useAsyncData(route.path, () => Promise.all([
    queryCollection('docs').path(route.path).first(),
    queryCollectionItemSurroundings('docs', route.path, {
      fields: ['title', 'description'],
    }),
  ]), {
    transform: ([page, surround]) => ({ page, surround }),
  })
  
  const page = computed(() => data.value?.page)
  const surround = computed(() => data.value?.surround)
  ```
  
  ```ts [docs/[...slug\\].vue (v2)]
  const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
  
  const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent()
    .where({ _extension: 'md', navigation: { $ne: false } })
    .only(['title', 'description', '_path'])
    .findSurround(withoutTrailingSlash(route.path))
  )
  ```
  :::

#### 使用 [`page`](/docs/collections/types#page-type) 类型提供的 `seo` 字段填充 `useSeoMeta`

```ts [index.vue]
useSeoMeta({
  title: page.value.seo.title,
  ogTitle: `${page.value.seo.title} - ${seo?.siteName}`,
  description: page.value.seo.description,
  ogDescription: page.value.seo.description
})
```

  :::prose-note
  请注意，当未设置时，`seo` 字段会被根级的 `title` 和 `description` 自动覆盖。
  :::
::

### 6. 更新类型

Content v3 大幅改进了类型支持，大部分手动声明类型的需求已无，类型将由 Nuxt Content API 直接提供。

文档入门模板中唯一需要关注的是导航项类型，将 `NavItem` 替换为 `ContentNavigationItem` 。

```ts
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
```

### 7. 替换文件夹元数据文件

所有 `_dir.yml` 文件命名改为 `.navigation.yml`

### 8. 迁移 Studio 激活方式

由于 [studio 模块](https://nuxt.studio) 已废弃，且新的通用 `Preview API` 已直接集成到 Nuxt Content，我们可以从依赖和 `nuxt.config.ts` 的模块列表中移除 `@nuxthq/studio` 包。

只需在 Nuxt 配置文件中启用预览模式，将 Studio API 绑定即可。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
})
```

最后，为了保持 [app config 文件可由 Studio 更新](/docs/studio/config)，只需将 `nuxt.schema.ts` 文件中的辅助导入由 `@nuxthq/studio/theme` 更改为 `@nuxt/content/preview`。

::prose-tip
到此为止，内容已使用 Content v3 驱动。接下来让我们迁移到 [Nuxt UI / UI Pro](https://ui3.nuxt.dev) 版本 3。
::

## Nuxt UI Pro 迁移（v1 → v3）

::prose-caution
这是一次迁移指导，不涵盖所有破坏性变更。请检查文档中使用的每个组件，确认是否需要更新属性、插槽或样式。
::

### 1. 将包设置为 v3

::prose-note
为与 UI 版本统一（从 v1 直接跳至 v2），Nuxt UI Pro 跳过了版本 2，直接更新到 v3。
::

::prose-steps{level="4"}
#### 安装 Nuxt UI v3 alpha 版

  :::code-group{sync="pm"}
  ```bash [pnpm]
  pnpm add @nuxt/ui-pro@next
  ```
  
  ```bash [yarn]
  yarn add @nuxt/ui-pro@next
  ```
  
  ```bash [npm]
  npm install @nuxt/ui-pro@next
  ```
  
  ```bash [bun]
  bun add @nuxt/ui-pro@next
  ```
  :::

#### 在 Nuxt 配置中添加模块

无需再在模块中添加 `@nuxt/ui`，因为它已被 `@nuxt/ui-pro` 自动引入。

  :::prose-code-group
  ```ts [nuxt.config.ts (v3)]
  export default defineNuxtConfig({
    modules: ['@nuxt/ui-pro']
  })
  ```
  
  ```ts [nuxt.config.ts (v1)]
  export default defineNuxtConfig({
    extends: ['@nuxt/ui-pro'],
    modules: ['@nuxt/ui']
  })
  ```
  :::

  :::prose-note
  **Nuxt UI Pro V3** 被视为模块，而非层（layer）。
  :::

#### 在 CSS 中引入 Tailwind CSS 和 Nuxt UI Pro

```css [assets/css/main.css]
@import "tailwindcss" theme(static);
@import "@nuxt/ui-pro";
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui-pro'],
  css: ['~/assets/css/main.css']
})
```

#### 移除 tailwind 配置文件，使用 CSS 优先的主题定制

Nuxt UI v3 使用 Tailwind CSS v4，采用 CSS 优先的配置方式。现可在 `@theme` 指令内使用 CSS 变量定制主题。

- 删除 `tailwind.config.ts` 文件
- 在 `main.css` 文件中使用 `@theme` 指令应用主题
- 使用 `@source` 指令让 Tailwind 能检测 `markdown` 文件中的类名

```css [assets/css/main.css]
@import "tailwindcss" theme(static);
@import "@nuxt/ui-pro";

@source "../content/**/*";

@theme {
  --font-sans: 'DM Sans', sans-serif;

  --color-green-50: #EFFDF5;
  --color-green-100: #D9FBE8;
  --color-green-200: #B3F5D1;
  --color-green-300: #75EDAE;
  --color-green-400: #00DC82;
  --color-green-500: #00C16A;
  --color-green-600: #00A155;
  --color-green-700: #007F45;
  --color-green-800: #016538;
  --color-green-900: #0A5331;
  --color-green-950: #052E16;
}

```
::

### 2. 更新 `app.config.ts` 中的 `ui` 配置

::prose-caution{to="https://ui3.nuxt.dev/getting-started/theme#customize-theme"}
组件中的 `ui` 属性或 `app.config.ts` 中的 `ui` 键的所有重载已废弃，请参考 **UI / UI Pro** 文档进行核查。
::

::prose-code-group
```ts [app.config.ts (v3)]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-gray-200 dark:border-gray-800',
        left: 'text-sm text-gray-500 dark:text-gray-400'
      }
    }
  },
}
```

```ts [app.config.ts (v1)]
export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
})
```
::

### 3. 迁移 `error.vue` 页面

可以使用新的 `UError` 组件作为完整的页面结构。

::prose-code-group
```vue [error.vue (v3)]
<template>
  <div>
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>
```

```vue [error.vue (v1)]
<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
```
::

### 4. 迁移 `app.vue` 页面

- `Main`、`Footer` 和 `LazyUContentSearch` 组件在本例中无需更新。
- `Notification` 组件可以移除，因为 `Toast` 由 `App` 组件直接管理。
- `NavigationTree` 组件可替换为 `NavigationMenu` 或 `ContentNavigation` 组件展示内容导航。

::prose-code-group
```vue [Header.vue (v3)]
<script>
// 内容导航由 queryCollectionNavigation('docs') 提供
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <UHeader>
    <template #content>
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
     </template>
   </UHeader>
</template>
```

```vue [Header.vue (v1)]
<script>
// 内容导航由 fetchContentNavigation() 提供
const navigation = inject<Ref<NavItem[]>>('navigation')
</script>

<template>
  <UHeader>
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
     </template>
   </UHeader>
</template>
```
::

### 5. 更新首页

我们决定将首页内容从 `YML` 迁移到 `Markdown` 。

::prose-tip
这么做是因为 Markdown 中使用的组件不再需要全局暴露（也不必创建在 `components/content` 文件夹中），Content v3 会自动处理这些。
::

::prose-steps{level="4"}
#### 更新内容配置

```ts [content.config.ts]
export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.md']
      },
      ...
    })
  }
})
```

#### 使用 `ContentRenderer` 渲染 `Markdown`

  :::prose-note
  由于首页包含非 prose Vue 组件，需将 `ContentRenderer` 组件的 `prose` 属性设置为 `false`，以避免 Markdown 应用 prose 样式。
  :::

  :::prose-code-group
  ```vue [index.vue (v3)]
  <template>
    <UContainer>
      <ContentRenderer
        v-if="page"
        :value="page"
        :prose="false"
      />
    </UContainer>
  </template>
  ```
  
  ```vue [index.vue (v1)]
  <template>
    <div>
      <ULandingHero
        v-if="page.hero"
        v-bind="page.hero"
      >
        <template #headline>
          <UBadge
            v-if="page.hero.headline"
            variant="subtle"
            size="lg"
            class="relative rounded-full font-semibold"
          >
            <NuxtLink
              :to="page.hero.headline.to"
              target="_blank"
              class="focus:outline-none"
              tabindex="-1"
            >
              <span
                class="absolute inset-0"
                aria-hidden="true"
              />
            </NuxtLink>
  
            {{ page.hero.headline.label }}
  
            <UIcon
              v-if="page.hero.headline.icon"
              :name="page.hero.headline.icon"
              class="ml-1 w-4 h-4 pointer-events-none"
            />
          </UBadge>
        </template>
  
        <template #title>
          <MDC cache-key="head-title" :value="page.hero.title" />
        </template>
  
        <MDC
          :value="page.hero.code"
          cache-key="head-code"
          class="prose prose-primary dark:prose-invert mx-auto"
        />
      </ULandingHero>
  
      <ULandingSection
        :title="page.features.title"
        :links="page.features.links"
      >
        <UPageGrid>
          <ULandingCard
            v-for="(item, index) of page.features.items"
            :key="index"
            v-bind="item"
          />
        </UPageGrid>
      </ULandingSection>
    </div>
  </template>
  ```
  :::

#### 迁移 Vue 组件到 MDC 语法

请将 `index.md` 中的所有组件迁移至遵循 [MDC 语法](/docs/files/markdown) 格式。

首页组件已重组并标准化为通用的 `Page` 组件。

- `LandingHero` 改为 `PageHero`
- `LandingSection` 改为 `PageSection`
- `LandingCard` 改为 `PageCard`（但我们将使用 `PageFeature`）

  :::prose-tip{to="https://github.com/nuxt-ui-pro/docs/blob/v3/content/index.md"}
  在 GitHub 上查看最终的 `Markdown` 文件示例。
  :::
::

### 6. 迁移文档页面

::prose-steps{level="4"}
#### 布局

- `Aside` 组件已重命名为 `PageAside`。
- 可使用 `ContentNavigation` 组件（替代旧的 `NavigationTree`）展示由 `queryCollectionNavigation` 返回的内容导航。

  :::prose-code-group
  ```vue [layout/docs.vue (v3)]
  <template>
    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <UContentNavigation
              highlight
              :navigation="navigation"
            />
          </UPageAside>
        </template>
  
        <slot />
      </UPage>
    </UContainer>
  </template>
  ```
  
  ```vue [layout/docs.vue (v1)]
  <template>
    <UContainer>
      <UPage>
        <template #left>
          <UAside>
            <UNavigationTree :links="mapContentNavigation(navigation)" />
          </UAside>
        </template>
  
        <slot />
      </UPage>
    </UContainer>
  </template>
  ```
  :::

#### 捕获全部页面

- `Divider` 改名为 `Separator`
- `findPageHeadline` 必须从 `#ui-pro/utils/content` 导入
- `PageBody` 组件不再存在 `prose` 属性
::

::prose-tip{to="https://github.com/nuxt-ui-pro/docs/tree/v3"}
完成！文档入门模板现已完全运行于 UI 和 Content v3 🎉
::

## 在 Studio 中编辑

如果您使用 Nuxt Studio 编辑文档，也需要迁移相关代码。

Studio 模块已废弃，新的通用 `Preview API` 已内嵌于 Nuxt Content，您可移除依赖及 `nuxt.config.ts` 中的 `@nuxthq/studio` 模块，只需在 Nuxt 配置中启用预览模式并绑定 Studio API。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
})
```

要保持 app 配置文件可由 Studio 更新，请将 `nuxt.schema.ts` 文件中的辅助导入由 `@nuxthq/studio/theme` 切换为 `@nuxt/content/preview`。

:video{autoplay controls loop poster="https://res.cloudinary.com/nuxt/video/upload/v1737458923/studio/docs-v3_lqfasl.png" src="https://res.cloudinary.com/nuxt/video/upload/v1737458923/studio/docs-v3_lqfasl.mp4"}