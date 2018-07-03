---
title: 'Yelp Camp Basics'
sidebarDepth: 3
---

# Yelp Camp Project: Basics


## Credits

The course I followed here is on [this link](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3861630?start=0)

You can find the remote VM instance that I use in this course on [this link](https://ide.c9.io/cienciayk/backend-basics).

## Content

[[toc]]

## Initial Routes

* Add landing page
* Add Campgrounds Page that lists all campgrounds

Each Campground has: 
* Name
* Image

## Layout and Basic Styling

* Create a Header and Footer partials
* Add in Bootstrap

## Creating New Campgrounds

* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Styling campgrounds

## Styling Navbar and Form

* Add a navbar to all pages
* Style form 

# DATABASES

## MongoDB

* What is a Database?
    - A collection of information/data
    - Has an interface

* **SQL**(relational) vs **NoSQL**(non-relational)

### Relational Database

**USERS TABLE**
| id | name  |  age  |  city  |
| --- |:----: | ----- | ----------:|
| 1  | Tim   |   27  |  NYC |
| 2  | Ira   |   24  |  Washington |
| 3  | Sue   |   30  |  Boulder |


**COMMENTS TABLE**
| id | text |
| -- | ---:|
| 1 | "lol" |
| 2 | "I love puppies!" |
| 3 | "and whatever" |

**USER/COMMENTS JOIN TABLE**

| useId | commentId |
| -- | ---:|
| 1 | 2 |
| 2 | 1 |
| 2 | 3 |

> Everything is tabular.

> The problem with relational databases is that they are not flexible. All the data must be structured. And whenever we want to add a new column we will have to add the same column to every record. 

### Non-relational Databases

**NON-REALATIONAL DATABASE:**

```
{
    name: "Ira",
    age: 24,
    city: "Washington",
    comments: [
        { text: "lol" },
        { text: "and whatever" }
    ]
}
```

> It's not a *Flat* database and also it have nested structure.

## Install MongoDB

* What is MongoDB?
* Why are we using it?
* Let's Install It!

### Mongo shell basics

* mongod
* mongo
* help
* show dbs
* use
* insert
* find
* update
* remove
* db

Create a database with `use command`. This command will check if the database name exists, if not it creates new one with the given name.

In order to see the DB we created we need to add a so called `collection` in it.

Let's create a collection with the name `'dog'` and put some data in it. When we hit the enter below result will return which indicates that an item is inserted.

#### Insert

```
> db.dogs.insert({ name: "Rusty", age: 12 })
WriteResult({ "nInserted" : 1 })
```

To see the all dogs in our database we will use `find` method.

> If we don't pass anything with `find()` method it will retrieve all the objects in `dogs` collection.

#### Find

```
> db.dogs.find()
{ "_id" : ObjectId("5b3a11e4ed8367e60ba70336"), "name" : "Rusty", "age" : 12 }
{ "_id" : ObjectId("5b3a126aed8367e60ba70337"), "name" : "Pasha", "age" : 8 }
```

::: tip
You can see that mongo automatically creates an unique `ID` for each object.
:::

You can also pass parameters with `find()` method as object.

```
> db.dogs.find({ name: "Pasha" })

{ "_id" : ObjectId("5b3a126aed8367e60ba70337"), "name" : "Pasha", "age" : 8 }
```

```
> db.dogs.find({ age: 8 })

{ "_id" : ObjectId("5b3a126aed8367e60ba70337"), "name" : "Pasha", "age" : 8 }
{ "_id" : ObjectId("5b3a134ded8367e60ba70338"), "name" : "Lulu", "age" : 8 }
```

#### Update

Update takes two objects as parameter:

```
db.dogs.update({ name: "Lulu"}, { age: 13 })

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

There is a one issue that when we updated we removed the name from Lulu object. We can avoid this by passing `$set` keyword and then tell which parts of data will be updated:

```
> db.dogs.update({ name: "Pasha"}, {$set: { name: "Pashanta", isCute: true }})

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.dogs.find()

{ "_id" : ObjectId("5b3a11e4ed8367e60ba70336"), "name" : "Rusty", "age" : 12 }
{ "_id" : ObjectId("5b3a126aed8367e60ba70337"), "name" : "Pashanta", "age" : 8, "isCute" : true }
{ "_id" : ObjectId("5b3a134ded8367e60ba70338"), "age" : 13 }
> 
```

#### Remove

By default it will delete everything that matches.

```
> db.dogs.remove({ age: 13 })

WriteResult({ "nRemoved" : 1 })

> db.dogs.find()

{ "_id" : ObjectId("5b3a11e4ed8367e60ba70336"), "name" : "Rusty", "age" : 12 }
{ "_id" : ObjectId("5b3a126aed8367e60ba70337"), "name" : "Pashanta", "age" : 8, "isCute" : true }
> 
```

**limit**

> How to use `limit()` method.

### Mongoose

* What is mongoose
    - is an ODM (Object Data Mapper)
* Why are we using it?
* Interact with a Mongo Database using Mongoose

```bash
npm i mongoose
```

* Require and Connect the mongodb to mongoose

```javascript
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/cat_app")
```

#### Create a Schema

Even though we use non-rel DB it's better practice to define the Structure.

```javascript
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
})

// Get the Schema and compile it.
var Cat = mongoose.model('Cat', catSchema)
```

* Adding a new data in mongo 

```javascript
// Adding a new cat into the DB
// Create a new mongoose object
var george = new Cat({
    name: "Goerge",
    age: 11,
    temperament: "Grouchy"
})


george.save((err, cat) => {
    if (err) {
        console.log("something went wrong!")
    } else {
        console.log("Everything went fine!")
        console.log(cat)
    }
})
```

**Another way to create**

```javascript
// Another way to create

Cat.create({
    name: 'HowHOw',
    age: 5,
    temperament: "Kkous"
}, (err, cat) => {
    if (err) {
        console.log("ERror happened: ", err)
    } else {
        console.log('newly created cat')
        console.log(cat)
    }
})
```

When we run the code you can see on terminal it returns an object

```bash
$ node cats.js 
Everything went fine!
{ _id: 5b3a1caf4b3fc6164bdca136,
  name: 'George',
  age: 11,
  temperament: 'Grouchy',
  __v: 0 }
```

#### Retrieve with find

```javascript
// retrieve all cats from the DB and log each one

Cat.find({}, (err, cats) => {
    if (err) {
        console.log("Oh no!, Error!")
    } else {
        console.log("All the Cats...")
        console.log(cats)
    }
})
```

## Integrate mongoose with Yelp Camp

```javascript

// Mongoose
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/yelp_camp')

var campgroundSchema = new mongoose.Schema({
    name: String,
    imageUrl: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

app.get('/campgrounds', (req, res) => {
    // Get all campgrounds
    Campground.find({})
    .then(campgrounds => { 
        res.render('campgrounds', { campgrounds })
    })
    .catch(err => { console.log(err) })
})
```

### Save a new campground

```javascript
app.post("/campgrounds", (req, res) => {
    var name = req.body.name
    var imageUrl = req.body.imageUrl
    
    var newCampground = { name, imageUrl }
    
    Campground.create(newCampground)
        .then(data => { 
            console.log(data)
            res.redirect("/campgrounds")
    
        })
        .catch(err => { console.log(err) })
})
```

## Show Page
* Review the RESTful routes we've seen so far
* Add a description to out campground model
* Show db.collection.drop()
* Add a show route template

### ReSTful Routes

| name | url | verb | description
| -- |:---:|---:|---:| 
| Index | /dogs | GET |  Display a list of all dogs |
| New | /dogs/new | GET |  Displays form to create a new dog |
| Create | /dogs | POST |  Add new dog to DB |
| Show | /dogs/:id | GET |  Shows info about one dog |

