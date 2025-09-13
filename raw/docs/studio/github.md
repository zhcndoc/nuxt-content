# Studio 与 GitHub 之间的实时同步

> Nuxt Studio 与 GitHub 原生同步。安装 Nuxt Studio GitHub 应用，并直接从 Studio 启用内容发布到 GitHub。

<tip>

本节解释了 Studio 与 GitHub 之间的同步行为。此过程直接由平台处理，无需任何外部操作。本页面的目的是提供纯粹的信息。

</tip>

## 概述

Nuxt Studio 集成了 [GitHub](https://github.com) API，实现 Studio 与您的 GitHub 仓库之间的顺畅同步。这一顶级集成是通过利用 [GitHub 应用](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps#about-github-apps) 实现的。

## 安装

在创建 Studio 项目时，您需要在您的个人账户或您管理的组织中安装 [Nuxt Studio GitHub 应用](https://github.com/apps/nuxt-studio)。安装 GitHub 应用需要组织所有权或仓库中的管理员权限。如果您没有必要的权限，仓库所有者需要批准该请求。

您可以通过点击应用内的任意位置的 [使用 GitHub 安装](https://github.com/apps/nuxt-studio/installations/new) 访问安装页面。

### 权限

安装我们的 GitHub 应用时，系统会提示您授予某些权限：

- 对 `actions`、`metadata`、`members` 和 `plan` 的读取权限
- 对 `secrets`、`administration`、`contents`、`pages`、`pull requests` 和 `workflows` 的读写权限

我们需要对 `actions` 的读取权限，以便在拉取请求或仓库默认分支的工作流运行失败时发送通知。`metadata` 是必需的，用于获取仓库数据，`members` 用于导入您的组织成员和仓库协作者，`plan` 用于根据您的 GitHub 账户计划推荐功能。

Nuxt Studio 代表您创建仓库、分支、拉取请求，并执行提交和合并。我们还提供一键部署到 GitHub Pages，支持工作流和环境变量密钥的即时预览和管理。为实现此目的，我们需要对 `administration`、`contents`、`pages`、`pull requests`、`workflows` 和 `secrets` 的读写权限。

### 仓库安装

安装我们的 GitHub 应用时，系统会提示您选择所有仓库或其中的子集。此选择可随时通过访问 [GitHub 应用设置](https://github.com/apps/nuxt-studio/installations/new) 进行更改。

点击 `Install` 后，Nuxt Studio 会安装您所选的每个仓库，使您能够执行上述所有操作。

## 卸载

所有从 GitHub 导入的数据都直接关联到您的 GitHub 应用安装。如果您卸载该 GitHub 应用，所有相关数据将被删除。

如果您删除 GitHub 仓库，关联的 Nuxt Studio 项目也将自动移除。但是，如果该项目订阅了团队计划，订阅不会自动取消。您需要通过 [Lemon Squeezy]() 手动结束订阅，或[联系我们](team@nuxt.studio) 寻求帮助。
