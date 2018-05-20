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
// "/bye" => "goodbye!"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
})
// "/dog" => 'Meow!'
app.get("/dog", function(req, res) {
    res.send("Meow!");
})
```

Now, our server listens every request that can be made from a web browser, from terminal, from another application like postman.

In order to run **postman** hit `fn`+`alt`+`F2` and write 'postman' and then hit enter.

## npm init and package.json

* Explain what the package.json does.

Inside this file there are meta data about the application. `json` stands for **JavaScript Object Notation**. It's just a data type, a way of formatting text in a file to represent sturcture.

* Use `npm init` to create a new package.json.

In order to keep file size small and not to push people to install all dependencies at once people don't share `node_modules` folder, instead, they include the information about the packages into `package.json` file. After intalling or forking the repo you can go to the directory where `package.json` file resides and run `npm init`.

```bash
cd project_name
npm init
```

* Use the `--save` flag to install **package.json**. 

When we add the `--save` flag it automatically adds the dependency name and version into `package.json` file.

After creating the package.json file with `npm init` command you will see a file like this:

```json
{
  "name": "package-json-demo",
  "version": "1.0.0",
  "description": "simole package.json demo",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "mayk jony",
  "license": "ISC"
}
```

Now, let's install a package with the `--save` flag.

```bash
npm install express --save
```

Now, open the `package.json` file again, and you will see that express and it's dependencies are automatically saved into out .json file.

```json{11,12,13}
{
  "name": "package-json-demo",
  "version": "1.0.0",
  "description": "simole package.json demo",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "mayk jony",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3"
  }
}
```

## Route Params

* show the `*` route matcher

First, I want you to understand how to configure the route params. Earlier, we created `app.js` file under `firstExpressApp` directory. It goes `/`, `/dog` and `/bye` routes. But, when we try to get a non-existing route we get a `404 page` or a warning that says `can not GET /whatever`.

Now, let's handle any other non-configured routes. Open up the `app.js` file.

```javascript
var express = require("express");
var app = express();

// omitted for brevity

// "*" => "You are a star!!!"
app.get("*", function(req, res) {
    res.send("You are a star!!!")
})

// omitted for brevity
```

This code will run whenever we make a GET request aside one of the existing routes.

::: tip
Whenever you want to show to the user that the page doesn't exist, you can accomplish it by configuring non-existing routes.
:::

::: danger Order of routes matters
If you put `*` route before other routes it will be triggered first, and even if the path that requested exists won't be rendered!!! Always consider this behaviour and put `*` route after other routes.
:::

* Write routes containing route params

We don't want to write every route by hand, It's not compatible with our DRY (Don't Repeat Yourself) approach. Instead, we use variables like routes. So it will dynamically calculated and created.

```javascript
app.get("/r/:subredditName", function(req, res) {
    res.send("welcome to a subreddit.")
})
```

Now, go to route that matches with that path. You will see "welcome to a subreddit." message displayed.

Note that, if a add a `/` it won't no longer work. For example, `blabla.com/r/hello/soccer`. It's not like a **wildcard**.

```javascript
app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    res.send("`welcome to comments page.`")
})
```

Go and chech this path `blabla.com/r/soccer/comments/234/my_first_soccer` and you will see the `welcome to comments page.` message.

We can also pass the path as a paramater into the **callback** function. All the information is send with `req` paramater, so we can reach those parameters by writing

```javascript
app.get("/r/:subredditName", function(req, res) {
    console.log(req);
    res.send("welcome to a subreddit.");
})
```

You will see in the console when you make a request to above path that a lot of information is send when the user make a GET request.

Let's see `req.params` instead of all the information.

```javascript
app.get("/r/:subredditName", function(req, res) {
    console.log(req.params);
    res.send("welcome to a subreddit.");
})

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    console.log(req.params)
    res.send("welcome to comments page.")
})
```

We can use the given path by storing it in a variable.

```javascript
app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("welcome to a " + subreddit.toUpperCase() + " Subreddit.");
})
```

## Assignment-1: Express Routing

1. Create a brand new Express app from scratch
2. Create a package.json using `npm init` and add express as a dependency.
3. In your main app.js file, add 3 different routes.

Visiting "/" should print "Hi there, welcome to my assignment!"
===============================================================
Visiting "/speak/pig" should print "The pig says 'Oink'"
Visiting "/speak/cow" should print "The cow says 'Moo'"
Visiting "/speak/dog" should print "The dog says 'Woof woof!'"
===============================================================
Visiting "/repeat/hello/3" should print "hello hello hello"
Visiting "/repeat/hello/5" should print "hello hello hello hello hello"
Visiting "/repeat/blah/2" should print "blah blah"

If a user visits any other route, print:
"Sorry, page not found... What are you doing with your life?"

### My Solution

Create a **package.json** with `npm init` command. 
Install **express** with npm.

```bash
npm init
npm install express --save
```

Create `app.js` file and write the logic for the server.

```javascript
var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/pig", function(req, res) {
    res.send("The pig says 'Oink'");
});

app.get("/speak/cow", function(req, res) {
    res.send("The cow says 'Moo'");
});

app.get("/speak/dog", function(req, res) {
    res.send("The dog says 'Woof woof!'");
});

app.get("/repeat/hello/:count", function(req, res) {
    var c = parseInt(req.params.count);
    var result = "";
    for (var i = 0; i < c; i++) {
        result += "hello" + " ";
    }
    console.log(result);
    res.send(result);
    
})

app.get("/repeat/blah/:count", function(req, res) {
    var c = parseInt(req.params.count);
    var result = "";
    for (var i = 0; i < c; i++) {
        result += "blah" + " ";
    }
    console.log(result);
    res.send(result);
    
})

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
})

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started!!");
})
```

But, this code is not DRY. Let's make it DRY.

```javascript
var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    // get the name of the animal and convert it to lower-case
    var animal = req.params.animal.toLowerCase();
    // create an object with animals and their sounds
    var sounds = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof',
        cat: 'meow!'
    }
    // get the sound of the animal
    var sound = sounds[animal];
    // if the animal does not exist, redirect the path to:
    if (sound == undefined) {
        res.redirect("/no-where")
    }
    // Response with a string and variables in it.
    res.send(`The animal ${animal} says "${sound}"`);
});

app.get("/repeat/:message/:times", function(req, res) {
    var times = Number(req.params.times);
    var message = req.params.message;
    var result  = "";
    
    for (let i = 0; i < times; i++) {
        result += message + " ";
    }
        
    res.send(result);
})

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
})

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started!!");
})
```

Better structered. Now, We don't have to repeat ourselves, because we have the logic now.