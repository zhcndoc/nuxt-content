# 设置 Nuxt Studio

> 了解如何安装和配置 Nuxt Studio，通过 GitHub 认证在生产环境中编辑您的内容。

<note to="https://nuxt.studio/docs/setup">

本说明文档仅涵盖全新的开源 Nuxt Studio 模块。<br />


点击此处查看传统独立平台的文档。

</note>

## 安装

将 Nuxt Studio 模块添加到您的项目中：

<code-group>

```bash [pnpm]
pnpm add nuxt-studio@alpha
```

```bash [npm]
npm install nuxt-studio@alpha
```

```bash [yarn]
yarn add nuxt-studio@alpha
```

```bash [bun]
bun add nuxt-studio@alpha
```

</code-group>

或者，使用 Nuxt CLI 自动添加模块：

```bash [Terminal]
npx nuxt module add nuxt-studio@beta
```

<tip icon="i-lucide-rocket">

启动您的开发服务器，开始编辑您的 Nuxt Content 网站。

</tip>

## 开发模式

前面的步骤即可让您编辑内容。只需点击页面左下角的浮动按钮。

本地运行时，**任何文件更改都会与本地文件系统实时同步**。

<note>

发布系统仅在生产模式下可用。请继续使用您当前的工作流程（git 命令、IDE、GitHub Desktop……）提交更改。

</note>

## 生产模式

Studio 的主要优势是可以直接从生产网站发布内容更改。此功能需要两个配置：

<steps>

### Git 提供商

配置您的内容存储位置及提交变更的仓库：

<tip to="/docs/studio/git-providers">

了解更多关于 GitHub 和 GitLab 提供商的信息。

</tip>

### 认证提供商

配置用户认证方式以访问 Studio。可选择 GitHub、GitLab、Google OAuth，或自定义认证：

<tip to="/docs/studio/auth-providers">

请按照您的认证提供商的完整安装指南操作。

</tip>

### 部署

Nuxt Studio 需要服务器端路由来处理身份验证。

虽然通过 [Nuxt 混合渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering#hybrid-rendering) 支持静态生成，但您的站点必须 **部署在支持服务器端渲染（SSR）** 的平台上，并使用 `nuxt build` 命令。

如果您想预渲染所有页面，可以使用如下配置：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    prerender: {
      // 预渲染首页
      routes: ['/'],
      // 然后爬取页面上的所有链接
      crawlLinks: true
    }
  }
})
```

## 配置

将模块添加到您的 `nuxt.config.ts` 并配置 GitHub 仓库：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    // Studio 后台管理路由（默认：'/_studio'）
    route: '/_studio',
    
    // GitHub 仓库配置（必须指定 owner 和 repo）
    repository: {
      provider: 'github', // 目前仅支持 GitHub
      owner: 'your-username', // 您的 GitHub 用户名或组织
      repo: 'your-repo', // 您的仓库名称
      branch: 'main', // 提交的分支（默认：main）
      rootDir: '' // 可选：如果您的 Nuxt 应用在子目录（默认：''）
    }
  }
})
```

<callout>

如果您的 Nuxt Content 应用位于 monorepo 或子目录中，请指定 `rootDir` 选项以指向正确的位置。

</callout>

## GitHub OAuth 应用

Nuxt Studio 使用 GitHub OAuth 进行身份认证。

<prose-steps>

### 访问 GitHub 开发者设置

前往 [GitHub 开发者设置](https://github.com/settings/developers)，点击 **New OAuth App**（创建新的 OAuth 应用）

### 配置 OAuth 应用

填写必填字段：

- **Application name**（应用名称）：您的应用名称
- **Homepage URL**（主页 URL）：`https://yourdomain.com`
- **Authorization callback URL**（授权回调 URL）：`https://yourdomain.com`

<note>

如果您想在本地试用 Studio，请将回调 URL 设置为本地地址 `http://localhost:3000`

</note>

### 复制您的凭据

创建 OAuth 应用后，您将获得：

- **Client ID**（客户端 ID，立即可见）
- **Client Secret**（客户端密钥，点击 **Generate a new client secret** 生成）

### 设置环境变量

将 GitHub OAuth 凭据添加到您的部署平台的环境变量，或在本地的 `.env` 文件中添加：

```bash [.env]
# Example with GitHub OAuth
STUDIO_GITHUB_CLIENT_ID=<your_client_id>
STUDIO_GITHUB_CLIENT_SECRET=<your_client_secret>
```

## 使用预发布/预览分支

默认情况下，Studio 会将更改提交到配置指定的分支（通常是 `main`）。但是，您可以配置 Studio 使用预发布或预览分支。

这对于您在合并到生产环境之前，在预览环境中审核更改非常有用。目前可以手动在 GitHub 上处理拉取请求，自动创建 PR 功能已经在规划中，将在未来版本中实现。

<prose-steps>

### 配置

更新您的 `nuxt.config.ts`，指定使用预发布分支。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    repository: {
      owner: 'your-username',
      repo: 'your-repo',
      branch: PROCESS.ENV.STUDIO_GITHUB_BRANCH_NAME, // 使用预发布分支代替 main
    }
  }
})
```

<tip>

您可以使用环境变量来管理不同环境的多个分支。

</tip>

### 部署

配置您的托管平台将预发布分支部署到预览 URL（例如 `staging.yourdomain.com`）。

### 创建单独的 GitHub OAuth 应用

专门为预发布环境创建一个新的 OAuth 应用：

- **Application name**：您的应用名称（Staging）
- **Homepage URL**：`https://staging.yourdomain.com`
- **Authorization callback URL**：`https://staging.yourdomain.com`

### 设置环境变量

为预发布部署配置预发布 OAuth 凭据及分支名称：

```bash [.env.staging]
STUDIO_GITHUB_CLIENT_ID=<your_staging_github_client_id>
STUDIO_GITHUB_CLIENT_SECRET=<your_staging_github_client_secret>
STUDIO_GITHUB_BRANCH_NAME=<your_staging_branch_name>
```

### 访问预发布环境的 Studio

访问 `https://staging.yourdomain.com/_studio` 进行内容编辑。所有提交将推送到您配置的预发布分支。

### 合并到生产

当您对预发布分支上的更改满意后，创建来自预发布分支到主分支的拉取请求（PR），以部署到生产环境。

<note>

**拉取请求自动化功能即将上线**

<br />

未来版本计划实现 Studio 自动创建拉取请求功能。目前，您需要在 GitHub 手动创建 PR，将预发布更改合并到主分支。

</note>

<steps>

### 访问 Studio

部署完成后，通过访问配置的路由（默认：`/_studio`）打开 Studio 界面：

1. 点击 **用 GitHub 登录**，如果未直接重定向到 OAuth 应用授权页面
2. 授权 OAuth 应用
3. 系统会重定向回 Studio，您即可开始编辑内容

</steps>
</prose-steps>
</prose-steps>

<note>

基于 OAuth 的安全登录（包括 **Google** 登录）将在 Beta 版本中快速推出。

</note>

<tip>

您还可以使用快捷键 <kbd value="meta">



</kbd>

 + <kbd value=".">



</kbd>

 快速跳转到 Studio 路由。

</tip>

## 开发模式

Nuxt Studio 包含一个 **实验性** 的开发模式，支持实时文件系统同步：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    development: {
      sync: true // 启用开发模式
    }
  }
})
```

启用后，Nuxt Studio 会：

- ✅ 直接写入您本地的 `content/` 目录中的更改
- ✅ 写入媒体文件更改到本地的 `public/` 目录
- ❌ 监听文件系统变化并更新编辑器
- ❌ 提交更改至您的仓库（请继续使用传统工作流程提交）

#### 目录根路径 `默认值: ''`

如果您的 Nuxt Content 应用位于 monorepo 或子目录中，请指定 `rootDir` 选项以指向正确的位置：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    repository: {
      ...
      rootDir: 'docs'
    }
  }
})
```

#### 私有仓库访问 `默认值: true`

默认情况下，Studio 会请求访问公共和私有仓库。

若设置 `private: false`，则 OAuth 认证范围仅限公共仓库，这在处理公共仓库时出于安全或合规考虑可能更合适：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    repository: {
      ...
      private: false
    }
  }
})
```

### 国际化

Nuxt Studio 内置多语言支持，当前可用语言包括：

- 🇬🇧 **英语**（默认）
- 🇸🇦 **阿拉伯语**
- 🇧🇬 **保加利亚语**
- 🇩🇪 **德语**
- 🇪🇸 **西班牙语**
- 🇮🇷 **波斯语**
- 🇫🇮 **芬兰语**
- 🇫🇷 **法语**
- 🇮🇩 **印尼语**
- 🇮🇹 **意大利语**
- 🇯🇵 **日语**
- 🇳🇱 **荷兰语**
- 🇵🇱 **波兰语**
- 🇧🇷 **巴西葡萄牙语**
- 🇺🇦 **乌克兰语**
- 🇨🇳 **中文**

通过在 `nuxt.config.ts` 中添加 `i18n` 选项来设置您偏好的语言：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    i18n: {
      defaultLocale: 'fr' // 可选 'en'、'fr' 或 'de'
    }
  }
})
```

语言包将翻译：

- 所有界面元素和标签
- Monaco 编辑器的代码片段和自动完成
- 上下文消息和通知

<callout icon="i-lucide-heart-handshake">

欢迎社区贡献新的语言翻译！如果您想新增支持的语言，请访问 [GitHub 仓库](https://github.com/nuxt-content/studio) 并提交 Pull Request。

</callout>

### 开发模式

如果想在本地测试生产环境配置，请禁用开发模式：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  studio: {
    dev: false
  }
})
```

确保您配置的 OAuth 提供商的回调地址指向本地开发服务器（通常是 [http://localhost:3000](http://localhost:3000)）。

</steps>
