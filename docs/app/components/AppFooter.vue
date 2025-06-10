<script setup lang="ts">
// const route = useRoute()

// const items = [{
//   label: 'Figma Kit',
//   to: 'https://www.figma.com/community/file/1288455405058138934',
//   target: '_blank'
// }, {
//   label: 'Playground',
//   to: 'https://stackblitz.com/edit/nuxt-ui',
//   target: '_blank'
// }, {
//   label: 'Roadmap',
//   to: '/roadmap'
// }, {
//   label: 'Releases',
//   to: '/releases'
// }]
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter>
    <template #left>
      <!-- {{ footer.credits }} -->
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        <a
          target="_blank"
          href="https://www.zhcndoc.com"
        > 简中文档 </a>
        ｜
        <a
          rel="nofollow"
          target="_blank"
          href="https://beian.miit.gov.cn"
        > 沪ICP备2024070610号-3 </a>
      </p>
    </template>

    <!-- <UNavigationMenu :items="items" variant="link" color="neutral" /> -->

    <template #right>
      <UButton
        aria-label="Nuxt Content on Discord"
        icon="i-simple-icons-discord"
        to="https://discord.gg/sBXDm6e8SP"
        target="_blank"
        color="neutral"
        variant="ghost"
      />
      <UButton
        aria-label="Nuxt on BlueSKy"
        icon="i-simple-icons-bluesky"
        to="https://go.nuxt.com/bluesky"
        target="_blank"
        color="neutral"
        variant="ghost"
      />
      <UButton
        aria-label="Nuxt on X"
        icon="i-simple-icons-x"
        to="https://x.com/nuxtstudio"
        target="_blank"
        color="neutral"
        variant="ghost"
      />
      <UButton
        aria-label="Nuxt Content on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/content"
        target="_blank"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
