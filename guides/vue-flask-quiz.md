---
title: Vue2 + Flask Survey App REST API
sidebarDepth: 3
---

# Vue2 + Flask Survey App REST API

In this docs I will create a Survey App  *Single Page Application* (SPA) by using [Vue.js](https://vuejs.org/) javascript framework for the front-end 
and [Flask](http://flask.pocoo.org/) web framework for a backend REST API.

## Credits

This docs contains a lot of resources from:

* [Single Page Apps with Vue.js and Flask](http://stackabuse.com/single-page-apps-with-vue-js-and-flask-setting-up-vue-js/) by [Adam McQuistan](https://twitter.com/adamjmcquistan)

## Contents

[[toc]]

## Setup and Getting to Know Vue.js

## Front-end setup with vue-cli and webpack

I will be using two very important tools for a Vue.js project, which are the official [Vue.js command line interface (CLI)](https://vuejs.org/v2/guide/installation.html#CLI) and the very powerful module bundler and build tool webpack. Both of these tools rely on the Node.js runtime and its package manager, npm. If you have not already installed node then please consult the Node.js installation docs for your system, which will also include an installation of npm.

Install the Vue.js CL (vue-cli):

```bash
npm install vue-cli -g
```

Now with the CLI installed I will use it to initialize a Vue.js SPA application. The CLI does the following:

1. Install and configure webpack to bundle my code
2. Install a development server with hot-reload (server auto-restarts when a file is changed)
3. Add a dependency for vue-router
4. Scaffold out a basic Vue.js SPA file structure

I first create a high-level folder which will contain all the code for this tutorial named "survey". Next I make two more directories called "frontend" (for the Vue.js SPA) and "backend" (for developing the REST API) then change my working directory to the frontend directory.

```bash
mkdir survey
cd survey
mkdir frontend
mkdir backend
cd frontend
```

Now for the real magic. The Vue CLI initialization command is entered, which then prompts me to answer a series of questions.

```bash
$ vue init webpack survey-spa

? Project name survey-spa
? Project description A Vue.js project with Flask
? Author Adam McQuistan <drum.ayk@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "survey-spa".


# Installing project dependencies ...
...
```
There should now be a new directory called "survey-spa". Change directories into this directory and issue an npm command to compile the project and launch the dev server.

```bash
cd survey-spa
npm run dev
```

Now I can enter [http://localhost:8080](http://localhost:8080) into my browser window and I should see the boilerplate Vue.js template page.

```
survey-spa/  
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.js
│   └── router
│       └── index.js
└── static
```

This likely seems a bit overwhelming the first few times you look at it, but fear not we only really need to concern ourselves with the files under the **src/** directory, plus the index.html file. Of course the other files are important and perhaps some day I will get into what they are used for, but for now just ignore them.

Files under the **src/** directory are where I will be writing the code to drive the functionality of the application. Let us open these files up and get an idea for what is going on.

index.html

```html
<!DOCTYPE html>  
<html>  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>survey-spa</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>  
```

This is the only HTML file that a Vue SPA utilizes and it rarely contains much more than what is shown above with the exception that sometimes you will link to CSS frameworks and other JavaScript libraries within this file. The lone `div` element that is produced with a default `id` of "app" is what the main Vue instance will attach to. That Vue object injects the HTML and CSS that are in the components, to be discussed later, into the `div` to produce the UI.

main.js

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'  
import App from './App'  
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({  
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

The main.js file is the primary entry point for the application and is where you will register the Vue instance and extensions such as vue-router and [vuex](https://github.com/vuejs/vuex). As you can see this is where the Vue instance resides. The instance is registered to the app `div` discussed previously, plus it is fed the `router` object and the high-level `App` component.

App.vue

```html
<template>  
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>  
export default {  
  name: 'App'
}
</script>

<style>  
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>  
```

The App.vue file serves as the top level application components and often contains the general layout of the application. Vue components have a specific structure containing a `<template>` section for component-specific HTML, a `<script>` section to define the **Vue** object and that component's behaviors implemented in JavaScript, and a `<styles>` section for CSS / SCSS rules. That last bit can be a bit confusing though because by default the style rules you define in a component do not just pertain to that component. They actually affect all the elements in the entire project unless you add a `scoped` attribute to the `<style>` element.

router/index.js

```javascript
import Vue from 'vue'  
import Router from 'vue-router'  
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({  
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```

The index.js script in the router directory is where the URLs for the application are defined and mapped to components. The first two lines import the `Vue` and `Router` objects, which are then linked by the `use` method on the `Vue` object.

The default route that is provided from the vue-cli webpack template is simply the root or index route for the application, which servers up the `HelloWorld` component. To map a route path to a component it first has to be imported, then you need to define a route object in the `routes` array giving it a path, a name, and the component to be displayed.

components/HelloWorld.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- omitted for brevity -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
The "components" directory is where UI components reside. The `HelloWorld` component above again contains the three basic sections template, script, and style.

Take a look at the contents of the script section. Here you will see that an object is being exported. This object will get injected into the `Vue` instance that was initialized in the main.js file. Inside this JavaScript object is a `data` method which returns an object. This object is where you can place component-level state (data) and in this example it's a single property called `msg`.

You can access and display your component state by its property name within the HTML in the template section. In the example provided you see this as `{{ msg }}`. The double curly brackets are the default template syntax for doing text interpolation and is inspired by the [Mustache](https://mustache.github.io/) template system. Any time you want to display data in the HTML of your component wrap it in double curly brackets.

