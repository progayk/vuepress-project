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