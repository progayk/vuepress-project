---
title: Getting Started
sidebarDepth: 3
---

# Getting Started

## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5940922?start=0).

## Content

[[toc]]

## Getting Started

What is Vue.js? It is a JavaScript(JS) framework. It is fast and very lean. It's only `16kB` to size. And it's used to create highly reactive components on web pages. It's not rendered on the server but on the browser by using JS. So that it can dynamically change DOM(Document Object Map)`??` without making request to the server and it enables the native-like animation effects possible.   

Vue.js nedir? Vue.js bir JavaScript Kadro/Karkas/Çerçeve.İskelet idir. Oldukça hızlı ve küçüktür. Yalnızca `16kB` boyutundadır.

::: warning
16kB dogru mu emin degilim
:::

## Create First Vue.js App

Install Vue.js by using CDN(Content Delivery Network) from [this link](https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js").

::: tip
During this course I will be using external tools and apps like jsfiddle.net. I will
be providing links to those examples.
:::

Add cdn link into `head` in your html file.

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

In the javascript file, create a Vue instance. This instance will control its own template which will be rendered on the html and displayed on the screen. In order to Vue to do this we need pass some arguments to this constructer function. There is one important property that Vue.js will recognize: the `el` property. It takes *String* as a value and with this String we set up which part of out html code should be under control of this Vue instance.

```javascript
new Vue({
	el: ''
})
```

Then insert this Vue app to html like this:
```html
<div id="app">
	<p></p>
</div>
```

In order to output something to html we need to pass some data to Vue App as a property. It takes an object and controls data on html. Let's create our first `data object` and set `title` to be `'Hello World!'`.

```javascript
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!'
	}
})
```

To pass the value in data object Vue use [mustache template system](https://mustache.github.io/).

```html
<div id="app">
	<p>{{ title }}</p>
</div>
```

And the result is:

<p>Hello World!</p>

Congrats! You've created your first Vue Application.

## Extending the VueJs Application

I want to change the value `Hello World!` which is represented by `title` property on data object. In order to do this I will add an `input` element inside the `div` which is controlled by Vue instance. I will tell Vue to listen the changes on input element and apply it to `title` property.

```html
<div id="app">
  <input type="text" v-on:input="changeTitle">
  <p>{{ title }}</p>
</div>
```

Now, create a function called `changeTitle` as a method in Vue instance. We have got access all the properties in the data object by saying `this`. It's more or less same thing `self` in **Python Language**. THe function will get `event` and output changes real-time.

```javascript
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!'
	},
	methods: {
		changeTitle: function(event) {
			this.title = event.target.value
		}
	}
})
```

You can find a working example on [this link](https://jsfiddle.net/maykjony/5f2uvfdt/).


## Course Projects

1. Basics, Template, Interaction
2. Components
3. Animations
4. Final Project(incl. Routing, State Management)

