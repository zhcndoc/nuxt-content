# 服务器托管

> Node 预设是 Nuxt 和 Nuxt Content 的默认预设。它用于在 Node.js 上构建和运行 Nuxt 应用程序。

## 什么是 Node.js 预设？

Node 预设是 Nuxt 的默认预设，构建项目时，Nuxt 会输出一个 Node.js 服务器，你可以通过 `node .output/server/index.mjs` 来运行它。

## 环境要求

如果你使用默认的 `better-sqlite3` 模块来操作 sqlite 数据库，则必须部署在 Glibc 版本高于 2.29 的操作系统上，例如 Debian 11、Ubuntu 20.04。

<note>

你可以使用 `ldd --version` 检查 Glibc 版本。更多信息请参见 [issue #3248](https://github.com/nuxt/content/issues/3248)。

</note>

## 使用 Node.js 预设构建

使用 Nuxt 构建命令构建项目：

```bash [Terminal]
nuxi build
```

使用 Node 服务器预设运行 `nuxi build` 后，结果将是一个启动可运行 Node 服务器的入口点。

```bash [Terminal]
$ node .output/server/index.mjs
Listening on http://localhost:3000
```

<note>

SQLite 数据库将在服务器启动时在服务器端加载，同时在浏览器中用于客户端导航或操作。

</note>
