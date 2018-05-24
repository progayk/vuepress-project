---
title: Firebase Restaurant Recomendation App (on dev)
sidebarDepth: 3
---

# Restaurant Recomendation App Tutorial

This tutorial originally resides on [this link](https://codelabs.developers.google.com/codelabs/firestore-web/#0).

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

You'll be prompted to give this project an alias. This is useful if you have multiple environments 
(production, staging, etc). However, for this example, let's just name it "default". Now we can use:

## Enable Firebase Authentication

Although authentication isn't the focus of this codelab, it's important to have some form of authentication in our app. We'll use Anonymous login - this means the user will be silently logged in without being prompted.

You can enable **Anonymous authentication** in your app using the Firebase Console. Run the following command to be automatically taken to the `Authentication Providers` configuration page.

```bash
firebase open auth
```

Alternatively, in the Firebase Console for you project go to **Authentication > Sign-In Method**

Once on this page, click on **Anonymous**, then click on **Enable** and click **Save**.

### Run on local server (serve)

```bash
firebase serve
``` 
to run our Web app and it will automatically know what Firebase (and Firestore) project to use.

Now open your browser and view `localhost:5000`. You'll see your copy of FriendlyEats which has been connected to your Firebase project.

## Write Data to Firestore

The main model object in our app is a restaurant. Firestore data is split into documents, collections, and subcollections. We will store each restaurant as a document in a top-level collection called "restaurants". If you'd like to learn more about the Firestore data model, read about documents and collections in the [documentation](https://firebase.google.com/docs/firestore/data-model).

**FriendlyEats.Data.js**

```javascript
FriendlyEats.prototype.addRestaurant = function(data) {
  var collection = firebase.firestore().collection('restaurants');
  return collection.add(data);
};
```

The code above adds a new document to the `restaurants` collection. The document data comes from a plain JavaScript object. We do this by first getting a reference to a Firestore collection `restaurants` then `add`'ing the data.

## Security Rules

We're almost there--before we can write documents to Firestore we need to open up Firestore's security rules and describe which parts of our database should be writeable by which users. For now, we'll allow only authenticated users to read and write to the entire database. This is a little too permissive for a production app, but during the app-building process we want something relaxed enough so we won't constantly run into authentication issues while experimenting. At the end of this codelab we'll talk about how to harden your security rules and limit the possibility of unintended reads and writes.

Open the Firebase console and navigate to [Database > Rules in the Firestore tab](https://console.firebase.google.com/project/_/database/firestore/rules). The default rules prevent any reads or writes in the database from any user. Replace the defaults with the following rules.

You can simply copy-paste the above in the Firebase Console and publish it. Alternatively you can also deploy these using a file through the command line. To do this run:

```bash
firebase deploy --only firestore:rules
```

This will deploy the `firestore.rules` file which already contains the rule above.

::: tip Note:
If you'd like to learn more about security rules have a look at the security rules documentation. You can also have a look at this alternative firestore.rules file for FriendlyEats which sets more fined grained access control.
:::

Refresh the page and tap the **"Add Mock Data"** button, which will create a batch of restaurant documents, although **you won't yet see this in the app**. We still need to implement retrieving the data.

Next, navigate to the [Firestore](https://console.firebase.google.com/project/_/database/firestore/data) tab in the Firebase console. You should now see new entries in the restaurant's collection:

Congratulations, you have just written data to Firestore from a Web app! In the next section you'll learn how to retrieve data from Firestore and display it in the app.

## Display Data from Firestore

