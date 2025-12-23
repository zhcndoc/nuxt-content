# 静态托管

> 如何使用静态站点生成将 Nuxt Content 部署到静态托管。

## 什么是静态托管？

静态托管是一种托管类型，您的网站被构建并作为静态文件（HTML、CSS、JS）进行服务，任何静态文件服务器都可以提供这些文件。

Nuxt Content 可以使用 Nuxt 预渲染部署到静态托管。

## 使用 SSG 构建

要使用静态站点生成构建您的应用，请运行以下命令：

```bash
npx nuxi generate
```

<tip icon="i-lucide-check">

此命令将创建一个包含您的静态站点的 `dist/` 目录。您可以将其上传到任何静态托管服务。

</tip>

Nuxt 将使用内部爬虫自动预渲染所有页面，您可以通过 `nitro.prerender` 选项自定义其行为。

<note to="https://nuxt.com/docs/getting-started/prerendering">

了解更多关于 Nuxt 预渲染的信息。

</note>

## 数据库怎么办？

Nuxt Content 将使用 [WASM SQLite](/docs/advanced/database#wasm-sqlite-in-browser) 在浏览器中加载数据库，这样，内容查询发生在客户端导航或操作时时，会在浏览器中运行。
