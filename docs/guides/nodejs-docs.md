---
title: Node.js Docs
sidebarDepth: 3
---

# Node.js Docs

## NodeSchool.io

Node.js is an open source project designed to help you write JavaScript programs that talk to networks, file systems or other I/O (input/output, reading/writing) sources. That's it! It is just a simple and stable I/O platform that you are encouraged to build modules on top of.

[Here](https://github.com/maxogden/art-of-node) is the docs on github.

There is a practice environment of my own on [Cloud 9](https://ide.c9.io). Reach it from [this link](https://ide.c9.io/cienciayk/backend-basics)

Node handles I/O with: `callbacks`, `events`, `streams` and `modules`. If you learn how these four things work then you will be able to go into any module in node core and have a basic understanding about how to interface with it.

## Credits

I found a very good tutorial on [this link](https://codeburst.io/all-about-core-nodejs-part-1-b9f4b0a83278) by *Rajesh Pillai*. I will use some of its content on this docs. 

Many thanks to [nodeschool.io](https://nodeschool.io).

[free code camp Nodejs Course](https://www.freecodecamp.org/challenges/continue-working-with-nodejs-servers)

## An introduction to Node.js

Usually building these kinds of systems is either:

* difficult to code but yields super fast results (like writing your web servers from scratch in C)
* easy to code but not very speedy/robust (like when someone tries to upload a 5GB file and your server crashes)

Node's goal is to strike a balance between these two: relatively easy to understand and use and fast enough for most use cases.

Node isn't either of the following:

* A web framework (like Rails or Django, though it can be used to make such things)
* A programming language (it uses JavaScript but node isn't its own language)
Instead, node is somewhere in the middle. It is:

Designed to be simple and therefore relatively easy to understand and use
Useful for I/O based programs that need to be fast and/or handle lots of connections

At a lower level, node can be described as a tool for writing two major types of programs:

* Network programs using the protocols of the web: HTTP, TCP, UDP, DNS and SSL
* Programs that read and write data to the filesystem or local processes/memory


What is an "I/O based program"? Here are some common I/O sources:

* Databases (e.g. MySQL, PostgreSQL, MongoDB, Redis, CouchDB)
* APIs (e.g. Twitter, Facebook, Apple Push Notifications)
* HTTP/WebSocket connections (from users of a web app)
* Files (image resizer, video editor, internet radio)

Node does I/O in a way that is [asynchronous](https://en.wikipedia.org/wiki/Asynchronous_I/O) which lets it handle lots of different things simultaneously. 

For example, if you go down to a fast food joint and order a cheeseburger they will immediately take your order and then make you wait around until the cheeseburger is ready. In the meantime they can take other orders and start cooking cheeseburgers for other people. Imagine if you had to wait at the register for your cheeseburger, blocking all other people in line from ordering while they cooked your burger! This is called blocking I/O because all I/O (cooking cheeseburgers) happens one at a time. Node, on the other hand, is non-blocking, which means it can cook many cheeseburgers at once.

## Core Modules


Firstly I would recommend that you get node installed on your computer. The easiest way is to visit nodejs.org and click `Install`.

Node has a small core group of modules (commonly referred to as 'node core') that are presented as the public API that you are intended to write programs with. For working with file systems there is the fs module and for networks there are modules like `net` (TCP), `http`, `dgram` (UDP).

In addition to `fs` and network modules there are a number of other base modules in node core. There is a module for asynchronously resolving DNS queries called `dns`, a module for getting OS specific information like the tmpdir location called `os`, a module for allocating binary chunks of memory called `buffer`, some modules for parsing urls and paths (`url`, `querystring`, `path`), etc. Most if not all of the modules in node core are there to support node's main use case: writing fast programs that talk to file systems or networks.

Node handles I/O with: `callbacks`, `events`, `streams` and `modules`. If you learn how these four things work then you will be able to go into any module in node core and have a basic understanding about how to interface with it.

### Callbacks

This is the most important topic to understand if you want to understand how to use node. Nearly everything in node uses callbacks. They weren't invented by node, they are just part of the JavaScript language.

Callbacks are functions that are executed asynchronously, or at a later time. Instead of the code reading top to bottom procedurally, async programs may execute different functions at different times based on the order and speed that earlier functions like http requests or file system reads happen.

The difference can be confusing since determining if a function is asynchronous or not depends a lot on context. Here is a simple synchronous example, meaning you can read the code top to bottom just like a book:


```javascript
var myNumber = 1
function addOne() { myNumber++ } // define the function
addOne() // run the function
console.log(myNumber) // logs out 2
```

The code here defines a function and then on the next line calls that function, without waiting for anything. When the function is called it immediately adds 1 to the number, so we can expect that after we call the function the number should be 2. This is the expectation of synchronous code - it sequentially runs top to bottom.

Node, however, uses mostly asynchronous code. Let's use node to read our number from a file called `number.txt`:

```javascript
var fs = require('fs') // require is a special function provided by node
var myNumber = undefined // we don't know what the number is yet since it is stored in a file

function addOne() {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++
  })
}

addOne()

console.log(myNumber) // logs out undefined -- this line gets run before readFile is done
```

...


Imagine you had 3 async functions a, b and c. Each one takes 1 minute to run and after it finishes it calls a callback (that gets passed in the first argument). If you wanted to tell node 'start running a, then run b after a finishes, and then run c after b finishes' it would look like this:

```javascript
a(function() {
  b(function() {
    c()
  })
})
```
When this code gets executed, a will immediately start running, then a minute later it will finish and call b, then a minute later it will finish and call c and finally 3 minutes later node will stop running since there would be nothing more to do. There are definitely more elegant ways to write the above example, but the point is that if you have code that has to wait for some other async code to finish then you express that dependency by putting your code in functions that get passed around as callbacks.

The design of node requires you to think non-linearly. Consider this list of operations:

``` txt
read a file
process that file
```

If you were to turn this into pseudocode you would end up with this:

```txt
var file = readFile()
processFile(file)
```

This kind of linear (step-by-step, in order) code isn't the way that node works. If this code were to get executed then `readFile` and `processFile` would both get executed at the same exact time. This doesn't make sense since `readFile` will take a while to complete. Instead you need to express that `processFile` depends on `readFile` finishing. This is exactly what **callbacks** are for! And because of the way that JavaScript works you can write this dependency many different ways:

```javascript
var fs = require('fs')
fs.readFile('movie.mp4', finishedReading)

function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
}
```

But you could also structure your code like this and it would still work:

```javascript
var fs = require('fs')

function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
}

fs.readFile('movie.mp4', finishedReading)
```

Or even like this:

```javascript
var fs = require('fs')

fs.readFile('movie.mp4', function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
})
```


### Events

In node if you require the [events](https://nodejs.org/api/events.html) module you can use the so-called **'event emitter'** that node itself uses for all of its APIs that emit things.

Events are a common pattern in programming, known more widely as the **'observer pattern'** or **'pub/sub'** (publish/subscribe). Whereas callbacks are a *one-to-one* relationship between the thing waiting for the callback and the thing calling the callback, events are the same exact pattern except with a *many-to-many* API.

The easiest way to think about events is that they let you subscribe to things. You can say 'when X do Y', whereas with plain callbacks it is 'do X then Y'.

* Chat room where you want to broadcast messages to many listeners
* Game server that needs to know when new players connect, disconnect, move, shoot and jump
* Game engine where you want to let game developers subscribe to events like `.on('jump', function() {})`
* A low level web server that wants to expose an API to easily hook into events that happen like `.on('incomingRequest')` or `.on('serverError')`

If we were trying to write a module that connects to a chat server using only callbacks it would look like this:

```javascript
var chatClient = require('my-chat-client')

function onConnect() {
  // have the UI show we are connected
}

function onConnectionError(error) {
  // show error to the user
}

function onDisconnect() {
 // tell user that they have been disconnected
}

function onMessage(message) {
 // show the chat room message in the UI
}

chatClient.connect(
  'http://mychatserver.com',
  onConnect,
  onConnectionError,
  onDisconnect,
  onMessage
)
```

As you can see this is really cumbersome because of all of the functions that you have to pass in a specific order to the .connect function. Writing this with events would look like this:

```javascript
var chatClient = require('my-chat-client').connect()

chatClient.on('connect', function() {
  // have the UI show we are connected
}) 

chatClient.on('connectionError', function() {
  // show error to the user
})

chatClient.on('disconnect', function() {
  // tell user that they have been disconnected
})

chatClient.on('message', function() {
  // show the chat room message in the UI
})
```

This approach is similar to the pure-callback approach but introduces the `.on` method, which subscribes a callback to an event. This means you can choose which events you want to subscribe to from the `chatClient`. You can also subscribe to the same event multiple times with different callbacks:

```javascript
var chatClient = require('my-chat-client').connect()
chatClient.on('message', logMessage)
chatClient.on('message', storeMessage)

function logMessage(message) {
  console.log(message)
}

function storeMessage(message) {
  myDatabase.save(message)
}
```

### Streams

### Modules