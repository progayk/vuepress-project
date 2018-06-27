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

### EJS Control Flow

* Show examples of control flow in EJS templates
* Write if staatements in an EJS file
* Write loops in an EJS file

```
Loop through all posts
	make an entry div
		title
		tagline
	...

```

In this template we will use a conditional. When using conditional the template syntax of EJS changes slightly. It becomes `<% ... %>`, instead of `<%= ... %>`.

```html
<h1>You fell in love with: <%= thingVar.toUpperCase() %> </h1>

<% if (thingVar.toLowerCase() === 'pasha') { %>
<h2>GOOD Choice! Pasha is the best!</h2>
<% } else { %>
<h3>You should have said Pasha!</h3>
<% }  %>
<p>P.s. this is the love.ejs file</p>
```

### Loops

I want to loop through items in a list, The syntax is very similar to what we used in conditionals.

```html
<h1>The Posts Page</h1>

<h2>ZipCode and City</h2>
<ul>
<% for(var i = 0; i < posts.length; i++) { %>
    <li>post title: <%= posts[i].title %>, post name: <%= posts[i].name %></li>
<% } %>
</ul>
```

Also we can use `forEach()`.

```html
<h2>company name and suffix</h2>
<ul>
<% comps.forEach(function(comp) { %>
    <li><%= comp.name %>, <%= comp.suffix %></li>
<% }) %>
</ul>
```


## Faker.fake()

[GitHub Repo](https://github.com/marak/Faker.js/)

faker.js contains a super useful generator method Faker.fake for combining faker API methods using a mustache string format.

```javascript
var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties
```

```javascript
console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
// outputs: "Marks, Dean Sr."
```

## Styles and Partials

* Show how to properly include public assets
* Properly configure the app to use EJS
* Use partials to dry up the code

We will create a CSS file to make our application more appealing. Express framework offers a good way to serve static files.

Create a new dir under the `src/` called `public` and inside this folder create a new file called `app.css`. We will add referance to this file into our HTML with `<link>` tag. Instead of pointing full file path we will only write file name. 

```html
<link rel="stylesheet" href="app.css">
```

Then we will go to `app.js` file and we tell the `express` to use `static` and we provide the folder name in which we put the static files.

```javascript
app.use(express.static('public'))
```

Also we repeat the code when we specifying the `.ejs` extensions. We can **set** the application to use `ejs` as a *view engine* so that we won't have to write extensions every time.

```javascript
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
    res.render("home"); // here we don't need to write file extension
});
```

### Partials

Partials are good for not repeating ourselves. We will just refer them in every page so we won't need to write html tags or other tags that we use in every view like navbar and footer.

In order to do that we create a new dir under `views/` and we call it `partials`. Inside that folder we create two files called `header.ejs` and `footer.ejs`. Then we will include these partials in our views files.

```javascript
<% include header %>

<!-- some content -->

<% include footer %>
```

It will only work on `home.js` file however if we can solve this problem by adding a `partials` to include section and then also by adding `/` slash like so:  

```html
href="/app.css"
```

```javascript
<% include partials/header %>

<!-- some content -->

<% include partials/footer %>
```

## Post Requests

* Write post routes, and test them with postman
* Use a form to send a post request
* Use body parser to get form data