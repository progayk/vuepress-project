---
title: 'Vue Router'
sidebarDepth: 3
---

# Yelp Camp Project: Basics


## Credits

The course I followed here is on [this link](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3861630?start=0)

You can find the remote VM instance that I use in this course on [this link](https://ide.c9.io/cienciayk/backend-basics).

## Content

[[toc]]

## Tutorial following on sandbox

<iframe src="https://codesandbox.io/embed/7zqn0o30wj" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styling Active Links

You can use `active-class="active"` 

```html
<template>
  <ul class="nav nav-pills">
  
    <router-link active-class="active" exact class="nav-link" to="/" tag="li"><a>Home</a></router-link>
  
    <router-link active-class="active" exact class="nav-link" to="/user" tag="li"><a>Profil</a></router-link>

</ul>
</template>
```

## Seting up route parameters

## Fetching and using route parameters

## Reacting to change in the Route Parameters

If we are already in that component changing the route won't reload the component.

We can get this reloading behavior with `watch` property and then listen to `'$route'`.


```html
<template>
  <div>
    <h2>User page</h2>
    <p>Id is: {{ id }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  }
}
</script>
```

> After v2.2 vue-router accepts `props` so you can also bind route params to props of the target component.

<iframe src="https://codesandbox.io/embed/wnvq16z538" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Setting Up child routes

Child routes will be added to path inside of which the `children` property is assigned.

```javascript
 {
      path: "/user/:id",
      component: User,
      children: [
        {
          path: 'detail'
        }
      ]
    }
  ]
```

::: warning
If you pass the child path with `/` before it, then it will be added to root path.
```javascript
 {
      path: "/user/:id",
      component: User,
      children: [
        {
          path: '/detail' // <== Here we have a '/' before the path
        }
      ]
    }
  ]
```
:::

Here, we have a router like this:

```javascript
import Router from "vue-router";
import Home from "@/components/Home";
import User from "@/components/User";
import UserDetail from "@/components/UserDetail";
import UserStart from "@/components/UserStart";
import UserEdit from "@/components/UserEdit";
import vue from "vue";

vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/user",
      component: User,
      children: [
        {
          path: "",
          component: UserStart
        },
        {
          path: ":id",
          component: UserDetail
        },
        {
          path: ":id/edit",
          component: UserEdit
        }
      ]
    }
  ]
});

export default router;
```

> To be able to navigate to child components we need to add `<router-view>` element in User component.

## Navigating to Nested routes

## Making router links more dynamic

```html
<template>
  <div>
    <h3>User Details</h3>
    <p>User loaded has ID: {{ $route.params.id }}</p>
    <router-link
    tag="button"
    class="btn btn-primary"
    :to="'/user/' + $route.params.id + '/edit'">Edit user</router-link>
  </div>
</template>
```

## A better way of createing links - with named Routes

```javascript
{
    path: ":id/edit",
    component: UserEdit,
    name: "userEdit"
}
```

You can pass name and params with the `to` attribute. 

```html
<template>
  <div>
    <h3>User Details</h3>
    <p>User loaded has ID: {{ $route.params.id }}</p>
    <router-link
    tag="button"
    class="btn btn-primary"
    :to="{ name: 'userEdit', params: { id: $route.params.id } }">Edit user</router-link>
  </div>
</template>
```

## Using query parameters

Query parameters are added to path with simply `?` question mark. THis is an optinal data to add to path.

Like path and name you can pass `query` parameter with `<router-link>` too.

```html
<template>
  <div>
    <h3>User Details</h3>
    <p>User loaded has ID: {{ $route.params.id }}</p>
    <router-link
    tag="button"
    class="btn btn-primary"
    :to="{ name: 'userEdit', params: { id: $route.params.id }, query: { locale: 'en', q: '1000' } }">Edit user</router-link>
  </div>
</template>
```

Then we can extract this data from another component

```html
<template>
  <div>
    <h3>User Edit</h3>
    <p>Locale: {{ $route.query.locale }}</p>
    <p>q: {{ $route.query.q }}</p>
  </div>
</template>
```

## Multiple Router Views (Named Router Views)

You can not only name path but also the `views`.

```html
<template>
  <div id="app">
    <h1>Routing</h1>
    <app-header></app-header>
    <hr>
    <router-view name="header-top"></router-view>
    <router-view></router-view>
    <router-view name="header-bottom"></router-view>
  </div>
</template>
```

```javascript
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: 'home',
      components: {
        default: Home,  // <= here we first add the default
        'header-top': Header,  // <= Then the other router view
      }
    },
    {
      path: "/user",
      components: {
        default: User, // <= here we first add the default
        'header-bottom': Header // <= Then the other router view
      },
      children: [
        {
          path: "",
          component: UserStart
        },
        {
          path: ":id",
          component: UserDetail
        },
        {
          path: ":id/edit",
          component: UserEdit,
          name: "userEdit"
        }
      ]
    }
  ]
});
```

## Router redirecting

What if user enters anything to url which is not covered by the app's default routes??

We would want to redirect to a route.

For example; if the user writes `'redirect-me'` as the path we will redirct the user to the `'user'` path.

```javascript
{
    path: "/redirect-me",
    redirect: "/user"
}
```

We can also pass some parameters like this:

```javascript
{
    path: "/redirect-me",
    redirect: { name: 'home', query: { q: 100 } }
}
```

## Setting Up Catch All Routes / Wildcards

