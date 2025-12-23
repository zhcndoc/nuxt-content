import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/plausible', '@vueuse/nuxt', '@nuxthub/core', 'nuxt-studio'],
  css: ['~/assets/css/main.css'],
  site: {
    name: 'Nuxt Content 中文文档',
    url: 'https://nuxt-content.zhcndoc.com',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    build: {
      markdown: {
        highlight: {
          langs: ['docker', 'json'],
        },
      },
    },
  },
  ui: {
    fonts: false,
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
  nitro: {
    compatibilityDate: {
      // Don't generate observability routes
      vercel: '2025-07-14',
    },
  },
  hub: {
    db: 'sqlite',
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
  studio: {
    route: '/admin',
    repository: {
      owner: 'nuxt',
      repo: 'content',
      branch: 'main',
      rootDir: 'docs',
    },
  },
})
