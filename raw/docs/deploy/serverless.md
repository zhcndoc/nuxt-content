# 无服务器托管

> 如何在各种无服务器平台上部署 Nuxt Content。

## 什么是无服务器托管？

无服务器托管让你无需直接管理服务器即可运行代码和应用 —— 你只需上传代码，云服务提供商会自动处理所有基础设施、扩展和维护，只按你实际使用的计算资源收费。

**在无服务器环境中，每个用户请求都会触发一个新的 Nuxt 服务器实例，这意味着每次都是从头开始启动。** 这种“无状态”特性意味着你不能将数据存储在服务器内存中，也不能使用基于文件的数据库如 SQLite。因此，我们需要使用外部数据库服务（如 D1、Turso 或 PostgreSQL）来持久化数据，独立于你的服务器实例。

## 使用无服务器部署

该模块内置支持多个知名无服务器平台，你可以轻松将项目部署到它们上。查看各个平台的指南：

- [NuxtHub](/docs/deploy/nuxthub)
- [Cloudflare Pages](/docs/deploy/cloudflare-pages)
- [Vercel](/docs/deploy/vercel)

如果你想部署到其他平台，可以按照下面的步骤进行。

### 1. 选择数据库服务

在部署项目之前，你需要选择一个数据库服务：

<code-group>

```ts [PostgreSQL]
// 1. 创建一个 PostgreSQL 数据库
// 2. 将 `POSTGRES_URL` 添加到环境变量中
export default defineNuxtConfig({
  content: {
    database: {
      type: 'postgres',
      url: process.env.POSTGRES_URL
    }
  }
})
```

```ts [Cloudflare D1]
// 1. 在你的 Cloudflare 账户中创建一个 D1 数据库
// 2. 使用相同的绑定名将其链接到你的项目
export default defineNuxtConfig({
  content: {
    database: {
      type: 'd1',
      bindingName: '<YOUR_BINDING_NAME>'
    }
  }
})
```

```ts [LibSQL]
// 1. 在 Turso.tech 上创建一个 LibSQL 数据库
// 2. 并添加 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN` 环境变量
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    database: {
      type: 'libsql',
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }
  }
})
```

```ts [NuxtHub]
// 安装 NuxtHub 模块（参见 hub.nuxt.com）
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxthub/core'],
  content: {
    database: {
      type: 'd1',
      binding: 'DB'
    }
  },
  hub: {
    database: true
  }
})
```

</code-group>

### 2. 部署你的项目

Nuxt Content 使用 Nuxt 部署预设来调整不同托管平台的构建流程。

以下无服务器平台支持零配置：

- [Cloudflare](https://nuxt.com/deploy/cloudflare)
- [NuxtHub](https://nuxt.com/deploy/nuxthub)
- [Vercel](https://nuxt.com/deploy/vercel)
- [Netlify](https://nuxt.com/deploy/netlify)

你只需将构建命令设置为：

```bash [Terminal]
nuxi build
```

生成的输出将兼容所选平台。

<note>

链接的数据库将在服务器启动时于服务器端加载。浏览器端将加载一个 [WASM SQLite](/docs/advanced/database#wasm-sqlite-in-browser) 数据库，用于客户端导航和操作。

</note>

<tip>

如果你想部署到 AWS Lambda 或 Azure Static Web Apps，你需要确保你的 sqlite 文件在 `/tmp` 目录下，因为这是唯一可写的文件夹。

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    database: {
      type: 'sqlite',
      filename: '/tmp/contents.sqlite'
    }
  }
})
```

</tip>

### 3. 通过预渲染优化

由于每个请求都会触发一个新的 Nuxt 服务器实例，如果不预渲染部分页面，将影响你的无服务器应用性能。

为了优化你的无服务器应用，你可以使用 `routeRules` 选项预渲染页面：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

<tip to="https://hub.nuxt.com/docs/recipes/pre-rendering">

我们推荐查看 **NuxtHub 的预渲染指南**，了解更多优化无服务器应用的不同策略，该指南适用于所有无服务器平台。

</tip>
