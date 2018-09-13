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


**ModalInput.vue**
```html
<template>
  <!--<v-layout row justify-center>-->
    <v-dialog lazy v-model="dialog" full-width persistent max-width="290">
      <div dense slot="activator" flat class="ma-0 pa-0" style="color: gray">

        {{$t('newPage')}}</div>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!--</v-layout>-->
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>
```

Gerisini yazacak halim kalmadi. See you tomorrow.