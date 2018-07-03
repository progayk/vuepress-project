---
title: 'Intro to Apis'
sidebarDepth: 3
---

# Intro to Apis(Application Pragram Interface)

Connecting with other applications.

> API's are interfaces for code/computers to talk to one another.


## Credits

The course I followed here is on [this link](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/5102514?start=210)

## Content

[[toc]]

You can find couple of API rosources from below links:

* [ifttt](https://ifttt.com/)

* [programmableWeb](https://www.programmableweb.com/)

## JSON and XML

API's dont' respont with HTML. HTML contains information about the structure of a page. API's respond with data, not structure. They use simpler data formats like **XML** and **JSON**.

### XML (Extended Markup Language)

XML is syntacticly similar to HTML, but it dous not describe presentation like HTML does.

 You can put whatever tag you want. It's like key-value pairs.

 ```xml
 <person>
    <age>21</age>
    <name>Travis</name>
    <city>Los Angeles</city>
</person>
```

 ### JSON (Javascript Object Notation)

 JSON looks exactly like JavaScript objects, but everything is a string.

 ```json
 {
     "person": {
         "age": "21",
         "name": "Travis",
         "city": "Los Angeles"
     }
 }
 ```

 ::: tip
 You do need `quotes` ("") around the keys in JSON.
 :::

 ## Making API Requests with NodeJs

 There are different ways of making HTTP Requests.

 * From Browser Search
 * From terminal by using tools such `curl`
 * With Postman
 * Inside of an application

 > Here we will make a Request with node.js

 There are a lot of libraries we can use. In this example we will use [request lib](https://github.com/request/request).


```javascript
var request = require('request')

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
  if (error) {
      console.log('error: ', error)
  } else {
      if (response.statusCode == 200) {
      // Things worked
      console.log(body)
    }
  }
  
});
```

And it will return something like:

```json
{
    "query": {
        "count": 1,
        "created": "2018-06-29T13:19:25Z",
        "lang": "en-US",
        "results": {
            "channel": {
                "astronomy": {
                    "sunset": "7:10 pm"
                }
            }
        }
    }
}
```

## Sunset Time API Example

We need to parse the upcoming JSON data into JavaScript object. In order to do that we can use `JSON.parse()` method.

```javascript
var request = require('request')

console.log("Sunset in Hawaii is at...")

request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body)
        console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"])
    }
});
```

**RESULT:**

```bash
$ node first_request.js 
Sunset in Hawaii is at...
7:10 pm7:10 pm
```

## Movie API App: 

You can use below API keys to access the Movie data.

General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 

you must append `&apikey=thewdb` to the end of your url.

### Introduction

We will consume [omdbAPI](http://www.omdbapi.com/).

We will install neccessary libraries:

```bash
npm i --save express ejs request
```

### Results Route

Create an express server and make a request to omdbapi to get data. Then display it on the browser.

```javascript
var express = require('express')
var app = express()
var request = require('request')

app.get('/results', function(req, res) {
    request('http://www.omdbapi.com/?s=harry&apikey=thewdb', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let fetchedData = JSON.parse(body)
            res.send(fetchedData["Search"][0]["Title"])
        }
    })
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App has started!!")
})
```

**Result:**
```
Harry Potter and the Deathly Hallows: Part 2
```

### Displaying Data

We will get data and display a list with HTML.

```javascript
app.get('/results', function(req, res) {
    request('http://www.omdbapi.com/?s=harry&apikey=thewdb', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let fetchedData = JSON.parse(body)["Search"]
            let allResults = []
            fetchedData.forEach(function(item) {
                // console.log(item["Title"])
                allResults.push(item["Title"])
            })
            res.render("results", { allResults: allResults })
            // res.send(fetchedData["Search"][0]["Title"])
        }
    })
})
```

And here is the **Result:**

```
Movie App has started!!
Harry Potter and the Deathly Hallows: Part 2
Harry Potter and the Sorcerer's Stone
Harry Potter and the Chamber of Secrets
Harry Potter and the Goblet of Fire
Harry Potter and the Prisoner of Azkaban
Harry Potter and the Order of the Phoenix
Harry Potter and the Deathly Hallows: Part 1
Harry Potter and the Half-Blood Prince
When Harry Met Sally...
Dirty Harry
```

### Adding Search

We will get the search term with a form and then put into GET request to display the list of items in `/results` view. We get the form data with `query` method:

```javascript
let searchTerm = req.query.search_term
```