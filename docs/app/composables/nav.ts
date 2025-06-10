import colors from 'tailwindcss/colors'

export const useNavLinks = () => {
  const route = useRoute()

  return computed(() => [{
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
    icon: 'i-lucide-panels-top-left',
    to: '/templates',
  }, {
    label: '博客',
    icon: 'i-lucide-file-text',
    to: '/blog',
  }, {
    label: '更新日志',
    icon: 'i-lucide-history',
    to: '/changelog',
  }])
}

export const useThemeColor = () => {
  const colorMode = useColorMode()
  const appConfig = useAppConfig()

  return computed(() => colorMode.value === 'dark' ? colors[appConfig.ui.colors!.neutral as keyof typeof colors][900] : 'white')
}
