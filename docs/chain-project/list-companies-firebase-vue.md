---
title: 'List Companies VueFire'
sidebarDepth: 3
---

# List Companies VueFire

In this project I will simply want list clinic names which are stored on [Firebase Datastore](). I will use [VueJS]() as a front-end framework and its package `vuefire` to be able to implement **firebase** into my project. There will be a `Load` button and when it is hit the name of the companies will be retrieved from the **firestore** and be displayed on the screen.

In this tutorial, I will apply a method which will make me more productive and solution oriented. First, I will write the `headings` of the main parts and then `subheadings` and so on. It will enable me to see the big picture and probable outcome of the project. With that, I can analyze the project and decide whether worth to try or consider pre-requisites before start.

## Credits

## Content

[[toc]]


## Set up Environment

* node.js
* install vue-cli
* vue init simple webpack
* npm install firebase and vuefire

Versions of the tools I will be using:

```
➜  list-clinics-firebase-vue npm -v
6.0.1
➜  list-clinics-firebase-vue node -v
v10.1.0
➜  list-clinics-firebase-vue vue --version
3.0.0-beta.7
```

1. Create a project file and init webpack with vue command.

```bash
vue init webpack-simple list-clinics
```

2. Go to `list-clinics` dir and run npm install.

```bash
cd list-clinics
npm i
```


## Set up Firebase

* install sdk 
* create app.js
* create a project
* get API key
* init datastore

1. Install **firebase** and **vuefire** packages. 

```bash
npm install firebase vuefire
```

2. Run dev server.

```bash
npm run dev
```

3. Create a new file `firebase.js` under `src/` dir. This will be the place where our **firebase** conf will live.

```javascript
import { initializeApp } from 'firebase';


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
	apiKey: "<API_KEY>",
	authDomain: "<PROJECT_ID>.firebaseapp.com",
	databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
	projectId: "<PROJECT_ID>",
	storageBucket: "<BUCKET>.appspot.com",
	messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const clinicsRef = firestore.doc('clinics');
```

::: danger
Above, I'm not sure if we can use `firestore()` method directly like this. i will try and see.
:::

4. Go to `main.js`:
	* import the `./firebase` and import `VueFire` alongside with `Vue`.

```javascript
import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'

Vue.use(VueFire);

nev Vue({ ... })
```

## Create Vue Template

* create a load button and bind it to a click event
* display retrieved data as a list

1. Go to `App.vue` file: 
	* Create `h1` and a `button` called `Load`. 
	* Bind `click` event with vue directive to listen events.
	* Create a `ul` and iterate over company names with `v-for` directive

```html
<!-- /App.vue -->

<div id="app">
	<h1>Clinics: </h1>
	<button @click="">load</button>
	<ul>
		<li v-for="company in companies">
			{{ company.name }}
		</li>
	</ul>
</div>
```

## Request to the Firestore

1. On `App.vue`:
	* Create a `data` property named `companies` which will be an empty list.
	* Create a function called `loadCompanies` in `methods` property. This will be function which listens `click` event on the `button` element. When the button is hit we will retrieve data from `firestore`.

```html
<script>
import { clinicsRef } from './firebase';

export default {
	data () {
		return {
			companies: []
		}
	},
	methods: {
		loadCompanies: function () {
			clinicsRef.get().then(function(doc) {
				if (doc && doc.exists) {
					const myData = doc.data();
					this.companies = myData;
				}
			}).catch(err => console.error(err))
		}
	}
}
</script>
```
