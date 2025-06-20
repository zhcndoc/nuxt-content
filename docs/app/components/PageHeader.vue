<script setup lang="ts">
import { kebabCase } from 'scule'
import type { PageCollectionItemBase } from '@nuxt/content'
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  page: PageCollectionItemBase
  headline?: string
}>()

const route = useRoute()

const copyStatus = ref<'idle' | 'copying' | 'copied'>('idle')
const items = ref<DropdownMenuItem[]>([

  {
    label: '复制 Markdown 链接',
    icon: 'i-lucide-link',
    onSelect() {
      navigator.clipboard.writeText(`${window.location.origin}/raw${route.path}.md`)
    },
  },
  {
    label: '查看 Markdown',
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    onSelect() {
      window.open(`${window.location.origin}/raw${route.path}.md`, '_blank')
    },
  },
  {
    label: '在 ChatGPT 中打开',
    icon: 'i-simple-icons:openai',
    target: '_blank',
    onSelect() {
      window.open(`https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${window.location.origin}/raw${route.path}.md so I can ask questions about it.`)}`, '_blank')
    },
  },
  {
    label: '在 Claude 中打开',
    icon: 'i-simple-icons:anthropic',
    target: '_blank',
    onSelect() {
      window.open(`https://claude.ai/new?q=${encodeURIComponent(`Read ${window.location.origin}/raw${route.path}.md so I can ask questions about it.`)}`, '_blank')
    },
  },
])
const copyPage = async () => {
  copyStatus.value = 'copying'
  const markdown = await $fetch<string>(`${window.location.origin}/raw${route.path}.md`)
  await navigator.clipboard.writeText(markdown)
  copyStatus.value = 'copied'
  setTimeout(() => {
    copyStatus.value = 'idle'
  }, 2000)
}
</script>

<template>
  <UPageHeader
    :title="page.title"
    :links="page.links"
    :headline="headline"
  >
    <template #headline>
      <div
        v-if="headline"
        class="w-full justify-between flex"
      >
        {{ headline }}
        <UButtonGroup>
          <UButton
            :label="`${copyStatus === 'copied' ? '已复制' : '复制页面'}`"
            :icon="`i-lucide-${copyStatus === 'copied' ? 'check' : 'copy'}`"
            color="neutral"
            variant="outline"
            :loading="copyStatus === 'copying'"
            @click="copyPage"
          />
          <UDropdownMenu
            :items="items"
            :content="{
              align: 'end',
              side: 'bottom',
              sideOffset: 8,
            }"
            :ui="{
              content: 'w-48',
            }"
          >
            <UButton
              icon="i-lucide-chevron-down"
              color="neutral"
              variant="outline"
            />
          </UDropdownMenu>
        </UButtonGroup>
      </div>
    </template>
    <template #description>
      <MDC
        vif="page.description"
        :cache-key="`${kebabCase(route.path)}-description`"
        :value="page.description"
        unwrap="p"
      />
    </template>
  </UPageHeader>
</template>
