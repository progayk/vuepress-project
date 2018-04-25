---
title: Vuepress Docs
---

# Vuepress Docs

Some of the content in this site is directly copied from [vuepress.vuejs.org](https://vuepress.vuejs.org/).

## First things first

Create a `.vuepress` folder and a `README.md` file in the project directory. The `README.md` file will be your home file. You can use all the features of **Markdown Language**, and also some additional features that **Vuepress** supplies.
Next, inside `.vuepress/config.js` file insert the code below. This will create a navbar with search box in it.
```js
module.exports = {
    title: 'My Documentation',
    description: 'Document information for site'
}
```
## Navbar

### Navbar Links 

Here we are going to add `nav` function to navbar. You can name the link `items` as you wish and they will appear on the
top right corner.

``` js{4,5,6,7,8,9,10}
module.exports = {
    title: 'My Documentation',
    description: 'Document information for site',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guides/' },
            { text: 'Info', link: '/info/' }
        ]
    }
}
```

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

```javascript{3,4,5,6,7,8,9,10,11}
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
}
```
::: tip FACT
In this site above option is used.
:::

In addition, you can have sub groups inside a dropdown by having nested items:

```javascript{3,4,5,6,7,8,9,10,11}
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```


## Sidebar
This will automatically add a sidebar with specified routes and with their sub H1 tags.

```js
module.exports = {
    themeConfig: {
        sidebar: [
            '/',
            '/guides/',
            '/info/'
        ]
    }
}
```

### Sidebar Groups

You can divide sidebar links into multiple groups by using objects:

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```

### Multiple Sidebars

Display different sidebars for different sections of content:

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
        sidebar: {
            '/guides/': [
                '',
                'vuepress-docs',
                'git-docs',
                'firebase-docs',
                'firebase-friendlyeats-web'
            ],
            '/info/': [
                ''
            ],
            '/': [
                ''
            ]
        }
  }
}
```
::: warning
Make sure to define the fallback configuration last.

VuePress checks each sidebar config from top to bottom. If the fallback configuration was first, 
VuePress would incorrectly match `/foo/` or `/bar/four.html` because they both start with `/`.
:::

::: tip FACT
In this site you're displaying **multiple sidebars** is used.
:::

## Search Box

### Built-in Search

You can costumize the search bar by defining how many suggestions to be shown with `themeConfig.searchMaxSuggestions`,
and also disable the search, which is not necessary:

```javascript
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

### Algolia Search

The `themeConfig.algolia` option allows you to use [Algolia DocSearch](https://community.algolia.com/docsearch/) to replace the simple built-in search. 
To enable it, you need to provide at least `apiKey` and `indexName`:

```javascript
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```

## Add Vue components

Since this is a vue powered kind a documentation framework we can use Vue components inside it. 
Add a components directory into `.vuepress`. Create a new `.vue` file inside of the ./components dir.
Then add your vue component into `guides/README.md` file like so:

```html
<my-comp></my-comp>
```

::: warning
When you add a new component you have to stop and rerun the dev 
:::

The following actually comes from a vue component. Isn't it awesome!

<my-comp></my-comp>

### Vue directives inside .md file

You can also use vue directives right inside and `.md` file. Another cool feature.

```html
<ul>
    <li v-for="n in 5">
        {{ n }}
    </li>
</ul>
```

**The result will be:**

<ul>
    <li v-for="n in 5">
        {{ n }}
    </li>
</ul>


