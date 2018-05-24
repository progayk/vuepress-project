---
title: 'SSR with Vue Apps with Nuxt.js'
sidebarDepth: 3
---

# SSR with Vue Apps with Nuxt.js

Flexible, scaleble cloud database to store and sync data for client- and server-side development.

[Firebase official docs](https://firebase.google.com/docs/firestore/quickstart?authuser=0).

## Credits

The link of this course is [on here](https://www.youtube.com/watch?v=ZYUWsjUxxUQ).

## Content

[[toc]]

## What is Nuxt.js?

Server-side Rendering Framework.

[nuxt.js official site](https://nuxtjs.org/).

It enables us to split **Static Assets** from **Server Assets**.

## Setup Environment

```bash
mkdir nuxt-ssr && cd nuxt-ssr
```

```bash
vue init nuxt-community/starter-template src
```

Choose the options after running above command.

Create a `public` folder which will contain our static assets and `functions` folder which will contain our server synamic assets

```bash
mkdir public
mkdir functions
```

Install the dependencies.

```bash
npm install
cd src
```

### isomorphic-fetch package

Go to `src/` and install `isomorphic-fetch` via npm. So we can do HTTP requests on the client and the server.

Open up your editor and go to `src/pages/index.vue`. Remove the styling and script section and default templates.

Import `isomorphic-fetch` and add `async asyncData()`. This is a method that Vue and Nuzt provide for you. What you can do is you can resolve any asynchronous data into your component. In our case we are going to be retreiving a list of facts from the server. It means we return a **promise** from this method.

```html
<script>
import fetch from 'isomorphic-fetch'

export default {
	async asyncData() {
		const response = await fetch('https://nuxt-sst.firebaseio.com/facts.json');
		const facts = await response.json();
		return { facts };
	}
}
</script>
```

### Async Function

[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

The `async function` declaration defines an **asynchronous function**, which returns an `AsyncFunction` object.

```javascript
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

asyncCall();
```

**output**

```
> "calling"
> "resolved"
```

**continue**

Now we will render the items in the object `facts` with `v-for` directive.

::: warning hatirlatma
Since it's gonna demand a `key` We need to provide one, but we don't have `id` so in order to trick this we gonna add `:key="fact.key"` for now.
:::

```html
<template>
	<ul>
		<li v-for="fact in facts">
			{{ fact.text }}
		</li>
	</ul>
</template>
```

Go to `src` folder and run npm dev.

```bash
cd src
npm run dev
```

Now it will be on `http://localhost:3000`.

### Babel

::: tip
This code will run on modern browsers but things like `async`, `duconstracted objects`, `await` won't work on older browsers. We need to `compile` this code down so it works on older browsers.
:::

We achieve this with [Babel](https://babeljs.io/). And even better, **nuxtjs** has an integration with **Babel**.

In order to get the babel we need to go to `package.json` package. And, we will add some `dependencies`. Find `devDependencies` in our json file and add:

```javascript
{
	// omitted
	"devDependencies": {
		"babel-plugin-module-resolver": "^2.7.1",
		"babel-plugin-transform-runtime": "^6.23.0",
		"babel-preset-es2015": "^6.24.1",
		"babel-preset-stage-0": "^6.23.0",
		"babel-eslint": "^7.2.3",
		...
	}
}
```

Run `npm i` in `src/` directory.

```bash
npm i
```

Now, I am going to `nuxt.config.js` file. This is a big configuration file. Find `build` object. This is where we set how our application gets *build*. I'm gonna specify a `public PATH`, this is where our **static assets** are. THen I will specify `vendor`, in this case `isomorphic-fetch`. Set `extractCSS` to be **true**.

Then with `babel` we actually set how I want my code **compiled** down.



```javascript
build: {
	publicPath: '/public/',
	vendor: ['isomoprhic-fetch'],
	extractCSS: true,
	babel: {
		presets: [
			'es2015',,
			'stage-0'
		],
		plugins: [
			["transform-runtime", {
				"polyfill": true,
				"regenerator": true
			}],
		]
	}
}
```

Now that my plugins specified, I am gonna do a `npm build` to build out my Nuxt App. Even if it gets build, it doesn't to the location I want to. So, above `build` i will set `buildDirectory`, and it's going to be `../functions/nuxt`.I wanted to build that to my functions folder, because that's where my server apps are going to be.

```javascript
buildDir: '..functions/nuxt',
build: [ ... ]
```

Now do `npm build`.

```bash
npm build
```

It will complain to me that can't find `transform-runtime` plugin because we put it in `functions` folders it's gonna look for dependencies in that folder, so create a new `package.json` file under `functions` directory. I'm gonna poste this json into `.json` file.

```javascript
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "dependencies": {
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-stage-0": "^6.24.1",
    "babel-runtime": "^6.23.0",
    "clone": "^2.1.1",
    "debug": "^3.1.0",
    "es6-promise": "^4.1.1",
    "express": "^4.15.4",
    "firebase-admin": "^5.0.1",
    "firebase-functions": "^0.6.1",
    "isomorphic-fetch": "^2.2.1",
    "lodash": "^4.17.4",
    "nuxt": "1.0.0-rc11",
    "vue": "~2.4.2",
    "vue-meta": "^1.2.0",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.0"
  },
  "private": true
}
```

In this file we configure our dependencies and `firebase` admin and functions etc.

Now, cd into `functions/` and run `npm i` to install dependencies. And tha n go to `src/` dir. and run `npm i` again.

```bash
npm i functions/
npm i src/
```

As you can see, we have our `nuxt` folder.

### Next

So, we have our server dependencies set up in our `functions` folder, but it's also going to contain all our **static assets**. We don't want to deliver **static assets** from our `functions` server. We want to deliver that from a **Firebase Hosting CDN**. Because the static assets are like our images, our CSS, our client-side JavaScript those don't need to be generated by the server. What we need to do put them in our `public` folder, sso they're served from **Firebase Hosting CDN** and seperatly from our *server-side rendered assets*.

I will copy the assets from `functions/nuxt/dist/` to `public/assets`

```bash
cp -R functions/nuxt/dist/ public/assets
```

Files are copied now we can set up our server code. 

## Server Set up

Inside of `functions` create `index.js` file which you require from `firebase-functions` and also `Nuxt`; `express` and create an `express` app to get my server started. First thing, I need to do for my `Nuxt` server is set up a configuration that says we are not in `dev` mode, our *build dir* is a *Nuxt* folder and our *publict PATH* is the `public/` folder.

```javascript
const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

const app = express();

const config = {
	dev: false,
	buildDir: 'nuxt',
	build: {
		publicPath: '/public/'
	}
}
```

Using this configuration I will create a new `Nuxt` server by passing in the config.

```javascript
// omitted: below everything
const nuxt = new Nuxt(config);
```

Handle `requests` through `handleRequest` method, which will take in a request and return a response. I will use `nuxt.renderRoute()` function to point `'/'` since we only have one page in our app. This returns a **Promise** of a `result` and the `result` has HTML, so I can say `res.send(result.html)` . But we also could have errors, so I will use a `catch` block and if there is any error it will send the error message.

Lastly, tell the app to handle all request to any PATH.

```javascript
function handleRequest(req, res) {
	nuxt.renderRoute('/')
		.then(result => {
			res.send(result.html);
			})
		.catch(e => {
			res.send(e);
			})
}


app.get('*', handleRequest);
```

Now, all i have to do is `export` the function.

```javascript
// omitted

exports.ssrapp = functions.https.onRequest(app);
```

This code is magical because with few lines of code we make server-side rendering. But what we don't do is the CDN caching for our **dynamic server-side rendered response**.

We can do this by setting the `Cache-Control` header.

```javascript
function handleRequest(req, res) {
	res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
	nuxt.renderRoute('/')
		.then(result => {
			res.send(result.html);
			})
		.catch(e => {
			res.send(e);
			})
}
```

`max-age` says this will be cached in the user's local browser cache for 600 seconds. and `s-maxage` says that this will be cached on the CDN level for 1,200 seconds.

## Run locally

We have our server set up, now I will run this locally. To be able to do that I need **firebase cli**. To install it:

```bash
npm i -g 'firebase-tools'
```

After installing run inside `nuxt/nuxt-ssr` directory:

```bash
firebase init hosting
```

Choose the default project, set `public directory` to `public`. And I'm not gonna configure any **single page app routes**. And inside `public` folder I will delete **index.html** and **404.html** files since Im not gonna need them. 

Then go to `firebase.json` file. Im gonna set up `rewrite` for my server-side rendered app. And this rewrite will be able to tell **Cloud Functions** and **Firebase Hosting** how to communicate with each other. I'm gonna say for all routes, call this function called `ssrapp`. And `ssrapp` is what we named our **Cloud Function**. So, it will know how to talk to each other.

**firebase.json**

```javascript
{
	"hosting": {
		"public": ... ,
		"rewrites": [{
			"source": "**"
			}]
	}
}
```

I'm gonna serve this locally and set `post` of `5004`

```bash
firebase serve --only functions, hosting -p 5004
```

So, it look like it works but when we open up the console on the browser we will see some errors that says `unexpected token`. And if go to the `Network` panel and click on one of the assets, you can see that it is looking for this asset in a `public/` folder. And what's happening here is this is not being recognized as a **sataic asset**. So, it's going to our server and it's trying to generate an HTML reponse, which is why we have an `unexpected token`. We need to fix how we are setting our **static assets**.

::: tip
If you ever see this method, it's because you are generating a HTML, rather than serving your static assets.
:::

To fix this. I'm gonna open `nuxt.config.js` file and change the `publicPath` to just be `"/"`(the root of my directory). THen go to `index.js` and also change that to `"/"`.

::: tip
Yes, you can `require` this `config` file and use it in `index.js` but for this tutorial, I wanted to keep things explicit so I'm using two seperate versions.
:::

So go to `src/` and run `build`

```bash
cd src
npm build
```

**Important**
I'm gonna cd out and make sure to copy the assets again.

```bash
cd ..
cp -R functions/nuxt/dist public/
```

I'm ready to `deploy`

```bash
firebase deploy
```

Visit the URL and you will see our app.


## What's next?

[What's server-side rendering](https://www.youtube.com/watch?v=GQzn7XRdzxY&list=PLl-K7zZEsYLkbvTj8AUUCfBO7DoEHJ-ME&index=2)

* What is the **server-side rendering**?
* What is the real benefit?