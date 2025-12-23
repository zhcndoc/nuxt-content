# NuxtHub

> 将您的内容应用部署到 NuxtHub

Nuxt Content 模块内置了与 [NuxtHub](https://hub.nuxt.com) 的集成，用于部署您的内容。

要启用 NuxtHub 集成，您需要安装 `@nuxthub/core` 模块并在 `nuxt.config.ts` 中注册。更高效的做法是使用 `nuxi module` 命令一次完成这两个操作。

```bash [Terminal]
npx nuxi module add hub
```

仅此而已 🎉

<callout>

Nuxt Content 模块会自动读取 NuxtHub 数据库选项，以便共用同一个数据库存储 Nuxt Content 数据。

</callout>

请查看 [NuxtHub 文档](https://hub.nuxt.com) 了解更多信息。
