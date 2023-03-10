# Fullkit

A collection of packages to create a Django-like experience with fullstack javascript.

## Get started

To install the server library enter the following command:

```
npm install @fullkit/server @fullkit/stem-renderer
```

You can also install only the packages you like for exemple `@fullkit/client` to use the reactivity functions inspired by Solidjs.

```
npm install @fullkit/client
```

## Example

```typescript
// index.ts

import { View } from "@fullkit/stem-renderer";

export class Page extends View {
  templateName = "index.html";

  getContextData() {
    return {
      title: "Hello World",
      nav: [
        { href: "/", name: "home" },
        { href: "/about", name: "about" },
      ],
    };
  }
}
```

```html
<!-- index.html -->

<h1>{title}</h1>
<nav>
  <ul>
    <for condition="const item in nav">
      <include src="nav_item.html" with="item: item"></include>
    </for>
  </ul>
</nav>
```

## Features

Fullkit uses vite-plugin-ssr under the hood.

### File base routing

Note: The root page must be under an index folder.

### Layouts

```typescript
// layout.ts

import { Layout } from "@fullkit/stem-renderer";

export class MainLayout extends Layout {
  templateName = "layout.html";

  getContextData() {
    return {
      title: "Site title",
      nav: [
        { href: "/", name: "home" },
        { href: "/about", name: "about" },
      ],
    };
  }
}
```

```html
<!-- layout.html -->

<h1>{title}</h1>
<nav>
  <ul>
    <for condition="const item in nav">
      <li><a href="{item.href}">{item.name}</a></li>
    </for>
  </ul>
</nav>
<slot></slot>
```

```typescript
// about.ts

import { View } from "@fullkit/stem-renderer";
import { MainLayout } from "./layout.ts";

export class Page extends View {
  templateName = "index.html";
  layoutClass = MainLayout;
  getContextData() {
    return {
      content: "About page !",
    };
  }
}
```

```html
<!-- index.html -->

<p>{content}</p>
```

The resulting html will be:

```html
<h1>Site title</h1>
<nav>
  <ul>
    <li><a href="/">home</a></li>
    <li><a href="/about">about</a></li>
  </ul>
</nav>
<p>About page !</p>
```
