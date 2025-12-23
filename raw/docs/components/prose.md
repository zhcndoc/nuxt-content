# 文章组件

> 一份文章组件列表。

文章组件是 HTML 排版标签的替代品。文章组件提供了一种简便的方式来自定义内容界面。

要覆盖文章组件，请在项目的 `components/content/` 目录下创建同名组件（例如：`components/content/ProseA.vue`）。

<note>

文章组件最初是 [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc) 的一部分。

</note>

## `ProseA`

<code-group>

```md [代码]
[文章组件](/docs/components/prose)
```

<code-preview label="预览" icon="i-lucide-eye">

[文章组件](/docs/components/prose)

</code-preview>
</code-group>

## `ProseBlockquote`

<code-group>

```md [代码]
> 块引用
```

<code-preview label="预览" icon="i-lucide-eye">

> 块引用

</code-preview>
</code-group>

## `ProsePre`

<code-group>

```md [代码]
```js [file.js]{2} meta-info=val
  export default () => {
    console.log('代码块')
  }
  ```
```

<code-preview label="预览" icon="i-lucide-eye">

```js [file.js]
export default () => {
  console.log('代码块')
}
```

</code-preview>
</code-group>

组件属性示例如下：

```json
{
  code: "export default () => {\n    console.log('代码块')\n}"
  language: "js"
  filename: "file.js"
  highlights: [2]
  meta: "meta-info=val"
}
```

有关语法高亮的更多内容，请查看[高亮选项](/docs/getting-started/configuration#highlight)。

<callout type="warning">

如果你想在文件名中使用 `]`，需要用两个反斜杠进行转义：`\\]`。这是必须的，因为 JS 会自动转义字符串中的反斜杠，导致 `\]` 变成 `]`，从而破坏正则表达式。

</callout>

## `ProseCode`

<code-group>

```md [代码]
`code`

`const code: string = 'highlighted code inline'`{lang="ts"}
```

<code-preview label="预览" icon="i-lucide-eye">

`code`

`const code: string = 'highlighted code inline'`

</code-preview>
</code-group>

## `ProseH1`

<code-group>

```md [代码]
# H1 标题
```

<code-preview label="预览" className="pt-4">

# H1 标题

</code-preview>
</code-group>

## `ProseH2`

<code-group>

```md [代码]
## H2 标题
```

<code-preview label="预览" icon="i-lucide-eye">

## H2 标题

</code-preview>
</code-group>

## `ProseH3`

<code-group>

```md [代码]
### H3 标题
```

<code-preview label="预览" icon="i-lucide-eye">

### H3 标题

</code-preview>
</code-group>

## `ProseH4`

<code-group>

```md [代码]
#### H4 标题
```

<code-preview label="预览" icon="i-lucide-eye">

#### H4 标题

</code-preview>
</code-group>

## `ProseH5`

<code-group>

```md [代码]
##### H5 标题
```

<code-preview label="预览" icon="i-lucide-eye">

##### H5 标题

</code-preview>
</code-group>

## `ProseH6`

<code-group>

```md [代码]
###### H6 标题
```

<code-preview label="预览" icon="i-lucide-eye">

###### H6 标题

</code-preview>
</code-group>

## `ProseHr`

<code-group>

```md [代码]
下方分隔线。

---

上方分隔线。
```

<code-preview label="预览" icon="i-lucide-eye">

下方分隔线。

---

上方分隔线。

</code-preview>
</code-group>

## `ProseImg`

<code-group>

```md [代码]
![酷炫图片](https://nuxt.com/assets/design-kit/icon-green.png)
```

<code-preview label="预览" icon="i-lucide-eye">

![酷炫图片](https://nuxt.com/assets/design-kit/icon-green.png)

</code-preview>
</code-group>

## `ProseUl`

<code-group>

```md [代码]
- 只是
- 一个
- 无序
- 列表
```

<code-preview label="预览" icon="i-lucide-eye">

- 只是
- 一个
- 无序
- 列表

</code-preview>
</code-group>

## `ProseLi`

<code-group>

```md [代码]
- 列表项
```

<code-preview label="预览" icon="i-lucide-eye">

- 列表项

</code-preview>
</code-group>

## `ProseOl`

<code-group>

```md [代码]
1. Foo
2. Bar
3. Baz
```

<code-preview label="预览" icon="i-lucide-eye">

1. Foo
2. Bar
3. Baz

</code-preview>
</code-group>

## `ProseP`

<code-group>

```md [代码]
仅仅是一段文字。
```

<code-preview label="预览" icon="i-lucide-eye">

仅仅是一段文字。

</code-preview>
</code-group>

## `ProseStrong`

<code-group>

```md [代码]
**仅仅是一段加粗文字。**
```

<code-preview label="预览" icon="i-lucide-eye">

**仅仅是一段加粗文字。**

</code-preview>
</code-group>

## `ProseEm`

<code-group>

```md [代码]
_仅仅是一段斜体文字。_
```

<code-preview label="预览" icon="i-lucide-eye">

*仅仅是一段斜体文字。*

</code-preview>
</code-group>

## `ProseTable`

<code-group>

```md [代码]
| 键  | 类型      | 描述       |
| --- | --------- | --------- |
| 1   | 极好      | 表格       |
| 2   | 极好      | 数据       |
| 3   | 极好      | 网站       |
```

<code-preview label="预览" icon="i-lucide-eye">
<table>
<thead>
  <tr>
    <th>
      键
    </th>
    
    <th>
      类型
    </th>
    
    <th>
      描述
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      1
    </td>
    
    <td>
      极好
    </td>
    
    <td>
      表格
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      极好
    </td>
    
    <td>
      数据
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      极好
    </td>
    
    <td>
      网站
    </td>
  </tr>
</tbody>
</table>
</code-preview>
</code-group>

## `ProseTbody`

包含在 **ProseTable** 示例中。

## `ProseTd`

包含在 **ProseTable** 示例中。

## `ProseTh`

包含在 **ProseTable** 示例中。

## `ProseThead`

包含在 **ProseTable** 示例中。

## `ProseTr`

包含在 **ProseTable** 示例中。

<callout icon="i-simple-icons-github" to="https://github.com/nuxt-modules/mdc/tree/main/src/runtime/components/prose">

查看这些组件的源代码请访问 GitHub。

</callout>
