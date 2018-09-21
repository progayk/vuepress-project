---
title: 'Vue Plugins'
sidebarDepth: 3
---

# Vue Plugins 



## Credits

This tutorial originally appears on snipcart.com. You can check it by clicking [on here](https://snipcart.com/blog/vue-js-plugin).

Also check [this sandbox](https://codesandbox.io/s/2wjn00ql6r)

<iframe src="https://codesandbox.io/embed/2wjn00ql6r" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



## Content

[[toc]]

## Intro to Plugins

### What exactly is a plugin?

Plugins aren't something specific to Vue.js, and you'll usually find them in a large range of software. By definition, they indicate that an interface is provided to allow for extensibility.

> In other, simpler words, they're a way to add global features to an app.

In Vue.js, a plugin should expose an `install` method that takes two parameters:

1. The global `Vue` object.
2. An object incorporating user-defined options.

Good news is they're not that intimidating. Basic knowledge of Vue.js will let you start fiddling with plugins right away.

### Why should you use them?

Because they're simple yet powerful.

According to the official Vue.js [documentation](https://vuejs.org/v2/guide/plugins.html), here are the different types of Vue plugins:

1. Add global methods or properties.
2. Add one or more global assets (directives, filters, transitions, etc.)
3. Add component options by global mixins.
4. Add Vue instance methods by attaching them to Vue.prototype.
5. Create a library providing an API of its own while injecting a combination of the above.

If you recognize your needs in any of these categories, you'll be happy to know that the Vue.js community has already come up with many production-ready solutions.

### Popular Vue.js plugins

Before starting a new Vue project, I think it's important that you know about the existence of the following plugins:

* [vue-router](https://github.com/vuejs/vue-router)

If you're building single-page applications, you'll without a doubt need Vue-router. As the official router for Vue.js, it integrates deeply with its core to accomplish tasks like mapping components and nesting routes.

* [vuex](https://github.com/vuejs/vuex)

Serving as a centralized store for all the components in an application, Vuex is a no-brainer if you wish to build large apps with high maintenance.

* [Vee-validate](https://github.com/baianat/vee-validate)

When building typical line if business applications, form validation can quickly become unmanageable if not handled with care. Vee-validate takes care of it all in a gracefull manner. It uses directives, and it's built with localization in mind.

I'll limit myself to these plugins, but know that [there are many others](https://github.com/vuejs/awesome-vue) waiting to help Vue.js developers!

However, you'll sometime stumble upon an uncovered use case and fall into uncharted territories. Luckily, as you'll see below, crafting custom Vue.js plugins isn't as challenging a task as you might think.

## Creating a custom Vue.js plugin

The commenting system is a central piece within InVision. It lets people click on any portion of the design and leave a scoped comment for collaborators.

Comments then appear as badges positioned right where the commenter clicked.

It will have to be pluggable on any HTML element, and as non-intrusive as possible in the host application.

**Prerequisites**

* Basic knowledge of Vue.js.

### Prepare the codebase

Thanks to [Vue CLI 3](https://cli.vuejs.org/), initializing a Vue.js codebase is now easier than ever. With the CLI installed, just run the following:

```bash
$ vue create vue-comments-overlay
# Answer the few questions
$ cd vue-comments-overlay
$ npm run serve
```

You'll have the classic Vue.js "Hello World" app running. It'll be your test app.

### Develop the Vue.js plugin

Since there will be some components, you better shove it all inside a single folder.

```bash
$ mkdir src/plugins
$ mkdir src/plugins/CommentsOverlay
$ cd src/plugins/CommentsOverlay
```

#### Basic wiring

Vue.js plugins are basically objects with an `install` function. It gets executed whenever a consumer application includes the plugin with `Vue.use()`.

The `install` function receives the global `Vue object` as a parameter, as well as an options object. With this global object in hand, possibilities of extending Vue are virtually limitless: augmenting Vue's prototype, adding custom directives, and even booting a new companion Vue instance inside the plugin (spoiler alert).

Why don't we start by creating your plugin's skeleton?

**src/plugins/CommentsOverlay/index.js**

```javascript
export default {
    install(vue, opts){   
        console.log('Installing the CommentsOverlay plugin!')
        // Fun will happen here
    }
}
```

Now, let's plug this in your test application.

**src/main.js**
```javascript
import Vue from 'vue'
import App from './App.vue'
import CommentsOverlay from './plugins/CommentsOverlay'

Vue.use(CommentsOverlay)

Vue.config.productionTip = false

new Vue({ render: createElement => createElement(App)}).$mount('#app')
```

#### Support for options

The plugin will be configurable using options, the second argument of the install function. Let's create the default options that will represent the base behavior of the plugin, i.e., how it operates when no custom option is specified.

**src/plugins/CommentsOverlay/index.js**
```javascript
const optionsDefaults = {
    // Retrieves the current logged in user that is posting a comment
    commenterSelector() {
        return {
            id: null,
            fullName: 'Anonymous',
            initials: '--',
            email: null
        }
    },
    data: {
        // Hash object of all elements that can be commented on
        targets: {},
        onCreate(created) {
            this.targets[created.targetId].comments.push(created)
        },
        onEdit(editted) {
            // This is obviously not necessary
            // It's there to illustrate what could be done in the callback of a remote call
            let comments = this.targets[editted.targetId].comments
            comments.splice(comments.indexOf(editted), 1, editted);
        },
        onRemove(removed) {
            let comments = this.targets[removed.targetId].comments
            comments.splice(comments.indexOf(removed), 1);
        }
    }
}
```

Then, merge the options passed into the `install` function on top of these defaults.

**src/plugins/CommentsOverlay/index.js**
```javascript
export default {
    install(vue, opts){

        // Merge options argument into options defaults
        const options = { ...optionsDefaults, ...opts }
        
        ...
    }
}
```

#### Vue instance for the commenting layer

One thing you want to avoid with this plugin is having its DOM and styles interfere with the app it is installed on. To minimize the chances of this happening, one way to go is making the plugin live in another root Vue instance, outside of the main app's component tree.

Add the following to the `install` function:

**src/plugins/CommentsOverlay/index.js**
```javascript
export default {
    install(vue, opts){

        ...

    // Create plugin's root Vue instance
        const root = new Vue({
            data: { targets: options.data.targets },
            render: createElement => createElement(CommentsRootContainer)
        })
        
        // Mount root Vue instance on new div element added to body
        root.$mount(document.body.appendChild(document.createElement('div')))

        // Register data mutation handlers on root instance
        root.$on('create', options.data.onCreate)
        root.$on('edit', options.data.onEdit)
        root.$on('remove', options.data.onRemove)
        
        // Make the root instance available in all components
        vue.prototype.$commentsOverlay = root
        
        ...
        
    }
}
```

Essential bits in the snippet above:

1. The app lives in a new `div` at the end of the `body`.
2. The event handlers defined in the `options` object are hooked to the matching events on the root instance. This will make sense by the end of the tutorial, promise.
3. The `$commentsOverlay` property added to Vue's prototype exposes the root instance to all Vue components in the application.

#### Custom Vue.js directive

Finally, you'll need a way for consumer apps to tell the plugin which element will have comments enabled. This is a case for a custom [Vue.js directive](https://vuejs.org/v2/guide/custom-directive.html). Since plugins have access to the global Vue object, they can define new directives.

Yours will be named `comments-enabled`, and it goes like this:

**src/plugins/CommentsOverlay/index.js**

```javascript
export default {
    install(vue, opts){

        ...

        // Register custom directive tha enables commenting on any element
        vue.directive('comments-enabled', {
            bind(el, binding) {

                // Add this target entry in root instance's data
                root.$set(
                    root.targets,
                    binding.value,
                    {
                        id: binding.value,
                        comments: [],
                        getRect: () => el.getBoundingClientRect(),
                    });

                el.addEventListener('click', (evt) => {
                    root.$emit(`commentTargetClicked__${binding.value}`, {
                        id: uuid(),
                        commenter: options.commenterSelector(),
                        clientX: evt.clientX,
                        clientY: evt.clientY
                    })
                })
            }
        })
    }
}
```

The directive does two things:

1. It adds its target to the root instance's data. The key defined for it is `binding.value`. It enables consumers to specify their own id for target elements, like so : `<img v-comments-enabled="imgFromDb.id" src="imgFromDb.src" />`.

2. It registers a `click` event handler on the target element that in turn emits an event on the root instance for this particular target. We'll get back on how to handle it later on.

The install function is now complete!

#### CommentsRootContainer component

`CommentsRootContainer` is the root component of the plugin's UI. Let's take a look at it.

**src/plugins/CommentsOverlay/CommentsRootContainer.vue**

```html
<template>
  <div>
    <comments-overlay
        v-for="target in targets"
        :target="target"
        :key="target.id">
    </comments-overlay>
  </div>

</template>

<script>
import CommentsOverlay from "./CommentsOverlay";

export default {
  components: { CommentsOverlay },
  computed: {
    targets() {
      return this.$root.targets;
    }
  }
};
</script>
```

Note how the `targets` computed property is derived from the root component's data.

Now, the overlay component is where all the magic happens. Let's get to it!

#### CommentsOverlay component

**src/plugins/CommentsOverlay/CommentsRootContainer.vue**

```html
<template>
  <div class="comments-overlay">

    <div class="comments-overlay__container" v-for="comment in target.comments" :key="comment.id" :style="getCommentPostition(comment)">
      <button class="comments-overlay__indicator" v-if="editting != comment" @click="onIndicatorClick(comment)">
        {{ comment.commenter.initials }}
      </button>
      <div v-else class="comments-overlay__form">
        <p>{{ getCommentMetaString(comment) }}</p>
        <textarea ref="text" v-model="text" />        
        <button @click="edit" :disabled="!text">Save</button>
        <button @click="cancel">Cancel</button>
        <button @click="remove">Remove</button>
      </div>
    </div>

    <div class="comments-overlay__form" v-if="this.creating" :style="getCommentPostition(this.creating)">
      <textarea ref="text" v-model="text" />
      <button @click="create" :disabled="!text">Save</button>
      <button @click="cancel">Cancel</button>
    </div>

  </div>
</template>

<script>
export default {
  props: ['target'],

  data() {
    return {
      text: null,
      editting: null,
      creating: null
    };
  },

  methods: {
    onTargetClick(payload) {
      this._resetState();
      const rect = this.target.getRect();

      this.creating = {
        id: payload.id,
        targetId: this.target.id,
        commenter: payload.commenter,
        ratioX: (payload.clientX - rect.left) / rect.width,
        ratioY: (payload.clientY - rect.top) / rect.height
      };
    },
    onIndicatorClick(comment) {
      this._resetState();
      this.text = comment.text;
      this.editting = comment;
    },
    getCommentPostition(comment) {
      const rect = this.target.getRect();
      const x = comment.ratioX * rect.width + rect.left;
      const y = comment.ratioY * rect.height + rect.top;
      return { left: `${x}px`, top: `${y}px` };
    },
    getCommentMetaString(comment) {
      return `${
        comment.commenter.fullName
      } - ${comment.timestamp.getMonth()}/${comment.timestamp.getDate()}/${comment.timestamp.getFullYear()}`;
    },
    edit() {
      this.editting.text = this.text;
      this.editting.timestamp = new Date();
      this._emit("edit", this.editting);
      this._resetState();
    },
    create() {
      this.creating.text = this.text;
      this.creating.timestamp = new Date();
      this._emit("create", this.creating);
      this._resetState();
    },
    cancel() {
      this._resetState();
    },
    remove() {
      this._emit("remove", this.editting);
      this._resetState();
    },
    _emit(evt, data) {
      this.$root.$emit(evt, data);
    },
    _resetState() {
      this.text = null;
      this.editting = null;
      this.creating = null;
    }
  },

  mounted() {
    this.$root.$on(`commentTargetClicked__${this.target.id}`, this.onTargetClick
    );
  },
  
  beforeDestroy() {
    this.$root.$off(`commentTargetClicked__${this.target.id}`, this.onTargetClick
    );
  }
};
</script>
```

A few things to note here:

* The component receives the full `target` object as a `prop`. This is where the comments array and the positioning info is stored.
* The handler for the `commentTargetClicked` events we saw earlier is managed within the `mounted` and `beforeDestroy` hooks.
* The root instance is used as the event bus. Even if this approach is often discouraged, I judged it reasonable in this context, since the components aren't publicly exposed and can be seen as a monolithic unit.

Aaaand, we're all set! Now, after a bit of styling (I won't expand on my dubious CSS skills), our plugin is ready to take user comments on target elements!

I spent a little less than a day building this plugin. For the sake of brevity, I omitted to cover resizing. Although we're storing `ratioX` and `ratioY`, which is perfect to compute positioning when components render, resizing the page after the initial load will break the comments layout.

This could be fixed using `window.onresize` or the soon-to-be [ResizeObserver](https://wicg.github.io/ResizeObserver). At the time of writing, ResizeObserver is a Chrome exclusive; see [here](https://caniuse.com/#feat=resizeobserver) if it still is.

> See GitHub repo [here](https://github.com/snipcart/vue-comments-overlay)