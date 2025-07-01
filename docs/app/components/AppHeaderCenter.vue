<script setup lang="ts">
const route = useRoute()

const links = computed(() => [
  {
    label: '文档',
    icon: 'i-lucide-book-open',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs'),
  }, {
    label: 'Nuxt Studio',
    icon: 'i-lucide-file-pen-line',
    children: [{
      icon: 'i-lucide-mouse-pointer-click',
      label: '特征',
      description: '编辑您的 Nuxt Content 项目所需的一切',
      to: '/studio',
    }, {
      label: '定价',
      description: '个人使用免费，团队需付费订阅',
      icon: 'i-lucide-rocket',
      to: '/studio/pricing',
    }],
  }, {
    label: '模板',
    icon: 'i-lucide-layout-template',
    to: '/templates',
  }, {
    label: '博客',
    icon: 'i-lucide-file-text',
    to: '/blog',
  },
])
</script>

<template>
  <UNavigationMenu
    :items="links"
    variant="link"
  />
</template>
