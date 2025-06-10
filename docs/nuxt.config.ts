import { readFileSync } from 'node:fs'
import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'pathe'
import pkg from '../package.json'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-llms',
  ],

  app: {
    rootAttrs: {
      // @ts-expect-error - vaul-drawer-wrapper is not typed
      'vaul-drawer-wrapper': '',
      'class': 'bg-(--ui-bg)',
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  site: {
    url: 'https://nuxt-content.zhcndoc.com',
  },

  content: {
    experimental: {
      nativeSqlite: true,
    },
    build: {
      markdown: {
        toc: {
          depth: 4,
          searchDepth: 4,
        },
        highlight: {
          langs: ['docker'],
        },
      },
    },
    preview: {
      dev: true,
      api: 'https://api.nuxt.studio',
    },
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  ui: {
    fonts: false,
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  routeRules: {
    ...(readFileSync(resolve(__dirname, '_redirects'), 'utf-8'))
      .split('\n')
      .filter(line => line.trim().length && !line.trim().startsWith('#'))
      .reduce((acc, line) => {
        const [from, to] = line.split('=') as [string, string]
        return Object.assign(acc, { [from]: { redirect: to } })
      }, {} as Record<string, { redirect: string }>),
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-09',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            '/docs/*',
          ],
        },
      },
    },
  },

  hub: {
    database: true,
    cache: true,
  },

  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:arrow-left',
        'lucide:arrow-up-right',
        'lucide:book-open',
        'lucide:cloud-upload',
        'lucide:file-pen-line',
        'lucide:file',
        'lucide:history',
        'lucide:monitor',
        'lucide:moon',
        'lucide:square-code',
        'lucide:square-function',
        'lucide:sun',
        'lucide:terminal',
        'lucide:x',
        'vscode-icons:file-type-bun',
        'vscode-icons:file-type-npm',
        'vscode-icons:file-type-nuxt',
        'vscode-icons:file-type-pnpm',
        'vscode-icons:file-type-yaml',
        'vscode-icons:file-type-yarn',
      ],
    },
    serverBundle: 'local',
  },

  image: {
    provider: 'ipx',
  },

  llms: {
    domain: 'https://nuxt-content.zhcndoc.com',
    title: 'Nuxt Content 中文文档',
    description: 'Nuxt Content 是一个基于 Git 的无头内容管理系统，专为 Nuxt 设计',
    notes: [
      'The documentation only includes Nuxt Content v3 docs.',
      'The content is automatically generated from the same source as the official documentation.',
    ],
    full: {
      title: 'Complete Documentation',
      description: 'The complete documentation including all content',
    },
  },

  ogImage: {
    zeroRuntime: true,
  },
})
