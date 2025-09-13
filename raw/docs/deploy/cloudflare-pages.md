# Cloudflare Pages

> 将您的内容应用部署到 Cloudflare Pages

<card>

快速设置

1. 使用 `nuxi build --preset=cloudflare_pages` 构建您的应用
2. 在 Cloudflare 控制面板中创建 D1 数据库并连接到项目，绑定名称为 `DB`
3. 部署/重新部署您的应用

</card>

---

Nuxt Content 模块内置与 [Cloudflare Pages](https://pages.cloudflare.com) 的集成以部署您的内容。

模块将自动检测构建目标并准备 Cloudflare Pages 所需的配置。

您可以在 `nuxi build` 命令中使用 `--preset=cloudflare_pages` 选项，或者在 `nuxt.config.ts` 中配置该预设。

```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare_pages',
  },
});
```

该模块需要连接一个 D1 数据库才能工作。默认情况下会使用 `DB` 作为绑定名称。您可以通过在 `nuxt.config.ts` 中提供自定义的数据库配置来覆盖该设置。

在创建新的 Cloudflare Pages 项目后，您需要创建一个新的 D1 数据库并将其连接到项目。请确保使用与模块相同的绑定名称。（默认是 `DB`）

就是这么简单 🎉

请查看：

- [Nuxt 部署文档](https://nuxt.com/deploy/cloudflare)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
