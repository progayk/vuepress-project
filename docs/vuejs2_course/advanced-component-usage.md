---
title: 'Advanced Component Usage'
sidebarDepth: 3
---

# Advanced Component Usage (Quotes Project)


## Credits

This course in on [this link](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5975154?start=0) on udemy.

## Content

[[toc]]

## Set up Module Project


* In this docs we will see how seperate commponents communicate in each other. So to say, how to pass data from one component to another. We use `webpack-simple` as a starter template.

```bash
vue init webpack-simple folder_name
```

* Add bootstrap cdn to `index.html` file.

**index.html**

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
```

* Create a new vue component for the quotes

**src/components/Quote.vue**

```html
<template>
    <div>
      <p>A wonderful quote</p>
    </div>
</template>

<script>
    export default {
        name: "Quote"
    }
</script>

<style scoped>
  div {
    border: 1px solid #ccc;
    -webkit-box-shadow: 2px 2px 4px 3px #ccc;
    -moz-box-shadow: 2px 2px 4px 3px #ccc;
    box-shadow: 2px 2px 4px 3px #ccc;
    padding: 30px;
    margin: 30px auto;
    text-align: center;
    width: 100%;
  }
</style>
```

* import and add `Quote.vue` component to `App.vue` file.

**src/App.vue**

```html
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <Quote />
      </div>
    </div>
  </div>
</template>

<script>
import Quote from "./components/Quote";
export default {
  components: {Quote}
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
</style>
```

## Passing Content - The Suboptimal Solution

I want to pass some text to the `Quote` component. I can do this by using `props` property.

> Since I will pass `String` with `<app-quote>` component it's not neccesary to use colons (`:`) to bind it.

**src/App.vue**

```html
<div class="col-xs-12">

    <app-quote
        quote="A wonderful quote!"
    ></app-quote>

</div>
```

* Add `quote` to `props` in `Quote` component.

**src/components/Quote.vue**

```html
<template>
    <div>
      <p>{{ quote }}</p>
    </div>
</template>

<script>
    export default {
      props: [ 'quote' ]
    }
</script>
```

Now, it works properly, but I want to pass HTML with it and with this approach it's not possible. Though it would be nice just pass a block of HTML by enclosing it with `<app-quote>` component. Well, we can do it by using `<slot>` which is a some nice feature of Vue.js.

## Passing Content with Slots

* I will pass an HTML block within `<app-quote>` component

**src/components/Quote.vue**

```html
<template>
    <div>
      <slot></slot>
    </div>
</template>
```

* Pass HTML block.

**src/App.vue**

```html
<app-quote>
    <h2>Quote</h2>
    <p>A wonderful quote!</p>
</app-quote>
```

> Voila!

## How Slot content get compiled and styled

It's important to understand where the code we pass in `<slot>` get compiled.

For example, I want to change the styling. I can do it from `Quote.vue` file's `<style>` section like this: 

**src/components/Quote.vue**

```html
<style scoped>
    h2 {
      color: red;
    }
</style>
```

## Using Multiple Slots (Named Slots)

We can pass HTML from parent to child by using `<slot>`. However, if we want to display the passed data in different places of child component. Well, again Vue.js offers us the **named slots**.

* Give a name to slots by using *name* attribute.

**src/components/Quote.vue**

```html
<template>
    <div>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <hr>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
</template>
```

* Refer the slot with its name by using `slot` attribute.

**src/App.vue**

```html
<app-quote>
    <h2 slot="title">Quote</h2>
    <p slot="content">A wonderful quote!</p>
</app-quote>
```

## Default Slots and Slot Defaults

Each slot that is not assigned by the `name` attr and referred by the `slot` attr will be treated as a default. For example, if I remove the `content` name and ref it wil still yield us the same result.

**src/components/Quote.vue**

```html{8}
<template>
    <div>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <hr>
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>
```

**src/App.vue**

```html{3}
<app-quote>
    <h2 slot="title">Quote</h2>
    <p>A wonderful quote!</p>
</app-quote>
```

![slot-default](../images/slot-default.png)

### Default display

Let's we are not sure if a third element will be passed.

* Add a `slot` with default content. This will be the default content and if an element passed to slot, it will be replaved with the upcoming content.

**src/components/Quote.vue**

```html{6}
<template>
    <div>
      <div class="title">
        <slot name="title"></slot>
        <span style="color: #ccc">
          <slot name="subtitle">The Subtitle</slot>
        </span>
      </div>
      <hr>
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>
```


![default-slot](../images/default-slot.png)

> You can use this behaviour of slots with sliders for example. Just change the data you will pass into the component and you will always have the same layout with optional parameters.

## Switching Multiple Components to Dynamic Components

