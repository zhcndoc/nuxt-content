# 配置

> Nuxt Content 采用合理的默认配置。

要配置内容模块并自定义其行为，您可以在 `nuxt.config` 中使用 `content` 属性：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    // 选项
  }
})
```

<note to="https://github.com/nuxt-modules/mdc#configurations">

除了通过 `content.markdown` 配置外，您还可以使用 Markdown 组件 (MDC) 通过 `mdc` 属性自定义 Markdown 元素的渲染。

</note>

## `build`

Nuxt Content 会在构建时读取并解析所有可用内容。此选项允许您控制内容解析。

### `markdown`

配置 markdown 解析器。

#### `toc`

<code-group>

```ts [默认]
toc: {
  depth: 2,
  searchDepth: 2
}
```

```ts [类型定义]
type Toc = {
  depth: number
  searchDepth: number
}
```

</code-group>

控制目录（Table of Contents）的生成行为。

取值：

- `depth`：目录中包含的最大标题深度。
- `searchDepth`：搜索标题时嵌套标签的最大深度。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // 包含 h3 标题
        }
      }
    }
  }
})
```

#### `remarkPlugins`

<code-group>

```ts [默认]
remarkPlugins: {}
```

```ts [类型定义]
type RemarkPlugins = Record<string, false | MarkdownPlugin>
```

</code-group>

使用的 [remark](https://github.com/remarkjs/remark) 插件列表。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        // 对象语法可用于覆盖默认选项
        remarkPlugins: {
          // 覆盖 remark-emoji 选项
          'remark-emoji': {
            options: {
              emoticon: true
            }
          },
          // 禁用 remark-gfm
          'remark-gfm': false,
          // 添加 remark-oembed
          'remark-oembed': {
            // 选项
          }
        },
      }
    }
  }
})
```

#### `rehypePlugins`

<code-group>

```ts [默认]
rehypePlugins: {}
```

```ts [类型定义]
type RehypePlugins = object
```

</code-group>

使用的 [rehype](https://github.com/remarkjs/remark-rehype) 插件列表。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        // 对象语法可用于覆盖默认选项
        rehypePlugins: {
          'rehype-figure': {

          }
        },
      }
    }
  }
})
```

#### `contentHeading`

<code-group>

```ts [Default]
contentHeading: true
```

```ts [Signature]
type ContentHeading = boolean
```

</code-group>

将此选项设置为 `false` 时，禁用自动生成的 `title` 和 `description` 字段（默认从第一个 H1 标题及其后续段落中提取）。

#### `highlight`

<code-group>

```ts [默认]
highlight: false
```

```ts [类型定义]
type Highlight = false | object
```

</code-group>

Nuxt Content 使用 [Shiki](https://github.com/shikijs/shiki) 为 [`ProsePre`](/docs/components/prose#prosepre) 和 [`ProseCode`](/docs/components/prose#prosecode) 提供语法高亮。

<table>
<thead>
  <tr>
    <th>
      选项
    </th>
    
    <th>
      类型
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        theme
      </code>
    </td>
    
    <td>
      <code>
        ShikiTheme
      </code>
      
       或 <code>
        Record<string, ShikiTheme>
      </code>
    </td>
    
    <td>
      要使用的<a href="https://github.com/shikijs/shiki/blob/main/docs/themes.md" rel="nofollow">
        颜色主题
      </a>
      
      。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        langs
      </code>
    </td>
    
    <td>
      <code>
        ShikiLang[]
      </code>
    </td>
    
    <td>
      可用于高亮的<a href="https://github.com/shikijs/shiki/blob/main/docs/languages.md" rel="nofollow">
        加载的语言
      </a>
      
      。
    </td>
  </tr>
</tbody>
</table>

- `highlight.theme`

主题可以是单个字符串，也支持带多个主题的对象。

此选项兼容 [Color Mode 模块](https://color-mode.nuxtjs.org/)。

如果您使用多个主题，建议始终指定 `default` 主题。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          // 所有配色方案中使用的主题
          theme: 'github-light',
          // 或者
          theme: {
            // 默认主题（同单一字符串）
            default: 'github-light',
            // `html.dark` 时使用的主题
            dark: 'github-dark',
            // `html.sepia` 时使用的主题
            sepia: 'monokai'
          }
        }
      }
    }
  }
})
```

- `highlight.langs`

默认情况下，模块加载了若干语言用于语法高亮：

```ts [默认]
['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml']
```

如果您计划使用其他语言的代码示例，需要在该选项中定义该语言。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'c',
            'cpp',
            'java'
          ]
        }
      }
    }
  }
})
```

如果您想为不支持的语言添加高亮，可以通过加载该语言的语法文件实现。

```ts [nuxt.config.ts]
import { readFileSync } from 'node:fs'

export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            // 更多关于 Shiki 语言请参阅：https://shiki.style/guide/load-lang
            JSON.parse(
              readFileSync('./shiki/languages/gdscript.tmLanguage.json', 'utf-8'),
            ),
          ]
        }
      }
    }
  }
})
```

更多关于添加语言信息，请参阅 [Shiki 文档](https://github.com/shikijs/shiki/blob/main/docs/languages.md#adding-grammar)。

### `pathMeta`

内容模块使用文件路径生成 slug、默认标题和内容排序，您可以通过 `pathMeta` 选项自定义此行为。

#### `pathMeta.forceLeadingSlash`

如果设置为 `true`，路径将强制添加前置斜杠。默认值为 `true`。

#### `pathMeta.slugifyOptions`

内容模块使用 [slugify](https://github.com/simov/slugify) 生成 slug，您可以通过此选项自定义 slugify 行为。

更多信息请查看 [slugify options](https://github.com/simov/slugify#options)。

### `transformers`

Nuxt Content 为每种内容类型提供特定的转换器，用于解析原始内容并准备查询和渲染。通过此选项，您可以定义自定义转换器以支持新内容类型或增强支持的内容类型功能。

<code-group>

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    build: {
      transformers: [
        '~/transformers/title-suffix',
      ],
    },
  },
})
```

```ts [~/transformers/title-suffix.ts]
import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'title-suffix',
  extensions: ['.md'],
  transform(file) {
    return {
      ...file,
      title: file.title + ' (suffix)',
    }
  },
})
```

</code-group>

更多关于转换器内容，请参阅 [Transformers](/docs/advanced/transformers) 文档。

## `database`

默认情况下，Nuxt Content 使用本地 SQLite 数据库存储和查询内容。如果您想使用其他数据库，或计划部署到 Cloudflare Workers，可修改此选项。

以下是支持的数据库适配器列表：

### `SQLite`

如果想更改默认数据库位置并移动到其他地方，可使用 `sqlite` 适配器。这是 `database` 选项的默认值。根据运行环境，使用不同的 sqlite 适配器（Node：better-sqlite-3，Bun：bun:sqlite）。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: 'sqlite',
      filename: 'SQLITE_DB_LOCATION'
    }
  }
})
```

如果您无法使用普通的文件存储 SQLite 数据库（例如因只读文件系统或平台限制），您可以完全在内存中运行 SQLite。Nuxt Content 会在首次查询时从生成的转储文件恢复数据库。在无服务器平台上，该数据库会在每次冷启动时重新创建；尽可能预渲染更多路由以避免重复的运行时初始化。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: 'sqlite',
      filename: ':memory:'
    }
  }
})
```

### `D1`

如果计划将应用部署到 Cloudflare Workers，需要使用 `d1` 数据库适配器。在 Cloudflare 控制面板创建 `d1` 绑定，并填写 `bindingName` 字段。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: 'd1',
      bindingName: 'CF_BINDING_NAME'
    }
  }
})
```

### `Postgres`

如果计划使用 PostgreSQL 数据库部署应用，需要使用 `postgresql` 数据库适配器。

首先，确保安装 `pg` 包：

```bash [终端]
npm i pg
```

然后，在 `nuxt.config.ts` 配置 `postgresql` 适配器：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: 'postgresql',
      url: process.env.POSTGRES_URL,
      /* 其他 `pg` 选项 */
    }
  }
})
```

### `LibSQL`

如果计划使用 LibSQL 数据库部署应用，需要使用 `libsql` 数据库适配器。

首先，确保安装 `@libsql/client` 包：

```bash [终端]
npm i @libsql/client
```

然后，在 `nuxt.config.ts` 配置 `libsql` 适配器：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: 'libsql',
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }
  }
})
```

<note>

最流行的 LibSQL 托管服务是 [Turso](https://turso.tech/)。

</note>

### `PGlite`

如果计划使用 PGlite 数据库部署应用，需要使用 `pglite` 数据库适配器。

首先，确保安装 `@electric-sql/pglite` 包：

```bash [终端]
npm i @electric-sql/pglite
```

然后，在 `nuxt.config.ts` 配置 `pglite` 适配器：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    database: {
      type: 'pglite',
      dataDir: '.data/content/pglite'
    }
  }
})
```

<note>

建议仅在开发环境使用 PGlite。

</note>

## `renderer`

配置内容渲染器。

### `anchorLinks`

<code-group>

```ts [默认]
{ h2: true, h3: true, h4: true }
```

```ts [类型定义]
type AnchorLinks = boolean | Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', boolean>
```

</code-group>

控制锚点链接的生成，默认为 `h2`、`h3` 和 `h4` 标题生成锚点链接。

取值：

- `false`：禁用链接生成。
- `true`：为所有标题启用链接生成。

### `alias`

<code-group>

```ts [默认]
alias: {}
```

```ts [类型定义]
type Alias = Record<string, string>
```

</code-group>

别名用于替换 markdown 组件，渲染自定义组件替代默认组件。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    renderer: {
      alias: {
        p: 'MyCustomParagraph'
      }
    }
  }
})
```

## `watch`

```ts [默认]
watch: {
  enabled: true
}
```

配置开发环境中的内容热重载。

取值：

- `enabled`：启用/禁用热重载。
- `port`：WebSocket 服务器使用的端口。
- `showURL`：切换开发服务器启动消息中是否显示 URL。

Nuxt Content 使用 [listhen](https://github.com/unjs/listhen) 提供本地开发服务器。更多信息请查阅 [listhen 文档](https://github.com/unjs/listhen#options)。

<callout>

观察器为开发特性，生产环境不会包含。

</callout>

<code-group>

```ts [启用]
export default defineNuxtConfig({
  content: {
    watch: {
      port: 4000,
      showURL: true
    }
  }
})
```

```ts [禁用]
export default defineNuxtConfig({
  content: {
    watch: {
      enabled: false
    }
  }
})
```

## `experimental`

尚未稳定的实验性功能。

### `experimental.sqliteConnector`

SQLite 连接器在不同环境下有不同限制。有些能在无服务器环境下工作，而有些不能。Nuxt Content 支持三种不同的 SQLite 连接器以覆盖各种环境：

- `better-sqlite3`：适用于所有 Node 环境、GitHub CI、Vercel CI 和生产环境、Cloudflare CI 流水线等。（**不**支持 WebContainers 和 StackBlitz）
- `sqlite3`：适用于 Node 环境、GitHub CI 和 StackBlitz。（**不**支持 Vercel 或 Cloudflare）
- `native`：从 Node.js v22.5.0 起，`node:sqlite` 模块在 Node.js 原生支持。该连接器在所有 Node 环境中适用于 Node.js 版本 22.5.0 及以上。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    experimental: { sqliteConnector: 'native' },
  },
});
```

### `experimental.nativeSqlite` (已废弃，使用 `sqliteConnector` 替代)

从 Node.js v22.5.0 开始，Node.js 原生支持 `node:sqlite` 模块。
这允许 Nuxt Content 在不依赖外部包的情况下使用 SQLite 作为数据库。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    experimental: { nativeSqlite: true },
  },
});
```

<prose-note>

此功能仅在 Node.js v22.5.0 及以上版本可用。在较旧版本启用此选项不会生效。

</prose-note>
</code-group>
