---
title: Hanging Around
sidebarDepth: 3
---

# Hanging Around

## Credits

* [Someone's fiddle](https://jsfiddle.net/jamesbrndwgn/eywraw8t/176707/). Thank you, man!

## Content

[[toc]]

## Hanging Around

In this section I am hanging around with some bit of them and the other. I'm being picky about features. I want to design the next generation User Experience. My people deserve to use something on world standards.

### Set Theme Primary Color

```html
<template>
<!--omitted for brevity -->

  <!--[START] Locale Toggle Button-->
    <input type="color" @change="setTheme($event)">
  <!--[END] Locale Toggle Button-->

<!--omitted for brevity -->
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      colorValue: '#aba',
      // omitted for brevity
    }
  },
  methods: {
    setTheme(e) {
      this.$vuetify.theme.primary = e.target.value;
    }
  }
};
</script>
```

## Internatilization (i18n)

### Toggle Locale

```html
<template>
<!--omitted for brevity -->

      <!--[START] Locale Toggle Button-->
      <v-btn icon @click="toggleLocale">
        {{this.$i18n.locale}}
      </v-btn>
      <!--[END] Locale Toggle Button-->

<!--omitted for brevity -->
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      // omitted for brevity
    }
  },
  methods: {
    toggleLocale() {
      this.$i18n.locale = this.$i18n.locale === "tr" ? "en" : "tr";
    }
  }
};
</script>
```

## Dialog | Modal

### Amin Evladi

cok canimi sikiyor bu modal konusu...

[Ertesi gunun sabahi]

Good morning. I've just found a model component which can be used as a global dialog for confirmation. Awesome!

[Check this out](https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d)!

:::tip JS Double Negation
It converts a nonboolean to an inverted boolean (for instance, !5 would be false, since 5 is a non-false value in JS), then boolean-inverts that so you get the original value as a boolean (so !!5 would be true).
:::

**Confirm.vue**

```html
<template>
  <v-dialog v-model="dialog" :max-width="options.width" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" flat="flat" @click.native="agree">Yes</v-btn>
        <v-btn color="grey" flat="flat" @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  /**
   * Vuetify Confirm Dialog component
   *
   * Insert component where you want to use it:
   * <confirm ref="confirm"></confirm>
   *
   * Call it:
   * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
   * Or use await:
   * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
   *   // yes
   * }
   * else {
   *   // cancel
   * }
   *
   * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
   * <template>
   *   <v-app>
   *     ...
   *     <confirm ref="confirm"></confirm>
   *   </v-app>
   * </template>
   *
   * mounted() {
   *   this.$root.$confirm = this.$refs.confirm.open
   * }
   */
  export default {
    data: () => ({
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: 'primary',
        width: 290
      }
    }),
    methods: {
      open(title, message, options) {
        this.dialog = true
        this.title = title
        this.message = message
        this.options = Object.assign(this.options, options)
        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      agree() {
        this.resolve(true)
        this.dialog = false
      },
      cancel() {
        this.resolve(false)
        this.dialog = false
      }
    }
  }
</script>
```

Then you can use it in another component. You can pass the values for color, title, and question and then
get the answer with callback function as Boolean value.

> Yılaaaaaan!!! {{ Tssss }}

**App.vue**

```html
<template>
  <v-app>
    <Confirm ref="confirm"></Confirm>
  </v-app>
</template>

<script>
import Confirm from "./components/Shared/Confirm";
export default {
  name: "App",
  components: { Confirm },
  methods: {
    confirm() {
      this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {
        console.log('selam', confirm)
      })
    }
  }
};
</script>
```

Next, I will try to create same model with an input tag.

## Toolbar 

### Toolbar Extension Panel

Add extension panel under the toolbar.

Give Dynamic Title on the extension panel.

