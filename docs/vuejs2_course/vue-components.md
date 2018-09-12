---
title: 'Vue Components'
sidebarDepth: 3
---

# Vue Components 

Components are major piece of VueJS. Components enables us to create reusable pieces which we can dumb into different places of HTML template.

* How to register components
* How we can let them to interac with each other

## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5942872?start=0).

## Content

[[toc]]

## Intro to Components

* How to display the same element in different places on HTML?

We have this setup but it's only rendered once for the first element. Even though we change the `id` to `class` it doesn't metter, Vue instance only rendered for the first `app` value. 

```html
<div id="app">
</div>

<div id="app">
</div>
```

```javascript
new Vue({
	el: '#app',
    data: {
        status: 'Critical'
    },
    template: '<p>Server Status: {{ status }}</p>'
})
```

I want to create reusable components. Component basically extends the Vue instance. Below is how you can create a component with `tag` name.

```javascript
Vue.component('my-component');
```

Then you can pass it to your HTML.

```html
<my-component></my-component>
```

::: danger
Be careful with the **reserved** tag names like `my-comonent` or `action-button`. A common method is to add a **prefix** to your tag names so you don'y accidently overwrite them.
:::

When creating `components` we need to pass `data` property in a different way. Since this component extends the Vue instance it can interfere with the original `data` objects. It's normal to use it as an object in our root vue instance, but in a component we need to use it as a **function** and this will return an **object**.

```javascript
Vue.component('my-component', {
	data: function() {
        return {
            status: 'Critical'
        }
    },
    template: '<p>Server Status: {{ status }}</p>'
})

new Vue({
	el: '#app',
})
```

Now we can use it in multiple places.

```html
<div id="app">
  <my-component></my-component>
  <hr>
  <my-component></my-component>
</div>
```

[Link to example](https://jsfiddle.net/8bz8h970/22/).

## Storing Data in Components with data method

In above example, when we bind a data with `data` function and return directly the `data` object this will be shared among all components and when, for example, I click a button to change it, it will make this change for every object. To avoid this behavior we need to return an `Object` insted of the variable directly. This will enable that each component will have its own scope. Therefore, a change will only effect that object not the others.

```html
<div id="app">
  <my-component></my-component>
  <hr>
  <my-component></my-component>
</div>
```

```javascript
var data = { status: 'Critical' }

Vue.component('my-component', {
	data: function() {
        return data
    },
    template: '<p>Server Status: {{ status }}<button @click="changeStatus">Change </button></p>',
    methods: {
        changeStatus: function() {
            this.status = 'Normal'
        }
  }
})

new Vue({
	el: '#app',
})
```

Check [this example](https://jsfiddle.net/8bz8h970/23/) to see how all the components data is changed when the button is hit. And, on [this example](https://jsfiddle.net/8bz8h970/24/) you can see how each component can has its own seperate scope. In other words, the data is kept in different places in the memory.

```javascript
Vue.component('my-component', {
	data: function() {
  	return {
    	status: 'Critical'
    }
  },
  template: '<p>Server Status: {{ status }}<button @click="changeStatus">Change </button></p>',
  methods: {
  	changeStatus: function() {
    	this.status = 'Normal'
    }
  }
})

new Vue({
	el: '#app',
})
```

## Registering Components Locally and Globally

Above, we set up a **global** component with `Vue.component`. If we want to create local components, we need to keep data object in a variable than register it into Vue instance by using `components` object. 

```javascript
var cmp = {
	data: function() {
  	return {
    	status: 'Critical'
    }
  },
  template: '<p>Server Status: {{ status }}<button @click="changeStatus">Change </button></p>',
  methods: {
  	changeStatus: function() {
    	this.status = 'Normal'
    }
  }
}

new Vue({
	el: '#app',
  components: {
  	'my-component': cmp  // selector : component object
  }
})

new Vue({
	el: '#app2',
})
```

Check it on [this fiddle](https://jsfiddle.net/8bz8h970/25/). You can see that `button`s are only displayed inside the *registered* Vue Instance.

## The 'root component' in App.vue file

You can only have one **root component** in your template. The rest of the elements must be wrapped in to this root element.

## Creating a component

1. start a new project with `npm init webpack-simple proj_folder`, navigate into it and run `npm run dev`. 

2. Inside `src/` folder create a new `Vue` component called `Home.vue` and write the below code.

**src/Home.vue**

```html
<template>
    <div>
        <p>Server Status: {{ status }}</p>
        <br>
        <button @click="changeStatus">Change status</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            status: 'Critical'
        }
    },
    methods: {
        changeStatus () {
            this.status = 'Normal'
        }
    }
}
</script>
```


3. Go to `src/main.js` file and register the component with `Vue.component` method.

**src/main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'

Vue.component('server-status-cmp', Home)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

::: tip render function
The render function which is used in the above example is for rendering the template. The reason why we don't pass it as a `template` property is its limitations. By using `render` function we get more flexibility. **Further explanation required**.
:::

4. Now, `server-status-cmp` component is registered globally. We can use simply by passing it as a HTML template.

**src/App.vue**

```html
<template>
  <server-status-cmp></server-status-cmp>
</template>
```

And, *Voila!*.

## Using Components

We will continue to use the same project setup only we will change the `App.vue` component like so:

**App.vue**

```html
<template>
  <app-servers></app-servers>
</template>
```

1. Create a new `.vue` file under `src/` dir called `ServerStatus.vue` and copy/paste the code inside the `Home.vue` file.

**src/ServerStatus.vue**

```html
<template>
    <div>
        <p>Server Status: {{ status }}</p>
        <br>
        <button @click="changeStatus">Change status</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            status: 'Critical'
        }
    },
    methods: {
        changeStatus () {
            this.status = 'Normal'
        }
    }
}
</script>
```

2. In **src/main.js** file create a Vue component and pass it globally.

**main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'

Vue.component('app-servers', Home)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

3. In `Home.vue` file, import `ServerStatus` from the file to use it as a local component. 

**Home.vue**

```html
<template>
    <div>
        <app-server-status v-for="server in 5" :key="server.id"></app-server-status>
    </div>
</template>

<script>
import ServerStatus from './ServerStatus.vue'
export default {
    components: {
        'app-server-status': ServerStatus
    }
}
</script>
```

::: tip
Above, we import `ServerStatus` by its name but we didn't give it any name when creating it, we just **exported** it as **default**. But anyway, importing it with its name is a good practice. Just keep in my that you can give it another name if you used `export default`.
:::

## Assignment-1: Components

There was an error when I tried to `vue init` because of the `prettier` library has an update today. To fix this I used this command:

```bash
npm install --save-dev prettier@1.12.0
```

In the assignment we are expected to parse the page into little vue components. So, let's start.

When I look at the template, it's comprised of three main sections: header, section and footer. Let's start with making three seperate components.


## Better folder structure

Until now we were storing all the components under `src` directory. When application gets bigger this approach might not be very useful and tidy. However, we can split the components into subdirectiories and then import them from the those directories. This way, we would have a better structured project.

```
src
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Server
│   │   ├── ServerDetails.vue
│   │   └── ServerStatus.vue
│   └── Shared
│       ├── Footer.vue
│       └── Header.vue
└── main.js
```

**App.vue**

```html
<template>
    <div class="container">
        <app-header></app-header>
        <hr>
        <server-status></server-status>
        <server-details></server-details>
        <hr>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from './components/Shared/Header.vue'
import ServerStatus from './components/Server/ServerStatus'
import Footer from './components/Shared/Footer'
import ServerDetails from './components/Server/ServerDetails'

export default {
  components: {
    'app-header': Header,
    'server-status': ServerStatus,
    'app-footer': Footer,
    'server-details': ServerDetails
  }
}
</script>
```

## Alternative Folder Structure

In the last lecture I introduced one possible folder structure. It's a great structure in small and medium sized projects.

Whilst it also might work fine in bigger projects, there's also an alternative you might want to consider.

Instead of having your components in a components/ folder (and storing other shared files in other folders - e.g. shared/), you can also group your files by feature.

This could look like this:

```
- main.js
- users/
- - account/
- - analytics/
- shop
- - main/
- - checkout/
```

## How to name your component tags(selector)

We can use case sensetive names for component tags like so: 

```html
<template>
    <div class="container">
        <appHeader></appHeader>
    </div>
</template>

<script>
import Header from './components/Shared/Header.vue'

export default {
  components: {
    'appHeader': Header
  }
}
</script>
```

::: tip
Since the component we use here is not a **native DOM** we are not exposed to DOM restrictions when naming our components.
:::

More than this, we can also use the tag names with dash `-`, it will be also a valid tag name since Vue is converting it.

```html
<template>
    <div class="container">
        <app-header></app-header>
    </div>
</template>

<script>
import Header from './components/Shared/Header.vue'

export default {
  components: {
    'appHeader': Header
  }
}
</script>
```

However it's a good practice to refer them in Vue instance with dash `-` since the tags will be represented in native way. 

::: tip
As a side note, with ES6 you can also use directly the name of the component in the `components` property. But you are restricted to use it with the name you import it.

```html
<template>
    <div class="container">
        <app-header></app-header>
    </div>
</template>

<script>
import AppHeader from './components/Shared/Header.vue'

export default {
  components: {
    AppHeader
  }
}
</script>
```
:::

## Scoping Component Styles

When you add the `scoped` word into your `<style>` element and the styles will be contained in this component and won't effect the style of the other components. This is known as **shadow DOM**, which means you don't have only one DOM but several sub DOMs inside the main DOM. 

```html
<style scoped>
    div {
        border: 1px solid red;
    }
</style>
```

::: warning
If you don't specify `scoped` the style will be **global** and interfere with the other elements.
:::