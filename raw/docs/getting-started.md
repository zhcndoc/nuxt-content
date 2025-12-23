# Nuxt Content v3

> 专为 Nuxt 开发者设计的强大基于 Git 的 CMS。

欢迎使用 Nuxt Content v3，这是一次重大升级，为您的 Nuxt 项目带来更高性能和创新功能。我们基于 Git 的 CMS 的最新版本针对现代应用开发进行了优化。

## 新功能

### 内容集合

集合用于组织项目中的相关项，帮助您更高效地管理大型数据集。主要优势包括：

- **结构化数据**：在 [`content.config.ts`](/docs/collections/define#defining-collections) 中配置数据库架构并定义集合
- **类型安全查询**：所有工具均支持 TypeScript 直接集成
- **自动验证**：确保 Frontmatter 字段和数据文件（json、yml 等）的一致性
- **高级查询构建器**：轻松过滤、排序和分页集合数据
- **Studio 集成**：通过 [Studio](/studio) 实现更好的表单生成和优化的编辑体验

了解更多关于[内容集合](/docs/collections/define)的信息。

### 性能提升

v2 中的一个主要挑战是用于存储文件的大体积包，特别影响无服务器部署。

v3 通过在生产环境中切换到基于 SQL 的存储解决了这一问题。此转换无需任何配置，支持开发模式、静态生成、服务器托管、无服务器和边缘部署。

<prose-note>

新的数据库系统改进了数据文件的存储和结构方式，确保更佳的性能和可扩展性。此更新全部在后台完成，不影响您在 Content 中使用的文件类型（`yml`、`json` 和 `markdown`）。

</prose-note>

优势包括：

- **优化的查询**：SQL 存储实现超高速数据检索
- **通用兼容性**：我们的基于适配器的系统可整合 SQL 数据库，支持所有部署模式（[服务器](/docs/deploy/server)、[无服务器](/docs/deploy/serverless) 和 [静态](/docs/deploy/static)）。我们欢迎社区贡献更多适配器。

### TypeScript 集成

新的集合系统为您的所有数据自动生成 TypeScript 类型。所有工具和 API 都基于您的集合定义强类型，确保开发过程中的类型安全。

### Nuxt Studio 集成 <badge color="neutral">即将推出</badge>

[Nuxt Studio](/docs/studio/setup) 与 v3 设计上完美互补。[studio 模块](https://github.com/nuxtlabs/studio-module)现已直接集成到 Nuxt Content 中，打造理想环境，开发者专注编码，团队成员则通过直观界面管理内容。

---

我们很高兴您能探索这些新功能。深入阅读文档，了解如何集成该模块并在您的下一个项目中实践最佳方案。

## Content V2 迁移

了解如何从 Content v2 迁移到 v3，请参见[迁移指南](/docs/getting-started/migration)。
