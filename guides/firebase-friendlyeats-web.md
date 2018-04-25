---
title: Firebase Restaurant Recomendation App
sidebarDepth: 3
---

# Restaurant Recomendation App Tutorial

[Link](https://codelabs.developers.google.com/codelabs/firestore-web/#0) to the tutorial.

## Overview
### Goals
In this codelab you will build a Firestore-backed restaurant recommendation Web app. You will learn how to:

* Read and write data to Firestore from a Web app
* Listen to changes in Firestore data in realtime
* Use Firebase Authentication and security rules to secure Firestore data
* Write complex Firestore queries

### Prerequisites
Before starting this codelab make sure you have installed:

* Node.js

Note that although Node.js is a requirement for running and testing our app, the final application will not be dependent on Node.js.

## Get the Sample Project
Download the Code
Begin by cloning the [sample project](https://github.com/firebase/friendlyeats-web).

```bash
git clone https://github.com/firebase/friendlyeats-web
cd friendlyeats-web
```

Next, you'll need to get a Cloud Firestore enabled version of the Firebase CLI:

```bash
npm install -g firebase-tools
```

### Create a Project

Follow the [documentation](http://localhost:8080/guides/firebase/friendlyeats-project/) to create a new Firestore project. If you are prompted to select your security rules, start with **"test mode"**. We will change this later in the codelab.
    
### Set Up Firebase
Our Web app template is configured to automatically pull your project's configuration from the Firebase Hosting environment. However we still need to associate your project with the app.

```bash
firebase use --add
```

You'll be prompted to give this project an alias. This is useful if you have multiple environments (production, staging, etc). However, for this example, let's just name it "default". Now we can use:
```bash
firebase serve
``` 
to run our Web app and it will automatically know what Firebase (and Firestore) project to use.

