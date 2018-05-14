---
title: 'VueJs Interaction with DOM'
sidebarDepth: 3
---

# VueJs Interaction with DOM


## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5940922?start=0).

## Content

[[toc]]

## Understranding VueJs Templates

Vue instance render the code first then output the result to the DOM.

## How the VueJs Template Syntax and Instance Work Together

Vue instance properties are proxied to HTML. So we can call title from html tag. We can access data properties in the Vue instance by using **Mustaches** => `{{ }}`. On the other hand, if we want to reach that data from inside the Vue instance we need to use `this` to reach to the property. In below example we reach `title` object's value from inside of Vue instance by saying `this.title`.

```html
<div id="app">
  <p>{{title}}</p>
</div>

<script>

new Vue({
	el: '#app',
  data: {
  	title: 'Hello World!'
  }
})

</script>
```

I can reach not only to `data` property but other properties as well such as the `methods` property.

```html
<div id="app">
  <p>{{ sayHello() }}</p>
</div>


<script>
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!'
	},
	methods: {
		sayHello: function() {
			return this.title
		}
 	}
})
</script>
```

::: tip Reserved Keywords
`el`, `data` and `methods` are reserved keywords in VueJs. There are several other keywords like these.
:::

## Binding Attributes

If we want to reach Vue instance attributes inside of an attribute of HTML tag, we can not use curly braces (mustaches). We need to use it without curly braces and then bind the data dynamically.

If we use curly braces inside an attribute like so: 

```html{2}
<div id="app">
  <p>{{ sayHello() }} - <a href="{{ link }}">Google</a></p>
</div>
```

The link won't send use to google but will try to render 
::: v-pre 
`{{ link }}`
::: 
as it is. So we need to remove those curly braces and bind the propert to `href` attribute like in below example:


```html{2}
<div id="app">
  <p>{{ sayHello() }} - <a v-bind:href="link">Google</a></p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!',
    	link: 'http://google.com'
	},
	methods: {
		sayHello: function() {
			return this.title
		}
  }
})
</script>
```

You can find the link of this example on [here](https://jsfiddle.net/maykjony/5f2uvfdt/1/).

## Understranding and Using Directives

VueJs is shipped with built-in directives. Also, you can write your own directives. The `v-bind` directive tells VueJs to bind some data which is stored in Vue Instance.

## Disable Re-rendering with v-once

If we want that the data is only rendered once and don't change when the value changes, we can use `v-once` directive, and make the data renderes only once.

::: warning
Keep in mind that all usages of `title` get re-renderes once the property changes.
:::


```html
<div id="app">
  <h1 v-once>{{ title }}</h1>
  <p>{{ sayHello() }} - <a v-bind:href="link">Google</a></p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!',
   		link: 'http://google.com'
	},
	methods: {
		sayHello: function() {
    		this.title = 'hello!'
			return this.title
		}
  }
})
</script>
```

Example of above snippet is on [this link](https://jsfiddle.net/maykjony/5f2uvfdt/2/).

## How to ouput raw HTML

We can store and output a whole raw HTML in a data property like this:

```html{5}
<div id="app">
  <h1 v-once>{{ title }}</h1>
  <p>{{ sayHello() }} - <a v-bind:href="link">Google</a></p>raw-HTML
  <hr>
  <p>{{ completeLink }}</p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!',
	    link: 'http://google.com',
	    completeLink: '<a href="http://google.com">Google</a>'
	}
)}
</script>

```

When we insert it to html it will be rendered as a normal text.

![raw-HTML](../images/raw-HTML.png)

When you want to render a **String** of HTML directly from Vue instance, Vue has a special directive called `v-html` to do that easily.

```html{5}
<div id="app">
  <h1 v-once>{{ title }}</h1>
  <p>{{ sayHello() }} - <a v-bind:href="link">Google</a></p>raw-HTML
  <hr>
  <p>{{ completeLink }}</p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
		title: 'Hello World!',
	    link: 'http://google.com',
	    completeLink: '<a href="http://google.com">Google</a>'
	}
)}
</script>

```

::: danger
When you render raw html by using `v-html` be careful and be sure that the code that will be renderes is **sanitized**. It makes you vulnerable to **Cross-Site Scripting Attacks**.
:::

And the ouput will be like:

![raw html 2](../images/raw-HTML2.png)

Here is the [link](https://jsfiddle.net/maykjony/5f2uvfdt/3/) to the example.


## Listening to Events

In previous examples we saw how to bind data using `v-bind` directive. Now, we will see how we listen an event by using `v-on` directive. `v-on` get an argument which will be the name of event we want to consume or listen. In the below example we will listen `click` event on a **button**, and then we will output its result by manipulating data in Vue instance, and then output its result on anouther element in our HTML.

::: tip
We can use any DOM event that exists for **button**. It could be 'mouseover', 'mouseon', 'enter' or any other default event for HTML elements.
:::

In the below example, I will create a button listen the `click` event on it. Then, I will bind this click event to a function inside my Vue instance. The function `increaseByOne` will increase the value of `count` inside data property by one. 

```html
<div id="app">
  <button v-on:click="increaseByOne">Click Me!</button>
  <p>{{ count }}</p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
  		count: 0	
	},
	methods: {
		increaseByOne: function() {
			this.count++;
	}
  }
})
</script>
```

Here is the [link](https://jsfiddle.net/maykjony/5f2uvfdt/4/) to above example.

## Getting the Event data from Event Object

We can access the event data which is created automatically when the DOM is created. This `Event Object` has several properties that we can listen. For example we can see the coordinates of the mouse cursor when a button is clicked or an elemlent is hovered.

In the below example I will listen `clientX` and `clientY` values which are created inside **Event Object** automatically. I will bind the data to a function by using `v-on:mousemove` directive which will update the values of **x** and **y** which are defined in Vue instance.

```html

<div id="app">
  <button v-on:click="increaseByOne">Click Me!</button>
  <p>{{ count }}</p>
  <p v-on:mousemove="updateCoordinates">Coordinates: {{ x }} / {{ y }}</p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
	  	count: 0,
	    x: 0,
	    y: 0
	},
	methods: {
		updateCoordinates: function(event) {
			this.x = event.clientX;
		 	this.y = event.clientY;
	},
		increaseByOne: function() {
			this.count++;
		}
	}
})
</script>
```

Or you can bind more than one **event** into the same html element.

```html
<div id="app">
  <button
  	v-on:mousemove="updateCoordinates"
  	v-on:click="increaseByOne"
  	>Click Me!</button>
  <p>{{ count }}</p>
  <p>Coordinates: {{ x }} / {{ y }}</p>
</div>
```

[Link](https://jsfiddle.net/maykjony/5f2uvfdt/5/) to the example.

## Passing your own arguments with Events

In the previous example we were increasing the `count` by one. Now, we will see how to pass our own arguments to a function.

```html{1,16,17,18}
<button v-on:click="increase(2)">Click Me!</button>

<script>
new Vue({
	el: '#app',
	data: {
	  	count: 0,
	    x: 0,
	    y: 0
	},
  methods: {
	  	updateCoordinates: function(event) {
	    	this.x = event.clientX;
	      	this.y = event.clientY;
    },
	    increase: function(step) {
	    	this.count += step;
	    }
  }
})</script>
```

I can also pass that automatically created `event` object with my data by simply adding `$event` as an argument. Don't forget that `$event` is a special keyword that enable VueJs to fetch the data from event and pass it to instance. 

```html{1,16}
<button v-on:click="increase(2, $event)">Click Me!</button>

<script>
new Vue({
	el: '#app',
	data: {
	  	count: 0,
	    x: 0,
	    y: 0
	},
	methods: {
		updateCoordinates: function(event) {
			this.x = event.clientX;
		  	this.y = event.clientY;
		},
		increase: function(step, event) {
			this.count += step;
		}
	}
})</script>
```

## Modifying an Event - with Event Modifier

When I don't want that a event is triggered I can modify it by using **Event Modifier**. 

There are couple of solutions to this. First, I will show how to do it without using **Event Modifier**. I will pass a **dummy** function. This will make the `updateCoordinates` function stop propagating. 

```html
<div id="app">
  <button v-on:click="increase(2, $event)">Click Me!</button>
  <p>{{ count }}</p>
  <p v-on:mousemove="updateCoordinates">Coordinates: {{ x }} / {{ y }} - <span v-on:mousemove="dummy">DEAD SPOT</span></p>
</div>

<script>
new Vue({
	el: '#app',
	data: {
	  	count: 0,
	    x: 0,
	    y: 0
	},
	methods: {
		updateCoordinates: function(event) {
			this.x = event.clientX;
	  		this.y = event.clientY;
	},
		increase: function(step, event) {
			this.count += step;
		},
		dummy: function(event) {
			event.stopPropagation();
		}
	}
})
</script>
```

Here is the [link](https://jsfiddle.net/maykjony/5f2uvfdt/6/) to this example.

There is a another solution, and this is way better and cleaner then the previous one which excludes the function `dummy`. I will use an event modifier called `stop` that stops the propagation of event.

```html{5}
<div id="app">
  <button v-on:click="increase(2, $event)">Click Me!</button>
  <p>{{ count }}</p>
  <p v-on:mousemove="updateCoordinates">Coordinates: {{ x }} / {{ y }} - 
  <span v-on:mousemove.stop="">DEAD SPOT</span></p>
</div>
```

Here is the [link](https://jsfiddle.net/maykjony/jtb734ob/1/)

::: tip
You can chain these modifiets to one another like such: `v-on:mousemove.stop.prevent`.
:::

## Listening to Keyboard Events

We not only have event modifiers but also **key modifiers**. In the example below I will listen the key event. Specifically I want to give an alert when the user releases the key. I will use `v-on:keyup` directive and modifier and I will bind it to `alertMe` function. So, when the user releases the key the `alertMe` funciton will be executed. 

```html
<div id="app">
  <input type="text" v-on:keyup="alertMe">
</div>

<script>
new Vue({
	el: '#app',
	methods: {
		alertMe: function() {
			alert('Alert!!!');
    }
	}
})
</script>
```

However, this `keyup` is too spammy so I want to modify it a little. There are couple of avaliable modifiers that is attached to `key` events. For example, I will add `enter` modifier and it will make the funciton executed only when the enter key is released.

```html
<div id="app">
  <input type="text" v-on:keyup.enter="alertMe">
</div>
```

I can also chain these modifiers one another, and more than this I can create my own modifiers. In the below example, I will chain `enter` and `space` modifiers. So the behavior of the `input` element will change. Now, when the user releases either of `enter` or `space` key the `alertMe` function will be executed.

```html
<div id="app">
  <input type="text" v-on:keyup.enter.space="alertMe">
</div>
```

## Exercise-2

Here is the [link](https://jsfiddle.net/maykjony/avtzxw6f/) to the solution. Also you can find the folder related to the **exercises** under `/docs/extras/` folder.