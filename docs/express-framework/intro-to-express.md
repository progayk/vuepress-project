---
title: 'Introduction to Express'
sidebarDepth: 3
---

# Introduction to Express


## Credits

The link of this course is [on here](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3861596?start=0).
The development environment of this tutorial is on [cloud9 server](https://ide.c9.io/cienciayk/backend-basics)

## Content

[[toc]]

## First Express App

Create the project file `<project_name>`. In this tutorial I named my project `firstExpressApp`. Go into the project folder and create `app.js` file.

```bash
mkdir firstExpressApp
cd firstExpressApp

touch app.js
```

To check if app.js file runs put the below code in it.

```javascript
console.log('our first express app')
```

Then run the file.

```bash
node app.js
```

install **express framework**.

```bash
npm install express --save
```

Next thing to do is `require` expess in `app.js` file. Then save it into a variable, in this case `app`.

```javascript
var express = require("express");
var app = express();
```

Check if everything runs fine. If it is, we shouldn't see any error after running this:

```bash
node app.js
```

Now, we will create the **routes** and functions. When the site gets a request to **'/'**, the message "Hi there!" will be displayed. And the others will be: **'/bye'** => 'goodbye!' and **'/dog'** => "meow!".

When the request is `GET`, app will be listening with `get` function. It takes a callback with `req` and `res` (request, response) parameters. 

`req` and `res` are actually objects. They contain all the information about the **request** and the **response**.

```javascript
var express = require("express");
var app = express();

// "/" => "Hi, there!"
app.get("/", function(req, res) {
    res.send("Hi, there!");
})
// "/bye" => "goodbye!"
// "/dog" => 'Meow!'
```
We created this but when we run it, it won't run as we expect. We need to tell the express to listen the different routes. 

::: warning
Normally, we need to listen PORT 3000 but since we use **cloud9** we need to make this a little different by using `process.env.PORT`.
:::

::: tip
There is one other information that we need to pass in `process.env.IP`. We will be using this in every application that we use express.
:::

```javascript
var express = require("express");
var app = express();

// "/" => "Hi, there!"
app.get("/", function(req, res) {
    res.send("Hi, there!");
})
// "/bye" => "goodbye!"
// "/dog" => 'Meow!'

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP)
```

There is also one thing that we can add a callback function to `app.listen()` to declare that server has started.

```javascript
app.listen(process.env.PORT, process.env.IP)
```

Now, run the applicaion.

```bash
node app.js
```

Your app is now on running on **cloud9** server. You can visit the page by clicking `Preview` button on the navbar. 

Let's, create other routes.

```javascript

```

Now, our server listens every request that can be made from a web browser, from terminal, from another application like postman.

In order to run **postman** hit `fn`+`alt`+`F2` and write 'postman' and then hit enter.