---
title: 'The Monster Slayer'
sidebarDepth: 3
---

# The Monster Slayer


## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5941784?start=0).

## Content

[[toc]]

## First Course Project - The Monster Slayer

### Intoduction & Challenge

Let's take the knowledge that we've gathered so far and use it in a project: `The Monster Slayer`.

I've downloaded the source.zip from course site. The HTML and CSS layout was already in it. The only thing that we are going to do is to write the logic of the game.

### Start and GiveUp Buttons

Creata a new data property `isGameOn` and set its value to be `false` in Vue instance. Then add `v-show` directives to template. Finally, add `@click` listeners to the relative buttons.

```javascript
var app = new Vue({
	el: '#app',
	data: {
		isGameOn: false
	}
})
```

```html
<!-- omitted -->

<section class="row controls" v-show="!isGameOn">
    <div class="small-12 columns">
        <button id="start-game" @click="isGameOn = !isGameOn">START NEW GAME</button>
    </div>
</section>
<section class="row controls" v-show="isGameOn">
    <div class="small-12 columns">
        <button id="attack">ATTACK</button>
        <button id="special-attack">SPECIAL ATTACK</button>
        <button id="heal">HEAL</button>
        <button id="give-up" @click="isGameOn = !isGameOn">GIVE UP</button>
    </div>
</section>

<!-- omitted -->
```

### Write Login for Start New Game

When user hit the `Start New Game` button, the users and the monster's healthbars will be full. In this case, they will be `100`. Also, the text inside healthbars should be `100`.

We need to bind healthbars `width` property to this function. In Vue instance, add these `data` properties: `userHealth`, `monsterHealth`. Then create `startNewGame` funciton. When this function is executed the green part of the healthbar should have full width and the text should change to be `100`. Also, we will pass the `isGameOn` logic into this function.

```javascript
var app = new Vue({
	el: '#app',
	data: {
		isGameOn: false,
		userHealth: 100,
		monsterHealth: 100,
	},
	methods: {
		startNewGame: function() {
			this.isGameOn = !this.isGameOn;
			this.userHealth = 100;
			this.monsterHealth = 100;

		}
	}
})
```

Bind the property with `:style` attribute.

```html

<!-- omitted -->
<section class="row">
    <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
            <div class="healthbar text-center" :style="{ width: userHealth + '%' }" style="background-color: green; margin: 0; color: white;">
                {{ userHealth }}
            </div>
        </div>
    </div>
    <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar">
            <div class="healthbar text-center" :style="{ width: monsterHealth + '%' }" style="background-color: green; margin: 0; color: white;">
                {{ monsterHealth }}
            </div>
        </div>
    </div>
</section>

<!-- omitted -->

<div class="small-12 columns">
    <button id="start-game" @click="startNewGame">START NEW GAME</button>
</div>

<!-- omitted -->
```

### Logic for Attack

The button `Attack` will make an attack that will cause the monster health reduce. Since the user plays against the computer, when user hits computer should response. So, the monster will attack to the user and it will cause the user's health reduce. If either of the healths become equal or less than 0 the game will end. At the end of the game the user will be prompted an `Alert` that informs whether the game is won or lost. The button console will desappear and the console with `Start New Game` button will appear. The attacks will be between **5 and 15** which will assign randomly when the attack button is hit.

```javascript
var app = new Vue({
	el: '#app',
	data: {
		isGameOn: false,
		userHealth: 100,
		monsterHealth: 100,
	},
	methods: {
		startNewGame: function() {
			this.isGameOn = !this.isGameOn;
			this.userHealth = 100;
			this.monsterHealth = 100;

		},
		makeAttackToMonster: function() {
			// Generates a random num between 5 - 15
			var hitPoint = function() {
				return Math.floor(Math.random() * 10 + 5);
			};
			// Hit the monster
			this.monsterHealth -= hitPoint();
			// if monster's health is 0, prompot info then end the game
			if (this.monsterHealth <= 0) {
				alert("You win the game!");
				this.startNewGame();
			} 
			else {
				// Hit the user
				this.userHealth -= hitPoint();
				// if user's health is 0, prompot info then end the game
				if (this.userHealth <= 0) {
					alert("You lost the game!");
					this.startNewGame();
				};
			}
		}
	}
})
```

```html
<!-- omitted -->
<section class="row controls" v-show="isGameOn">
    <div class="small-12 columns">
        <button id="attack" @click="userAttackToMonster">ATTACK</button>
        <button id="special-attack">SPECIAL ATTACK</button>
        <button id="heal">HEAL</button>
        <button id="give-up" @click="isGameOn = !isGameOn">GIVE UP</button>
    </div>
</section>
<!-- omitted -->
```

### Logic For Special Attack

Similarly to `makeAttackToMonster` we will create a `makeSpecialAttackToMonster` funciton. This function will reduce the health of the monster more than normal attack. But, in return, the monster will only response with a normal attack. Since we will use the monster attack again in this funciton, let's create a function for it and just call it from both functions.

We use below funciton to generate random number between two intervals.

```javascript
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
```

I've refactor the code a little, now all the logics are seperated and I can listen to the changes on user's and monster's health with `computed` properties. 

```html
<div class="small-12 columns">
    <button id="attack" @click="userMakeNormalAttack">ATTACK</button>
    <button id="special-attack">SPECIAL ATTACK</button>
    <button id="heal">HEAL</button>
    <button id="give-up" @click="isGameOn = !isGameOn">GIVE UP</button>
</div>
```

```javascript
var app = new Vue({
	el: '#app',
	data: {
		isGameOn: false,
		userHealth: 100,
		monsterHealth: 100,
	},
	methods: {
		startNewGame: function() {
			this.isGameOn = !this.isGameOn;
			this.userHealth = 100;
			this.monsterHealth = 100;
		},
		normalAttackHitPointGenerator: function() {
			// Generates a random num between 5 - 15
			var hitPoint = Math.floor(Math.random() * (15 - 5) + 5);
			return hitPoint;
		},
		userMakeNormalAttack: function() {
			// Hit the monster
			this.monsterHealth -= this.normalAttackHitPointGenerator();
			if (this.gameIsActive) {
				this.monsterMakeNormalAttack();
			} else {
				this.startNewGame();
			}
		},
		monsterMakeNormalAttack: function() {
			// Hit the monster
			this.userHealth -= this.normalAttackHitPointGenerator();
			if (!this.gameIsActive) {
				this.startNewGame();
			}
		},
		userMakeSpecialAttack: function() {
			// Generates a random num between 10 - 25
			var specialAttackHitPoint = Math.floor(Math.random() * (25 - 10) + 10);
			this.monsterHealth -= specialAttackHitPoint;
			if (this.gameIsActive) {
				this.monsterMakeNormalAttack();
			} else {
				this.startNewGame();
			}
		}
	},
	computed: {
		gameIsActive: function() {
			if (this.monsterHealth <= 0) {
				alert("You win the game!");
				// this.startNewGame();
				return false;
			} else if (this.userHealth <= 0) {
				alert("You lost the game!");
				return false;
				// this.startNewGame();
			}
			return true;
		}
	}
})
```

So far, it works fine; but, the truth is I don't know how it works without throwing errors. Let's continue to test it (unfortunatelly manually) the game a couple of more times.

Looks fine.

### Logic for Heal button

Similar to attack functions we will create the logic for `Heal` button. When the button is hit it will increase the health of the user by `10`. In return, the monster will response with a normal attack.

```html
<button id="heal" @click="userHealSelf">HEAL</button>
```

```javascript
userHealSelf: function() {
		// user health should not be over 100 points
		if (this.userHealth >= 91) {
			this.userHealth = 100;
		}
		this.willMonsterAttack();
	},
```

### Logic for Give Up

Create a new funciton as a `methods` property. When the `Give Up` button is hit the user will be prompted `You gave up` and the control buttons will be substitueted with `Start New Game` button.

```html
<button id="give-up" @click="userGiveUp">GIVE UP</button>
```

```javascript
userGiveUp: function() {
	alert("You gave up, Coward!");
	this.isGameOn = !this.isGameOn;
}
```

### Log the Actions happen during the game

Inside of the last div element in the page we will log the actions that happen during the game. When an attack or healing happens we will write the information into a list and display below the page. The most recent action should be displayed at the top of the list.

Instead of a `data` property we will pass the array in a reversed format. So, create a `computed` property and when the `actionsLog` array is updated, execute reversing function. To not reverse it every time we need to copy and past with below way:

```javascript
function reverseArray(array) {
    return array.slice(0).reverse();
}
```
Create `actionsLogReverse` function. 

```javascript
computed: {
	gameIsActive: function() {
		if (this.monsterHealth <= 0) {
			alert("You win the game!");
			// this.startNewGame();
			return false;
		} else if (this.userHealth <= 0) {
			alert("You lost the game!");
			return false;
			// this.startNewGame();
		}
		return true;
	},
	actionsLogReverse: function() {
		return this.actionsLog.slice(0).reverse();
	}
}
```

Implement into HTML. We will use `v-for` directive to iterate over the `actionsLogReverse` array. 

```html
<section class="row log">
    <div class="small-12 columns" v-show="isGameOn">
        <ul>
            <li v-for="(log, index) in actionsLogReverse"
            :key="index">
                <span :class="{'player-turn': true}">
                    {{ log.fromWhom }} hit to {{ log.toWhom }} for {{ log.attackPoint }} points
                </span>
            </li>
        </ul>
    </div>
</section>
```

::: warning
To be able to use hyphen `-` inside `:class` you have to put it inside quotes `''`.
:::

To be able to differentate the actions add color to each side(user and monster).



```css
```

### ASIDE

It was a very difficult task to assign classes dynamically to list items. 

::: tip
When code gets complicated it's a good idea just get out of the project and work explicitly to be able to analyze the task seperately and deeply.
:::


Here is an [example](https://jsfiddle.net/maykjony/8bz8h970/12/) of what I created without intention.

```html
<div id='app'>
  <button @click="addLog">add player</button>
	<ul>
	  <li v-for="log in logs" :class="logClass">
	    {{ log.fromWhom }}
	  </li>
	</ul>
</div>
```

The color of all items in the list changes each time.

```javascript
new Vue({
	el: '#app',
  data: {
  	logs: [],
    isTrue: false,
    whosTurn: ''
  },
  methods: {
  	addLog () {
    	this.isTrue = !this.isTrue
    	this.logs.push({'fromWhom': 'player'})
    }
  },
  computed: {
  	logClass () {
    	return this.isTrue ? 'red' : 'blue'
    }
  }
})
```

```css
.red {
  color: red;
}
.blue {
  color: blue;
}
```