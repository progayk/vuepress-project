---
title: 'Animations and Transitions'
sidebarDepth: 3
---

# Animations and Transitions

Let's have a better user experience with animations and transitions.

## Credits

This course in on [this link](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5975260?start=0) on udemy.


## Content

[[toc]]

## Transitions

Imagine a scenory that you have a button and when it's clicked an alert will be showed. To serve a better user interaction and experience, you want to add a transition effect to that component which is bind to a condition. Vuejs offers us a built-in `transition` component. 

> `<transition>` element can only have single element in it.



```html
<template>
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <h1>Animation</h1>
      <br>
      <button class="btn btn-primary" @click="show = !show">Show Alert</button>
      <br><br>
      <transition>
       <div class="alert alert-info" v-if="show">This is some info</div>
      </transition>
    </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      show: false
    };
  }
};
</script>
```

<iframe src="https://codesandbox.io/embed/4009n2l0p0" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Transition CSS Classes

We use `v-if` and `v-show` to attach animate and transition to an element. We will use other ways put these will be the tools we will be using.

Vuejs automatically add CSS Classes with `-enter`, `-enter-active` and `-leave`, `-leave-active` posfix. 

`-enter` will be the initial state of the animation. When the animation is triggered `-enter-active` class will be added to the element and the length of being attached of this class will be automatically determined by Vuejs. Behind the scenes, Vuejs will be sniffing the `animation duration` from the CSS folder. 

Once the animation is completed the `-enter` classes will be removed.

For `-leave` classes the scenario will be same vice-versa.

## Assigning CSS Classes for Transitions

* Give a name to the transition component. This will add `-enter` and `-leave` classes behind the scenes.

```html
<transition name="fade">
    <div class="alert alert-info" v-if="show">This is some info</div>
</transition>

<style scoped>
  .fade-enter {
    /* initial state of the transition */
    opacity: 0;
  }
  .fade-enter-active {
      /* we don't need to set the opacity to 1 here since the fade-enter class will 
      be removed when the transition starts */
      transition: opacity 1s;
  }
  .fade-leave {
      /* I won't set the opacity to 1 since it's 1 by default */
      /* opacity: 1; */
  }
  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }
</style>
```

## Creating a "Slide" Transition with the CSS Animation Property

