---
title: Guide
next: /info/
prev: ../
sidebar: hidden
sidebarDepth: 2
---
# Guide

## First things first

Create a `.vuepress` folder and a `README.md` file in the project directory. The `README.md` file will be your home file. You can use all the features of **Markdown Language**, and also some additional features that **Vuepress** supplies.
Next, inside `.vuepress/config.js` file insert the code below. This will create a navbar with search box in it.
```js
module.exports = {
    title: 'My Documentation',
    description: 'Document information for site'
}
```

## Add navigation function to navbar 

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

## Add sidebar
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


