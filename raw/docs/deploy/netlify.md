# Netlify

> 将您的内容应用部署到 Netlify

<card>

快速设置

- 进入 Netlify 仪表盘，使用 git 仓库创建一个新项目。
- 在 `依赖管理` 下的 `站点配置` 中，将 Node 版本更改为 `20.x` 或更高。
- 进入 `部署`，重试上一次部署。

</card>

---

Nuxt Content 项目可以无需配置即可部署到 Netlify。该模块会自动检测 Netlify 环境并为 Netlify 准备所需的配置。

您只需进入 Netlify 仪表盘，使用 git 仓库创建一个新项目即可。

<note>

默认情况下，Netlify 使用 Node.js 18.x 版本，但该版本不受模块支持。您需要在 `依赖管理` 下的 `站点配置` 中更改 Node.js 版本。

</note>

就是这么简单 🎉

参考资料：

- [Nuxt 部署文档](https://nuxt.com/deploy/netlify)
- [Netlify 文档](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
