---
title: 'Animations and Transitions'
sidebarDepth: 3
---

# Animations and Transitions

Let's have a better user experience with animations and transitions.

## Credits

This course in on [this link](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5975260?start=0) on udemy.

How to make Page transition properly?

* Vue proper [Page transition example](https://markus.oberlehner.net/blog/vue-router-page-transitions/?utm_campaign=Revue%20newsletter&utm_medium=Newsletter&utm_source=Vue.js%20Developers).


## Content

[[toc]]

## Transitions

Imagine a scenory that you have a button and when it's clicked an alert will be showed. To serve a better user interaction and experience, you want to add a transition effect to that component which is bind to a condition. Vuejs offers us a built-in `transition` component. 

> `<transition>` element can only have single element in it.

<iframe src="https://codesandbox.io/embed/4009n2l0p0" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


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

We create an CSS animation for demonstration purposes. We create a `slide` animation.

```html
<transition name="slide">
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>

<style scoped>
.slide-enter {
  /* we don't need to specify initial state since */
  /* since we've declared in CSS animation */
}
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
}
.slide-leave {
  /* we don't need to specify final state since */
  /* since we've declared in CSS animation */
}
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transfrom: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transfrom: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
```

## Mixing Transition and Animation Properties

The example in the above section is already works pretty well but the when the animation is finishing it disappears suddenly and it doesn't feel very natural. So, we add a transition to make it smooth with opacity.

```html
<style scoped>
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
}
</style>
```

> Now it works like charm!

::: tip
Yes, you can specify transition of opacity in animation as well but here I wanted to show how we can can mix transitions and animations.
:::

Even though it works fine if we change the transition duration of the opacity to be `3s` for example the element will work awkward since vue doesn't know which duration to use. however we can specify that by adding `type `attr to `<transition>` element either to `animation` or `transition`.

Here I will set the `type` to `animation` so that when the animation finishes it will disappear.

> So when you mix transition and animation, declare which one will take the length of duration.

```html
<transition name="slide" type="animation">
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>


<style scoped>
/* omitted for brevity */
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 3s;
  opacity: 0;
}
</style>
```

## Animating v-if and v-show

You can also `v-show` directive when it's necessary.

```html
<transition name="fade">
  <div class="alert alert-info" v-show="show">This is some info</div>
</transition>
<transition name="slide" type="animation">
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>
```

## Setting Up an initial (on-load) Animation

When we want to add an animation to initial load of the page we can use `appear` attrb in `<transition>` element. 

```html
<transition name="slide" type="animation" appear>
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      show: true
    };
  }
};
</script>
```

## Using Different CSS Class Names

There is an animation library called [animate.css](https://daneden.github.io/animate.css/) which uses native CSS animations.

Add `animate.css` CDN to your project and let's have some fun!

When we give a name to a `<transition>` element Vuejs automatically will bind `-enter`, `-leave` classes. How can we tell the vuejs to use other classes?

We can do it by adding some extra element in `<transition>` element. With this way we can over-write default classes. For this we'll use `enter-class` and `leave-class` attrs.

```html
<transition
  enter-class=""
  enter-active-class="animated tada"
  leave-classs=""
  leave-active-class="animated rotateOutDownLeft"
  appear>
  <div class="alert alert-info" v-if="show">This is some info</div>
</transition>
```

## Using Dynamic Name Attributes

You don't have to hard-code the `name` attr. Instead, you can dynamically set the name.

```html
<select v-model="alertAnimation">
  <option value="fade">Fade</option>
  <option value="slide">Slide</option>
</select>
<br>
<button class="btn btn-primary" @click="show = !show">Show Alert</button>
<br><br>
<transition :name="alertAnimtaion">
  <div class="alert alert-info" v-show="show">This is some info</div>
</transition>
```

## Extra Animation Example

You can check this example on [this link](https://jsbin.com/zohepavote/2/edit?html,js,output)

