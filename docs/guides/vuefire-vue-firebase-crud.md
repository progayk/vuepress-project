---
title: 'VueFire'
sidebarDepth: 3
---

# VueFire: Vuejs + Firebase CRUD App

## Credits

The link of this course is [on here](https://www.youtube.com/watch?v=831zOI02Q_0).

## Content

[[toc]]

## Create Application with Vuejs

Install `vue-cli` 

```bash
npm install vue-cli -g
```

Create new project with `vue-cli` based on `webpack`:

```bash
vue init webpack-simple v-fire
```

Install dependencies.

```bash
cd v-fire
npm install
```

Install `firebase` and `vuefire` which allows us to to use `firebase` inside our Vue application.

```bash
npm install firebase vuefire
```

```bash
npm run dev
code .
```

## Install firebase and vuefire

Open the project and remove everything from `App.vue`.

Let's get the **Firebase API Key**. Go to [official page](https://firebase.google.com/) of Firebase. Create a new project named `vuefire-project`. Select `Web App` to continue. Copy the javascript object from the script.

Create a new file under `src` called `firebase.js`

```javascript
import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SEND_ID"
});

export const db = app.database();
export const namesRef = fb.ref('names');
```

Go to `main.js` and import the `./firebase` and import `VueFire`

```javascript
import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'

Vue.use(VueFire);

new Vue({
	el: '@app',
	render: h => h(App)
})
```

## Template

Create template for 

Bind the `name` value to `input` tag. This will make Vue to store `name` value and bind it to `name` key inside `data` property.

```html
<template>
	<div id='app'>
		<label>Name: </label>
		<input type="text" v-model="name">
		<button>Add</button>
	</div>
</template>
```
Now, we can create a data property. Then we will create a `method` property called `submitName` to save the data to **Firebase** store. We will import `namesRef` from `./firebase`. We will pass `name` by using `this` keyword and an additional parameter `edit: false`. You can handle editing on the client side but now I will handle it on firebase for now, just because I want to show things like `UPDATE` and `SET`. 

```javascript
import { namesRef } from './firebase';

export default {
	data() {
		return {
			name: 'Mayk'
		}
	},
	methods: {
		submitName() {
			namesRef.push({name: this.name, edit: false});
		}
	}
}
```

When the user clicks `Add` button, the `submitName` function will run and save the user input for the `name` to the firebase.

```html
<button @click="submitName()">Add</button>
```

When we try to click the button now, firebase will throw an error. The error is about the **Permisions** we need to go to **firebase console** and declare the **Rules**. Under Rules change `read` and `write` to both be `true`. Now, anybody can read and write to your database.

::: warning
This configuration is only for development, **DON'T** is it in production.
:::

On the firebase console select `DATA`. When we push a new data to store it will appear on this window. Go and try to `Add` button. Then, go and chehk `DATA` window. You will see that the value for `name` you passed appeared on the console window. You can examine the data you passed. 

## Display name

Now we have the first data in firebase store. Let's display it on the page also. All we need to create a `firebase` object into VUe instance.

```javascript
import { namesRef } from './firebase';

export default {
	// omitted
	firebase: {
		names: namesRef
	}
	// omitted
```
Next, inside the HTML add another `div` and put a `v-for` directive to list the names, and bind the `key`. 

```html
<div>
	<ul>
		<li v-for="personName of names" :key="personName['.key']">
			{{ personName.name }}
		</li>
	</ul>
</div>
```

## DELETE item from the list

I want to delete names from the firebase. I will add a `button` into HTML and listen for click events by using `@click`. Then I will pass a function called `removePerson` among `methods` properties. Since we binded each item in the list with `:key` we can access each of them seperately.

```html
<li v-for="personName of names" :key="personName.['key']">
	<p>{{ personName.name }}</p>
	<button @click="removeName(personName['.key'])">Remove</button>
</li>
```

Implement the function `removePerson`. We will pass the `key` as a parameter and then we will access it with `child()` method.

```javascript
methods: {
	submitName() {
		namesRef.push({name: this.name, edit: false});
	},
	removeName(key) {
		namesRif.child(key).remove();
	}
}
```

When we add a new item, clean the value in the `input` tag. 

```javascript{6,12}
import { namesRef } from './firebase';

export default {
	data() {
		return {
			name: ''
		}
	},
	methods: {
		submitName() {
			namesRef.push({name: this.name, edit: false});
			this.name = '';
		}
	}
}
```

## EDIT button

We can add and remove name. Now, it's time to add `Edit` button. First, create a `Edit` button next to `Remove`. I will name it `setEditName` cause it will set the `edit` to be `true` on server side.

```html
<button @click="setEditName(personName['.key'])">Edit</button>
```

Add it to `methods` in Vue instance. When we want to update a data we need to turn `edit` value to `true`. 

```javascript
methods: {
	setEditName(key) {
		namesRef.child(key).update({ edit: true })
	}
}
```

When the `edit` is `true` I want to display a textbox to edit the value. We will wrap all the content in a `div` and add `v-if` directive `v-if="!personName.edit"`. So, when we are not editing, I want to only display standart version. When the `Edit` button is hit and `edit` becomes `true`. We will add a new `div` with `v-else` directive this time.

```html
<div v-if="!personName.edit">
	...
</div>
```

We also add `Save`, `Cancel` buttons with the associated buttons.

```html
<div v-else>
	<input type="text" v-model="personName.name">
	<button @click="saveEdit(personName)">Save</button>
	<button @click="cancelEdit(personName['.key'])">Cancel</button>
</div>
```

To overwrite the value of the data we will use `set()` function.

```javascript
cancelEdit(key) {
	namesRef.child(key).update({ edit: false })
},
saveEdit(person) {
	const key = person['.key']
	namesRef.child(key).set({ name: person.name, edit: false })
}
```

Everything is ready! Enjoy your app.

## What to do next?

There is another video of a full application on [this link](https://www.youtube.com/watch?v=sYNjEzcOTOs) by [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA).