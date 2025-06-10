<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || [],
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
})

const links = useNavLinks()
const color = useThemeColor()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'canonical', href: `https://nuxt-content.zhcndoc.com${withoutTrailingSlash(route.path)}` },
  ],
  htmlAttrs: {
    lang: 'zh-CN',
  },
})

useHead({
  titleTemplate: title => title ? `${title} - Nuxt Content 中文文档` : 'Nuxt Content 中文文档 - 基于 Git 的 Nuxt 项目内容管理系统',
  script: [{ async: '', src: 'https://www.zhcndoc.com/js/common.js' }],
})

useServerSeoMeta({
  ogSiteName: 'Nuxt Content 中文文档',
  twitterCard: 'summary_large_image',
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#FFF" />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :links="links"
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
