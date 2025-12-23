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

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare_pages',
  },
});
```

## D1 数据库

Nuxt Content 模块的正常工作**需要**连接一个 D1 数据库。默认情况下模块使用绑定名称 **DB**。您可以通过在 `nuxt.config.ts` 中提供您的自定义数据库配置来覆盖该设置，详情见 [数据库配置](/docs/getting-started/configuration#d1)。

创建新的 Cloudflare Pages 项目后，您需要新建一个 D1 数据库并将其连接到项目。请确保使用与模块相同的绑定名称。

### 本地预览

虽然 `nuxi dev` 和 `nuxi build` 不需要额外配置，但使用 `nuxi preview` 进行本地构建测试时，需要配置 Cloudflare 的 Wrangler，以提供一个临时的本地数据库供 Nuxt Content 绑定。此配置可以通过 `wrangler.jsonc` 或 `wrangler.toml` 文件实现。因为 Wrangler 会创建本地数据库，`database_name` 和 `database_id` 可以安全地与生产环境中的值不同，但也可以相同。

```jsonc [wrangler.jsonc]
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "example-db",
      "database_id": "example-db-id"
    }
  ]
}
```

请查看：

- [Nuxt 部署文档](https://nuxt.com/deploy/cloudflare)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Create and bind a D1 database](https://developers.cloudflare.com/d1/get-started/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
