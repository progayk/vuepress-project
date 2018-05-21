---
title: 'Intermediate Express'
sidebarDepth: 3
---

# Intermediate Express


## Credits

The link of this course is [on here](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3861616?start=15).
The development environment of this tutorial is on [cloud9 server](https://ide.c9.io/cienciayk/backend-basics)

## Content

[[toc]]

## Templates and EJS (Embedded Js)

* Use res.render() to render HTML(from an EJS file)
* Explain what EJS is and why we use it
* pass variables to EJS templates

We have seen how to send a response when a GET request recieves. But, we've only sent texts and it's not very useful. We want to send HTML, CSS, JS and other media stuff. How we can achieve this? Well, express has a function called `render()` that resides in the `response` object. By using `render()` function we can render HTML for example. But we want to also change dynamically the HTML. So we need `templates`. In this example we will see how to use **Embedded JavaScript** template. To be able to use EJS, we need to install it via `npm`.

```bash
npm install ejs --save
```

```javascript
// app.js
var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening...");
});
```

The `home.ejs` should reside in `views` folder, because **EJS** will look first that folder.

```bash
mkdir views
touch views/home.ejs
c9 views/home.ejs
```

```html
<h1>This is the home page</h1>
<img src="https://thumb7.shutterstock.com/display_pic_with_logo/73315/114919084/stock-photo-beautiful-home-patio-with-view-and-sunset-reflection-114919084.jpg">
```

Now, run the server and visit the `localhost`.

```bash
node app.js
```

We've seen how to render dynamic content, now we will see how to pass it into HTML template and render the content dynamically with EJS.

Create a new get function in `app.js`. We will get the parameter from the path and pass the variable as an object with `render()` function.

```javascript
var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening...");
});
```

To pass the variable values to EJS template we use `<%=  %>` syntax. Whatever you put in this brackets will be rendered as JavaScript. Create `love.js` file under `views` folder. 

```bash
touch views/love.js
```

```ejs
<h1>You fell in love with: <%= thingVar %> </h1>

<p>P.s. this is the love.ejs file</p>
```

You can also manipulate the data both on server side and in the template.

```ejs
<h1>You fell in love with: <%= thingVar.toUpperCase() %> </h1>

<p>P.s. this is the love.ejs file</p>
```

## EJS: Conditionals and Loops



