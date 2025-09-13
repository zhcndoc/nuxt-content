# AWS Amplify

> 将您的 Content 应用部署到 AWS Amplify

<card>

快速设置

- 在您的项目中安装 `sqlite3` 包。
- 访问 AWS Amplify 控制台，使用 Git 仓库创建一个新项目并部署应用。

</card>

---

Nuxt Content 项目可以零配置部署到 AWS Amplify。
该模块会自动检测 AWS Amplify 环境，并准备好部署所需的配置。

您只需在项目中安装 `sqlite3` 包，然后访问 AWS Amplify 控制台，使用 Git 仓库创建一个新项目即可。

就是这么简单 🎉

<note>

默认情况下，模块会使用位于 `/tmp` 目录下的 SQLite 数据库。您也可以通过提供自定义数据库配置来覆盖默认配置。

</note>

参考链接：

- [Nuxt 部署文档](https://nuxt.com/deploy/aws-amplify)
