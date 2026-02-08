---
title: 认识 Docus 的 AI 助手
authors:
  - name: Hugo Richard
    avatar:
      src: https://avatars.githubusercontent.com/u/71938701?v=4
    to: https://x.com/hugorcd
    username: hugorcd
  - name: Baptiste Leproux
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
    to: https://x.com/_larbish
    username: larbish
categories: []
category: docus
date: 2026-02-04T00:00:00.000Z
description: 只需一个环境变量，秒级配置你的助手。快速且实时的搜索。利用自定义工具打造属于你自己的助手。
draft: false
image:
  src: /blog/docus-assistant.png
  alt: Docus AI 助手界面
seo:
  title: 认识 Docus 的 AI 助手 | 给你的文档添加 AI 功能
  description: 真正有效的 AI 驱动文档搜索。生成代码，扩展自定义工具。零基础设施，只需添加你的 API 密钥。
---

文档的价值取决于用户能够从中提取答案的能力。我们推出了 Docus AI 助手——一种原生嵌入式聊天体验，彻底改变开发者与文档的互动方式。

AI 助手能够搜索你的内容并生成用户可以直接复制的代码示例。最棒的是？**只需设置一个环境变量即可激活。**

:video{.w-full.h-auto.rounded-md autoplay controls loop muted playsinline src="https://res.cloudinary.com/nuxt/video/upload/v1770204403/studio/docus-assistant_e8xmxu.mp4"}

## 文档发现的问题

用户访问你的文档时带着的是问题，而不是关键词。他们浏览导航，猜测搜索词，扫描页面希望找到所需内容。即使是结构良好的文档，也在他们头脑中的问题与页面上的答案之间制造了摩擦。

AI 改变了这种局面。用户无需调整问题去匹配你的导航结构，可以自然提问，并得到基于你实际文档的答案。

## 只需一个环境变量即可激活

Docus 抽象了 AI 设置的复杂性，仅通过一个环境变量即可启用你自己的 AI 助手聊天。

```bash [.env]
AI_GATEWAY_API_KEY=your-api-key
```

::note
除非部署在 Vercel，否则需要一个**Vercel AI Gateway API 密钥**。如果部署在 Vercel，则无需 API 密钥或任何配置。可用 5 美元额度免费测试！
::

就这么简单。部署你的文档后，AI 助手即自动激活。无需配置文件，无需 API 设置，无需基础设施变动。

该助手通过 [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) 工作，支持 OpenAI、Anthropic、Google 等多种提供商。选择你喜欢的模型和预算，集成方式保持不变。

::prose-tip{to="https://docus.dev/en/ai/assistant#quick-start"}
阅读 Docus 文档中的完整设置指南。
::

## 工作原理

### MCP 集成

AI 助手利用 **Model Context Protocol (MCP)** 让 AI 模型直接访问你的文档。架构简单：

1. Docus 会自动在 `/mcp` 端点暴露一个 **MCP 服务器**，该服务器提供搜索和检索文档的工具
2. 当你提供 `AI_GATEWAY_API_KEY` 时，AI 模型连接到你的 MCP 服务器
3. AI 使用 MCP 工具实时搜索文档并提供准确答案

这种方式通过将每个回答都基于真实内容来防止“幻觉”。AI 只能根据你的文档内容作答。

MCP 协议是一种开放标准，允许 AI 模型通过定义良好的工具与外部数据源交互。Docus 自动实现这一协议，你只需提供 API 密钥。

### AI 定制

MCP 集成的真正强大之处在于**可扩展性**。Docus 底层使用 `@nuxtjs/mcp-toolkit`，允许你添加自定义工具，扩展 AI 助手的功能，不仅仅是搜索文档。

想让 AI 检查 API 状态、获取实时数据、运行代码示例或与你自有服务交互？在项目中添加自定义 MCP 工具：

```typescript [server/mcp/tools/check-api-status.ts]
export default defineMcpTool({
  description: '检查当前 API 状态',
  inputSchema: z.object({
    endpoint: z.string().describe('需要检查的 API 端点')
  }),
  handler: async ({ endpoint }) => {
    const status = await checkEndpointStatus(endpoint)
    return {
      content: [{
        type: 'text',
        text: `API 端点 ${endpoint} 的状态是 ${status}`
      }]
    }
  }
})
```

AI 助手会自动发现并使用你的自定义工具。用户现在可以问 **“API 是否宕机？”** 并获得实时答案，而不仅仅是查文档。

::note
你可以通过以下方式覆盖 AI 助手的不同方面：

- **自定义工具**：在 `server/mcp/tools/` 使用 `defineMcpTool` 添加任何功能
- **资源**：通过 `server/mcp/resources/` 暴露文件或数据
- **提示模板**：在 `server/mcp/prompts/` 创建可复用的提示模板
- **自定义处理器**：为特殊情况创建独立的 MCP 端点
::

::prose-tip{to="https://docus.dev/ai/mcp#customization"}
在 Docus 文档中了解更多关于 MCP 定制的信息。
::

### 问题配置

用户可以在当前阅读页面直接提问。助手理解当前上下文，并能引用你正在查看的页面。

配置为可选，但功能强大。你可以预置常见问题、调整 UI 可见性、自定义快捷键，或禁用不需要的功能，在 `app.config.ts` 文件中配置：

```typescript [app.config.ts]
export default defineAppConfig({
  docus: {
    ai: {
      floatingInput: true,
      explainWithAI: true,
      faqs: [
        {
          question: '如何安装 Docus？',
          category: '快速入门'
        },
        {
          question: '我可以自定义主题吗？',
          category: '自定义'
        }
      ]
    }
  }
})
```

### 国际化

AI 助手会自动适配你的文档语言设置。所有界面文本根据用户语言本地化，助手也用用户语言回答。

如果你的文档支持多语言，助手在所有语言中均可使用，无需额外配置。只需设置同一个环境变量，即可为所有语言启用 AI。

## 主要优势

### 为开发者而设计

AI 助手融合了开发者浏览文档的方式：

- **浮动输入框**（`Cmd/Ctrl+I`）：底部聊天框，支持快捷键快速调出
- **用 AI 解释按钮**：侧边栏按钮，带当前页面上下文开启助理
- **滑出面板**：持久会话历史，方便持续互动

### 代码生成

除了回答问题，助手还能基于你的文档模式生成代码示例。用户可以直接在聊天窗口复制实现，无需翻找示例仓库。

助手理解你的 API 结构，熟悉你的规范，生成符合文档风格的示例代码。

### 隐私与掌控

你的文档内容完全掌控在你手中。AI 助手查询的是你已发布的、网站上公开可见的内容。无额外索引，无数据收集，无外部数据库。

你通过 Vercel AI Gateway 控制 AI 提供商，能够根据隐私需求、延迟要求或成本预算选择模型。切换供应商无需改动文档代码。

## 立即开始

::prose-tip
**刚接触 Docus？** 创建一个内置 AI 助手的完整文档站点：

```bash
npx skills add nuxt-content/docus
```

然后在你的 AI 代理（Claude、Cursor 或任意支持 Skills 的代理）中运行 `/create-docs` 命令，即可自动生成全部内容。
::

已有 Docus 站点？只需添加一个环境变量即可启用 AI 助手：

```bash [.env]
AI_GATEWAY_API_KEY=your-api-key
```

部署后助手自动激活。

AI 助手代表了开发者与文档互动方式的转变。不再是被动搜索答案，而是互动对话。不再仅仅解析示例，而是生成代码。

::prose-tip{to="https://docus.dev/ai/assistant"}
阅读完整的 AI 助手文档。
::

## 未来展望

我们不断探索使文档更具互动性和帮助性的全新方式。AI 助手只是当你将优质文档与智能工具结合时可能实现的开始。

文档正从静态参考资料，演变为交互式学习环境，我们也非常期待这段旅程将引领我们走向何方。