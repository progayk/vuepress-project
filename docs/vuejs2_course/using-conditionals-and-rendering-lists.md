---
title: 'VueJs Interaction with DOM'
sidebarDepth: 3
---

# VueJs Interaction with DOM


## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5941322?start=0).

## Content

[[toc]]

## Conditionals & Lists

### Conditional Rendering (v-if)

You don't always want to show eveything on HTML, sometimes you want to show them conditionally. Vuejs allaw you to easily do that. So, let's dive into it.

### v-if

This is directive that we can add to an element. It allows us to bind it to a condition or to a property that results **true** or **false**.

```html
<div id="app">
  <button @click="show = !show">switch</button>
  <p  v-if="show">simdi gorunuyorum</p>
</div>

<script>
const app = new Vue({
	el: '#app',
  data: {
  	show: false
  }
})
</script>
```

When we inspect on Developer Tools, we can see that when we hit the `switch` button, the `<p>` element disappears completely(with including nested elements) from the DOM and only a comment remains to indicate that there was an element there.

### v-else

`v-else` directive will react according to `v-if` directive that comes before it. 

```html
<div id="app">
  <button @click="show = !show">click me</button>
  <p  v-if="show">simdi ben gorunuyorum</p>
  <p v-else>simdi de ben</p>
</div>
```

::: tip
If you're using Vue.js version 2.1 or higher, you now actually have access to a `v-else-if`  directive. Have a look at [this link](https://vuejs.org/v2/guide/conditional.html#v-else-if) to learn more.
:::

### template tag

I can use `<template>` tag. It is an HTML 5 tag but it isn't rendered in the DOM. This allows us to use `v-if` directive in `<template>`. With that, I can add more elements in `<template>` tag.

::: tip
Use `<template>` when you don't want to face with side effects of `<div>` element.
:::

### Don't detach it (v-show)

If you don't want to detach the element, use `v-show` directive. It has the same syntax with 'v-if' but the difference is it doesn't detach when the property value is **false**.

```html
<div id="app">
  <button @click="show = !show">click me</button>
  <p v-show="show">It is not detached</p>
  <p  v-if="show">simdi ben gorunuyorum</p>
  <p v-else>simdi de ben</p>
  <template v-if="show">
    <h1>Heading from template</h1>
    <p>inside a template</p>
  </template>
</div>
```

### Rendering Lists (v-for)

When we render a list or dynamic content we generally don't want to hardcode it. So Vuejs offer a loop function that we can use in HTML.

```html
<div id="app">
  <ul>
    <li v-for="ingredient in ingredients">{{ ingredient }}</li>
  </ul>
  <ol>
  	<li v-for="person in persons">name: {{ person.name }}, age: {{ person.age }}, color: {{ person.color }}</li>
  </ol>
</div>

<script>
const app = new Vue({
	el: '#app',
  data: {
  	ingredients: ['meat', 'fruit', 'cookies'],
    persons: [
    	{name: 'Maz', age: 27, color: 'red'},
      {name: 'Anna', age: 'unknown', color: 'blue'}
    ]
  }
})
</script>
```

Here is the [link](https://jsfiddle.net/maykjony/8bz8h970/) to the example.

### Getting the Current Index

Let's you don't only want to display properties but also the index of the property.

```html
<div id="app">
  <ul>
    <li v-for="(ingredient, idx) in ingredients">{{ idx }}: {{ ingredient }}</li>
  </ul>
  <ol>
    <li v-for="person in persons">name: {{ person.name }}, age: {{ person.age }}, color: {{ person.color }}</li>
  </ol>
</div>
```