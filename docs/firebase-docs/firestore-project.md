---
title: 'Cloud Firestore'
sidebarDepth: 3
---

# Cloud Firestore

Flexible, scaleble cloud database to store and sync data for client- and server-side development.

[Firebase official docs](https://firebase.google.com/docs/firestore/quickstart?authuser=0).

## Credits

The link of this course is [on here](https://firebase.google.com).

## Content

[[toc]]

## Social App Project

## Add Data to Firestore

### Create New List

```javascript
createNewList ({commit}, context) {
    // Get a reference to collection
    const listColRef = fb.listsCollection.doc(fb.auth.currentUser.uid).collection(kebabifiedlistName)

    listColRef.add({
        listName: context
      })
      .then((docRef) => {
        console.log("the new list is merged doc ref id", docRef.id)
        console.log("the new list is merged doc ref data", docRef.data())
      })
      .catch(e => console.log('new list can not be written because: ', e))
  },
```

