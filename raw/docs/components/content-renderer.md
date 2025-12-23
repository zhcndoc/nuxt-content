# 内容渲染器

> 将您的组件从 AST 转换为美妙的模板。

`<ContentRenderer>` 组件用于渲染通过 [`queryCollection()`](/docs/utils/query-collection) 查询获得的文档。

<note>

此组件 **仅支持** `Markdown` 文件。

</note>

## 属性

<table>
<thead>
  <tr>
    <th>
      属性
    </th>
    
    <th>
      默认值
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
      <code>
        value
      </code>
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      <code>
        ParsedContent
      </code>
    </td>
    
    <td>
      要渲染的文档。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tag
      </code>
    </td>
    
    <td>
      <code>
        'div'
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      渲染器元素使用的标签名（如果有使用）。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        excerpt
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      是否仅渲染摘要而不渲染其余内容。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        components
      </code>
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
    </td>
    
    <td>
      用于渲染的自定义组件映射。此属性将传递给 Markdown 渲染器，不影响其他文件类型。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        data
      </code>
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      <code>
        object
      </code>
      
       （必需）
    </td>
    
    <td>
      将注入到 Markdown 内容中的变量映射，用于后续绑定变量。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prose
      </code>
    </td>
    
    <td>
      <code>
        undefined
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      是否渲染 Prose 组件而非 HTML 标签。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        class
      </code>
    </td>
    
    <td>
      <code>
        undefined
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
      
       或 <code>
        object
      </code>
    </td>
    
    <td>
      用于渲染的根标签的类名。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unwrap
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
      
       或 <code>
        string
      </code>
    </td>
    
    <td>
      需要去除包装的标签，多个标签用空格分隔。例如：<code>
        'ul li'
      </code>
      
      。
    </td>
  </tr>
</tbody>
</table>

## 例子

```vue [pages/[...slug].vue]
<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
```

## 处理缺失页面

如果查询的内容**缺失**，您可以显示**自定义的备用提示信息**。

```vue [pages/[...slug].vue]
<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})
</script>

<template>
  <template v-if="page">
    <ContentRenderer :value="page" />
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>页面未找到</h1>
      <p>抱歉！您查找的内容不存在。</p>
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </template>
</template>
```

## 处理空页面

如果查询的内容**为空**，您可以显示**自定义的备用提示信息**。
