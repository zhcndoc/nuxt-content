---
title: Nuxt Studio 可视化编辑器幕后揭秘
description: 探索 Nuxt Studio 可视化编辑器的内部工作原理，以及它如何解析 Markdown 语法并重新生成内容。
image:
  src: /blog/visual-editor.webp
authors:
  - name: Baptiste Leproux
    avatar:
      src: https://avatars.githubusercontent.com/u/7290030?v=4
    to: https://x.com/_larbish
    username: larbish
  - name: Ferdinand Coumau
    avatar:
      src: https://avatars.githubusercontent.com/u/98885012?v=4
    to: https://x.com/CoumauFerdinand
    username: CoumauFerdinand
date: 2024-09-04T00:00:00.000Z
category: studio
---

## **简介**

Nuxt Studio 为开发者和内容撰写者提供了多功能的工作空间，允许他们在两个截然不同的编辑器之间进行选择，用于内容的创建和管理：Markdown 编辑器和可视化编辑器。

![从项目设置中选择你喜欢的编辑器](/blog/favorite-editor.webp)

每个编辑器都有其独特的用途——有些用户习惯于 Markdown 编辑，而另一些则更喜欢非技术化的可视化方式。

最终，**这两种编辑器的最终输出都是 Markdown 语法**。

本文将阐述可视化编辑器背后的技术流程，探讨它如何解析 Markdown、如何转换回 Markdown，以及为何这一过程有时可能会导致与原始内容的差异。

## **Markdown 编辑器**

![在 Nuxt Studio 中直接编辑 Markdown](/blog/markdown-editor.webp)

Nuxt Studio 中的 Markdown 编辑器允许你完全控制内容，可以直接编写 [MDC](/docs/files/markdown)（增强型 Markdown 语法）。该语法支持直接将 Vue 组件集成到 Markdown 文件中，提供了更灵活的页面结构编排能力。

当你在 Markdown 编辑器中保存文件时，内容会完全保持你所编写的形式，保留所有特定语法与格式。对于熟悉 Markdown 并希望精确控制内容布局和结构的用户来说，这款编辑器是理想选择。

## **可视化编辑器**

![在 Nuxt Studio 中使用可视化编辑器编辑你的内容](/blog/visual-editor.webp)

可视化编辑器是一种基于 [TipTap](https://tiptap.dev/) 和 [ProseMirror](https://prosemirror.net/) 构建的所见即所得（WYSIWYG）工具，旨在屏蔽 Markdown 语法的复杂性，提供更直观的视觉编辑体验。对于不想直接处理原始 Markdown 代码的用户，这款编辑器尤其友好。

### **可视化编辑器如何处理文件**

当你用可视化编辑器打开 Markdown 文件时，Nuxt Studio 首先会解析原始 Markdown 文件。借助 [MDC 模块](https://github.com/nuxt-modules/mdc)，它生成一个抽象语法树（AST）。随后，该 AST 被转换为 TipTap 兼容的格式（TipTap AST），以便编辑器能够精准地可视化渲染文档内容。

一旦可视化编辑器展示内容，用户便可通过直观的视觉方式进行更新。在幕后，编辑器持续地将 TipTap AST 转换回 MDC AST，再回转为 MDC 语法，确保内容始终保持 Markdown 格式。

### **为什么未修改内容时原始 Markdown 文件会发生变化**

![检测到自动 Markdown 解析时弹出提醒](/blog/automatic-parsing-modal.webp)

#### **非关键性变化**

当可视化编辑器将视觉格式转换回 Markdown 时，会应用一套预设的 Markdown 标准解析算法。这些标准有时可能与原内容存在细微差别。这类变化通常影响不大，仅仅是 Markdown 语法的另一种有效写法，渲染后的网站表现应保持一致。

#### **关键性变化**

理想情况下，Markdown 的所有特性都能在可视化编辑器中有直接而准确的对应。我们已构建自定义 TipTap 扩展，以支持自定义 MDC 语法，例如 [Vue 组件](/docs/files/markdown#vue-components)编辑或 [front-matter](/docs/files/markdown#front-matter) 等。然而，在个别罕见的情况下，尤其是涉及复杂或不常见的 Markdown 元素时，可视化编辑器可能无法完全支持或正确解析这些元素。此时，编辑器可能会在解析过程中对这些元素进行近似处理、简化乃至省略。

这类差异可能导致转换回 Markdown 时出现数据丢失或回退。虽然这种情况较少发生，但有可能影响内容的展示效果或功能。

我们的主要目标是防止任何内容丢失，保持 Markdown 文件的完整性。如果你遇到从可视化编辑器切换回 Markdown 时出现不完美的情况，欢迎在我们的 Discord 服务器上反馈。你的反馈对我们改进和完善可视化编辑器极为重要，能确保满足所有用户的需求。

## **减少非预期变化的最佳实践**

为避免丢失重要格式或内容，请遵循以下建议：

- **避免使用复杂的 HTML 结构**。由于 MDC 语法允许集成 Vue 组件，更推荐创建可复用组件，方便插入 Markdown 并在编辑器内编辑，而不是依赖复杂的 HTML 代码。
- **保持编辑器的一致性**。尽可能选择最适合你需求的编辑器，并在整个页面编辑过程中保持使用同一编辑器。
- **切换编辑器后务必检查变更**。切换编辑器后，务必在审核页面检查 Markdown 内容，并通过预览确保没有重要元素被修改。

## **结语**

在 Nuxt Studio 中切换 Markdown 编辑器和可视化编辑器可以带来灵活的编辑体验，但需要注意背后的技术影响。

理解可视化编辑器如何处理和转换 Markdown，有助于确保你所撰写的 Markdown 内容能准确地在可视化编辑器中显示，使非技术用户能够轻松编辑所有内容，而不破坏原始 Markdown 文件。

###