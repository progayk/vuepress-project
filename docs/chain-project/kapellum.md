---
title: 'Kapellum Project'
sidebarDepth: 3
---

# Kapellum Project


## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5941322?start=0).

## Content

[[toc]]

## Add bulma to nuxtjs project

* install bulma

```bash
npm i bulma
```

* Install dependecies

```bash
npm i -D nuxt-sass-resources-loader vue-style-loader node-sass sass-loader
```

**nuxt.config.js**

```javascript
  /*
  ** Global CSS
  */
  css: [
    // node.js module but we specify the pre-processor
    { src: '~/assets/style/main.scss', lang: 'scss' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
  ],
  modules: [,
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // Bir alltakini comment ettim.
    // '@nuxtjs/bulma',
    ['nuxt-sass-resources-loader', './assets/style/main.scss']
  ],
  ```

  ### Customize Bulma

  ```bash
  touch assets/style/main.scss
  ```

  **assets/style/main.scss**

  ```scss
  // File: assets/main.scss
// 1. Import the initial variables
@import '~bulma/sass/utilities/initial-variables';

// 2. Set your own initial variables
$listiyo-red: #FF6E60;

// 3. Set the derived variables
$primary: $listiyo-red;


// 4. Import the rest of Bulma
@import "~bulma/bulma";

```

## Install and add axios

Use [https://reqres.in/](https://reqres.in/) as a free API for this example.

* Install axios for nuxt

```bash
npm i @nuxtjs/axios --save
```

* Go to `package.json` and check if @nuxt/axios package is added in `dependencies` Array.

**package.json**

```json
  },
  "dependencies": {
    "@nuxtjs/axios": "^5.3.1",
    "@nuxtjs/bulma": "^1.0.3",
    "font-awesome": "^4.7.0",
    "nuxt": "^1.0.0"
  },
```

* Add `@nuxt/axios` to `modules` in **nuxt.config.js** file.

**nuxt.config.js**

```javascript
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // Bir alltakini comment ettim.
    // '@nuxtjs/bulma',
    '@nuxtjs/axios',
    ['nuxt-sass-resources-loader', './assets/style/main.scss'],

  ],
```

* Use it in your Vue component

**Clinics**

```html
<template>
  <div class="container is-fluid">
    <h2 class="title">Special Offers</h2>

    <div class="columns">
      <ClinicCard
        v-for="clinic in clinics"
        :key="clinic.index"
        :thumbnail="clinic.avatar"
      />
    </div>
    <nuxt-link to="/">Show all (47+) ></nuxt-link>
  </div>

</template>

<script>
  import ClinicCard from '../Cards/ClinicCard'
  export default {
    components: {
      ClinicCard
    },
    data() {
      return {
        clinics: [],
        resNumber: 5
      }
    },
    methods: {
      logClinics() {
        console.log(this.clinics[0])
      }
    },
    created() {
      var vm = this;
      this.$axios.get('https://reqres.in/api/users', {
        params: {
          'per_page': 5
        }
      }).then(response => {
        console.log(response)
        vm.clinics = response.data.data;
      }).catch((e) => {
        console.error(e)
      })
    }
  }
</script>

<style scoped>

</style>
```

**ClinicCard.vue**

```html
<template>
  <div class="is-one-third column is-one-quarter-fullhd">
    <div class="card ">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="thumbnail" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
        </div>
      </div>

      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
      </footer>
    </div>
  </div>
</template>

<script>
    export default {
        props: [ 'thumbnail' ]
    }
</script>

<style scoped>
  .card {
    border-radius: 4px;
  }
</style>

```


## Axios get current path


```html
<TheSpaceBetween
      v-if="$nuxt.$route.path !== '/'"
    />
```


## Bulma CSS framework u sikecem yakinda