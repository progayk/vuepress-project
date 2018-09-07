# Firebase Docs (by Google Cloud)

## Credits

## Content

[[toc]]


## What is Firebase

::: tip
Firebase is a mobile and web application development platform. Firebase is made up of complementary
 features that developers can mix-and-match to fit their needs. [...] Firebase's initial product was a 
 realtime database, which provides an API that allows developers to store and sync data across multiple clients. 
Over time, it has expanded its product line to become a full suite for app development.

from wikipedia: [firebase](https://en.wikipedia.org/wiki/Firebase)
:::

## FIRESTORE, VUE

In this document I will explore what is needed to integrate `firestore` database from `firebase` with `Vuejs`.

Let's start!

Anahatlar: 

<input type="checkbox" name="task" value="vue-cli">
<label for="vue-cli">vue-cli</label><br>

<input type="checkbox" name="task" value="vuejs">
<label for="vuejs">Vuejs</label><br>

<input type="checkbox" name="task" value="vue-router">
<label for="vue-router">vue-router</label><br>

<input type="checkbox" name="task" value="firestore">
<label for="firestore">firestore</label><br>

<input type="checkbox" name="task" value="vuex">
<label for="vuex">vuex</label>



## Proje akisi

* Create a project folder and in it start a new vue project.

<details>
    <summary>See how to install <strong>vue-cli</strong></summary>

    npm i @vue/vue-cli -g

</details>
<br>

```bash
vue init webpack firestore-project
```

* Install vuex and vue-router

```bash
npm i vuex vue-router
```

* Install firebase

```bash
npm i firebase
```

## Project Structure

* Create folders and files.

```
src
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Dashboard.vue
│   ├── Login.vue
│   ├── Navigation.vue
│   └── Settings.vue
├── firebaseConfig.js
├── main.js
├── router
│   └── index.js
└── store
    └── index.js
```

* Create `store` folder under `src` directory and in it create `index.js` file.
This file will keep the `store` object by using `vuex`. 

::: tip Vuex Promise
Did you know that `vuex` **actions** returns *Promise*?
:::

```javascript
this.$store.dispatch(AUTH_REQUEST, { username, password }).then(...)
```

<details>
    <summary><strong>store/index.js</strong></summary>

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
    
},
mutations: {
 
},
actions: {
    
},
getters: {
   
}
})
```

</details>
<br>

<details>
    <summary><strong>main.js</strong></summary>

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import fb from './firebaseConfig'

Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
  store.dispatch('autoSignIn', user)
  store.dispatch('fetchSpaniards')
})
```

</details>
<br>


<details>
    <summary><strong>firebaseConfig.js</strong></summary>

```javascript
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SEND_ID"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
// const currentUser = auth.currentUser
// console.log(currentUser)

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const spaniardsCollection = db.collection('spaniards')

export default {
  db,
  auth,
  // currentUser,
  spaniardsCollection
}

```

</details>
<br>

<details>
    <summary><strong>router/index.js</strong></summary>

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
```

</details>
<br>

<details>
    <summary><strong>src/components/Dashboard.vue</strong></summary>

```html
<template>
  <div>
    <h1>dashboard</h1>
    <ul>
      <li v-for="spaniard in spaniards" :key="spaniard.id">
        spaniard id: {{ spaniard.id }}<br>
        first name: {{ spaniard.firstName }}<br>
        last name: {{ spaniard.lastName }}<br>
        occupation: {{ spaniard.occupation }}
      </li>
    </ul>
    <p style="color: red" v-if="isError">all fields are required</p>
    <input type="text" v-model="firstName.text" :placeholder="firstName.placeholder">
    <input type="text" v-model="lastName.text" :placeholder="lastName.placeholder">
    <input type="text" v-model="occupation.text" :placeholder="occupation.placeholder">
    <button @click="createSpaniard">add spaniard</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isError: false,
      firstName: {
        text: '',
        placeholder: 'first name'
      },
      lastName: {
        text: '',
        placeholder: 'last name'
      },
      occupation: {
        text: '',
        placeholder: 'occupation'
      }
    }
  },
  computed: {
    spaniards () {
      return this.$store.getters.loadedSpaniards
    }
  },
  methods: {
    createSpaniard () {
      if (this.firstName.text !== '' && this.lastName.text !== '' && this.occupation.text !== '') {
        let newSpaniard = {
          firstName: this.firstName.text,
          lastName: this.lastName.text,
          occupation: this.occupation.text
        }
        this.$store.dispatch('createSpaniard', newSpaniard)
        this.firstName.text = ''
        this.lastName.text = ''
        this.occupation.text = ''
      } else {
        this.isError = true
      }
    }
  }
}
</script>

```

</details>
<br>


* You won't get a consistent server side timestamp with a JS date. Instead, send the server timestamp from the SDK.

```javascript
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
ref.update({ updatedAt: timestamp })
```

* Alternatively you can use a javascript library called `momentjs`. It's libriray for manipulating date and time.

## auth in vue app

In your `main.js`, you should listen for `onAuthStateChange`. We only initialize the app only when we are sure Firebase Auth object is ready to use.

<details>
    <summary><strong>main.js</strong></summary>

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
let config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SEND_ID"
};

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});
```

</details>
<br>