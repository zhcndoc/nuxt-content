# Cloudflare Workers

> 将您的内容应用部署到 Cloudflare Workers

<card>

快速设置

1. 使用 `cloudflare_module` 预设和 `2024-09-19` 或更晚的兼容日期。
2. 在 Cloudflare 控制面板中创建一个 D1 数据库，并在项目中以 `DB` 绑定名称连接该数据库，同时在 `nuxt.config.ts` 文件中配置数据库。
3. 构建并部署您的应用

</card>

---

Nuxt Content 模块内置对 [Cloudflare Workers](https://workers.cloudflare.com) 的集成，用于部署您的内容。

该模块会自动检测构建目标，并为 Cloudflare Workers 准备所需的配置。

您只需创建一个 Cloudflare D1 数据库并连接到您的项目即可。创建 D1 数据库后，应该在 `nuxt.config.ts` 文件中通过 `nitro.cloudflare.wrangler.d1_databases` 选项定义数据库配置。

默认情况下，模块会使用 `DB` 绑定名称。您可以通过在 `nuxt.config.ts` 中提供自定义的数据库配置来覆盖默认配置。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      wrangler: {
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'database-name',
            database_id: '*********-***-****-****-*********'
          }
        ]
      },
    },
  }
})
```

<note>

如果您想使用不同的绑定名称，可以通过在 `nuxt.config.ts` 中提供自定义数据库配置进行覆盖。详见 [数据库配置](/docs/getting-started/configuration#d1)

</note>

<note>

要将 Nuxt 项目部署到 Cloudflare Workers，您需要使用 `2024-09-19` 或更晚的兼容日期。

</note>

使用 `nuxi build` 命令构建项目，然后可以用 `wrangler deploy` 命令部署项目。

```bash
npx wrangler deploy
```

完成！ 🎉

查看：

- [Nuxt 部署文档](https://nuxt.com/deploy/cloudflare)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
