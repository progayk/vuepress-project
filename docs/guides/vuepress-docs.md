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


## Asset Handling

### Relative URLs

All markdown files are compiled into Vue components and processed by webpack, therefore you can and should prefer referencing any asset using relative URLs:

```markdown
![An image](./image.png)
```

This would work the same way as in `*.vue` file templates. The image will be processed with `url-loader` and `file-loader`, and copied to appropriate locations in the generated static build.

In addition, you can use the `~` prefix to explicitly indicate this is a webpack module request, allowing you to reference files with webpack aliases or from npm dependencies:

```markdown
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```

webpack aliases can be configured via [configureWebpack](https://vuepress.vuejs.org/config/#configurewebpack) in `.vuepress/config.js.` Example:

```javascript
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
```

::: danger ACI GERCEK
I couldn't add `webpackConfigure` to `config.js` file. :'(
:::

### Simple CSS Override

If you wish to apply simple overrides to the styling of the default theme, you can create an `.vuepress/override.styl` file. This is a [Stylus](http://stylus-lang.com/) file but you can use normal CSS syntax as well.

There are a few color variables you can tweak:

```styl
// showing default values
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```

## The Vue Instance

### Lifecycle Diagram 

![lifecycle diagram](https://vuejs.org/images/lifecycle.png?_sw-precache=6f2c97f045ba988851b02056c01c8d62)

## Vue Router

[Scooby Shaggy Stand Alone vue-router example](../extras/scooby-shaggy.html)

### Programatic Routing

Similar to before I want to demonstrate a few things just discussed with a variation of one of the previous toy examples. Below I have altered the navigation example that displays either Scooby or Shaggy to no longer use the `<router-link>` component.

```html
<!-- index.html -->  
<script src="https://unpkg.com/vue/dist/vue.js"></script>  
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">  
  <p>
    <a @click="toScooby">Scooby</a>
    <a @click="toShaggy">Shaggy</a>
  </p>
  <router-view></router-view>
</div>

<script>  
const Scooby = {  
    template: `
    <div>
      <h4>Scooby</h4>
      <p>
        <img src="https://www.wbkidsgo.com/Portals/4/Images/Content/Characters/Scooby/characterArt-scooby-SD.png" alt="scooby"/>
      </p>
    </div>`
}

const Shaggy = {  
    template: `
    <div class="character">
      <h4>Shaggy</h4>
      <p>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/ShaggyRogers.png/150px-ShaggyRogers.png" alt="shaggy"/>
      </p>
    </div>`
}

const router = new vue-router({  
  routes: [
    { path: '/characters/scooby', component: Scooby },
    { path: '/characters/shaggy', component: Shaggy }
  ]
})

const app = new Vue({  
  router: router,
  methods: {
    toScooby() { this.$router.push('/characters/scooby') },
    toShaggy() { this.$router.push('/characters/shaggy') }
  }
}).$mount('#app')

</script>  
```

The example behaves in the exact same way as before, but now the routing is done via a combinations of click event listeners, Vue methods, and manually calling `this.$router.push('/path')`. This is actually what `<router-link>` does behind the scenes using the `to="/path"` value. I encourage you to play with this live example [here](https://jsfiddle.net/maykjony/r5m4850c/).   

## v-model directive

Consider the trivial example below. Again, you can see a working example of this code [here](https://jsfiddle.net/amcquistan/grq3qj36/).

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="app">  
  <div>
    <label for="name">What is your name</label>
    <input id="name" type="text" v-model="textInput" />
    <span>Hello {{ textInput }}</span>
  </div>

  <h4>Which do you like better?</h4>
  <div v-for="choice in radioChoices" :key="choice">
    <label>{{ choice }}</label>
    <input name="fruit" type="radio" v-model="favoriteFruit" :value="choice"/>
  </div>
  <h4>So you like {{ favoriteFruit }}</h4>
</div>

<script>  
new Vue({  
  el: '#app',
  data: {
    textInput: '',
    radioChoices: ['apples', 'oranges'],
    favoriteFruit: ''
  }
})
</script> 
```

The first input is a text input asking for the user's name. This text input has a `v-model` registered to it with the data property `textInput` attached to it, which keeps the text input in sync with the `textInput` data property of the Vue instance. Take a second to type your name into the text input and watch it update in the `<span>Hello {{ textInput }.}</span>` HTML's output.

The second input is a radio input named "fruit" that displays the fruits "apples" and "oranges" and asks the user to select their favorite. The radio input is registered to the `favoriteFruit` data property of the Vue instance via the `v-model`, which associates the value associated with each radio input via the `:value="choice"` attribute binding syntax to keep favoriteFruit in sync with the selected radio input. Again, you can watch the value of `favoriteFruit` update in the 
::: v-pre 
`<h4>So you like {{ favoriteFruit }}</h4>` 
::: 
element's output. 

## Deploy to Netlify

Place all your file under **docs/** directory and create a file on your root dir called `package.json`. And fill it with below code:

```json
{
    "name": "vuepress-docs",
    "version": "1.0.0",
    "description": "My documents for web developing",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs"
    },
    "keywords": [],
    "author": "mayk jony",
    "license": "MIT",
    "devDependencies": {
    "vuepress": "^0.5.0"
    }
}
```

Then run the build command:

```bash
npm run docs:build
```

This may take a while to build after which the static files built can be found in `docs/.vuepress/dist`

We shall proceed to deploy our static site using Netlify. Netlify provides an awesome continuous integration option by deploying from Github or any other supported hosted version control provider. Follow these steps to deploy your site to Netlify:

**Step 1** Create an account on Github and Netlify. Push your code using Git to Github.

**Step 2** Log in your Netlify account and select the `New site from Git` option. Choose Github as the continuous development provider and select the repository containing the documentation.

**Step 3** Specify the **branch** to deploy as `master` or choose whichever branch you would like to deploy. Set the **build command** to ` run docs:build` and the **publish directory** to `docs/.vuepress/dist`. Click ‘Deploy Site’. Your website should be deployed in little time and a public URL is provided to access it.

Here is the [deployed version](https://lucid-swanson-c5426e.netlify.com/) of this tutorial on Netlify.