# 插槽

> 将 Markdown 注入 Vue 组件的最快方法。

当你在组件内使用 MDC 语法编写内容和段落时，可以使用 Vue 的 `<slot>` 组件来渲染内容。

## 用法

如果你不想修改渲染的内容，只需使用 Vue 的 `<slot>` 组件。

```vue [components/content/Callout.vue]
<template>
  <div class="callout">
    <slot />
  </div>
</template>
```

现在我们在 Markdown 中使用它：

```mdc [content/index.md]
::callout
这是一个呼出框。
::
```

渲染后的 HTML 将会是：

```html
<div class="callout">
  <p>这是一个呼出框。</p>
</div>
```

这种用法类似于使用原生的 `<slot>` 组件。

### 解除包裹

`mdc-unwrap` 属性允许你从渲染的内容中移除一个或多个包裹元素。当你想提取嵌套在原生 Markdown 语法中的内容时，这非常有用。指定的每个标签都会从 AST 中被移除。

让我们从上面的示例中解除 `<p>` 元素的包裹：

```vue [components/content/Callout.vue]
<template>
  <div class="callout">
    <slot mdc-unwrap="p" />
  </div>
</template>
```

现在渲染的 HTML 将会是：

```html
<div class="callout">
  这是一个呼出框。
</div>
```

### 命名插槽

`name` 属性允许你通过名称绑定一个插槽。当你想渲染非默认插槽时，这非常有用。

让我们改进 `Callout` 组件，增加一个 `title` 插槽：

```vue [components/content/Callout.vue]
<template>
  <div class="callout">
    <h2 v-if="$slots.title">
      <slot name="title" mdc-unwrap="p" />
    </h2>
    <slot />
  </div>
</template>
```

现在我们在 Markdown 中使用它：

```mdc [content/index.md]
::callout
#title
请小心！
#default
使用 MDC & Vue 组件会上瘾。
::
```

这将生成：

```html
<div class="callout">
  <h2>请小心！</h2>
  <p>使用 MDC & Vue 组件会上瘾。</p>
</div>
```

当不使用 `title` 插槽时，`h2` 元素将不会被渲染。

## 属性

- `mdc-unwrap`：是否解除内容的包裹。当你想提取嵌套在原生 Markdown 语法中的内容时，这非常有用。指定的每个标签都会从 AST 中被移除。

  - **类型：** `boolean` 或 `string`
  - **默认值：** `false`
  - **示例：** `'p'` 或 `'ul li'`
