---
title: 'Handling User Input with Forms'
sidebarDepth: 3
---

# Handling User Input with Forms

Finished project

<iframe src="https://codesandbox.io/embed/24l9vj7k7r?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Credits

This course in on [this link](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5975260?start=0) on udemy.


## Content

[[toc]]

## A basic `input` Form Binding

After getting the source code from the course section I have this set up.

* Start a new webpack simple project with `vue init` command. 

![vue-forms-1](../images/vue-forms-1.png)

* We need to bind the data in the `<input>` sections with the `data` property. Initially we use `v-model` directive.

**App.vue**

```html
<div class="form-group">
    <label for="email">Mail</label>
    <input
            type="text"
            id="email"
            class="form-control"
            v-model="email"
    >
</div>

<script>
    export default {
      data() {
        return {
          userData: {

          }
        }
      }
    }
</script>
```

## Grouping Data and Pre-Populating Inputs

Now, we will group user related data in an *Object* in the `data` property.

* create `userData` object in `data` property then populate the template with `v-model` and wit *String Interpolation*.

## Modifying User Input with Input Modifiers.

How we can modify the default behavior of `v-model` directive? Right now, it's updated with each key stroke. 

* First add `lazy` modifier to `v-model` directive. This will not listen each event but only listen `change` event. So it will be updated when we focus out of the `<input>` element or click somewhere else in the page. 

**v-model.lazy**

![vue-forms-2](../videos/vue-forms-2.gif)

Other modifiers you can is might be `trim` which trims the *white-space* at the beggining and at the end; or might be `number` to force that the input convert into *Number* right away. So you can modify the behavior of the `v-model` to decide when an how it will be triggered.

## Binding `textarea` and Saving Line Breaks

The *String Interpolation* doesn't work on the `<textarea>` element. You have to use `v-model` to bind it. 

 <details>
 <br>
 <summary>
 <strong>App.vue</strong>
 </summary>

```html
...
<!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
<textarea
        id="message"
        rows="5"
        class="form-control"
        v-model="message"
></textarea>
...
<!-- We have to style="white-space: pre" to keep the line breaks-->
<p style="white-space: pre">Message: {{ message }}</p>
...
<script>
    export default {
      data() {
        return {
          userData: {
            email: '',
            password: '',
            age: 27
          },
          message: 'A new text'
        }
      }
    }
</script>
```

</details>

**Result**

![vue-forms-3](../videos/vue-forms-3.gif)

## Using Checkboxes and Saving Data in Arrays

Let's implement checkbox function. Here again, Vuejs helping us. To store the checkbox value first we will create new property with an *Array* and then we will bind it with `v-model`. Vue.js will automatically merge the value of checkboxes into that *Array*.

 <details>
 <br>
 <summary>
 <strong>App.vue</strong>
 </summary>

```html
<template>
...
    <div class="form-group">
        <label for="sendmail">
            <input
                    type="checkbox"
                    id="sendmail"
                    value="SendMail"
                    v-model="sendMail"
            > Send Mail
        </label>
        <label for="sendInfomail">
            <input
                    type="checkbox"
                    id="sendInfomail"
                    value="SendInfoMail"
                    v-model="sendMail"
            > Send Infomail
        </label>
    </div>


        <ul>
            <li v-for="item in sendMail">
                {{ item }}
            </li>
        </ul>
                   
...
</template>

<script>
    export default {
      data() {
        return {
          ...
          sendMail: []
        }
      }
    }
</script>
```

</details>

![vue-forms-4](../videos/vue-forms-4.gif)


## Using Radio Buttons

Let's move on the `radio buttons`.

We need to make sure that we can only select one and store the value of the selected radio button in some property.

* Create a new `data` property `gender` and set its initial value to `Male`. Then bind radio buttons with `v-model`.

Vue.js will recognize that these buttons are grouped together and only one of them can be selected.

 <details>
 <br>
 <summary>
 <strong>App.vue</strong>
 </summary>

```html
<template>
... 
    <div>
        <label for="male">
            <input
                    type="radio"
                    id="male"
                    value="Male"
                    v-model="gender"
            > Male
        </label>
        <label for="female">
            <input
                    type="radio"
                    id="female"
                    value="Female"
                    v-model="gender"
            > Female
        </label>
    </div>
    ...
            <p>Gender: {{ gender }}</p>
        ...
        </div>  
...
</template>

<script>
    export default {
      data() {
        return {
          ...
          gender: 'Male'
        }
      }
    }
</script>
```

</details>

![vue-forms-6](../videos/vue-forms-6.gif)

## Handling Dropdowns with `select` and `option`

We have a `<select>` tag and inside it we have `<option>` tag. We only have one option because we will assign option's value dynamically from a property. We assign the value with `:selected` attribute and we will check if the current value is `Medium` initially.

<details>
<br>
<summary>
App.vue
</summary>

```html
<template>
... 
 <select
        id="priority"
        class="form-control"
>
    <option
        :selected="priority == 'Medium'"
    >
        {{ priority }}
    </option>
</select>
...
</template>

<script>
    export default {
      data() {
        return {
          ...
          selectedPriority: 'High',
          ...
        }
      }
    }
</script>
```
</details>



 Here again, we use `v-model` to bind the `selected` value but this time on the `<select>` (parent) element. Now it's set to `High`. This is another way to set the default value. `selected` is overwritten by the `v-model`. So we can only use `:selected` if we don't use `v-model` or if we don't pre-populate the value of `v-model`. Therefore, we won't use `:selected`.

 <details>
 <br>
 <summary>
 <strong>App.vue</strong>
 </summary>

```html
<template>
... 
 <select
        id="priority"
        class="form-control"
        v-model="selectedPriority"
>
    <option
        v-for="priority in priorities"
    >
        {{ priority }}
    </option>
</select>
...
</template>

<script>
    export default {
      data() {
        return {
          ...
         priorities: ['High', 'Medium', 'Low']
          ...
        }
      }
    }
</script>
```
 </details>



![vue-forms-7](../videos/vue-forms-7.gif)

## What v-model does and how to create a custom control

Let's say you want to build your own `input`. We have to `$emit` the `input` event because the `v-model` will be waiting (listening) for it.

* Create new component `Switch.vue`.

<details>
<summary>Switch.vue component</summary>
<br>

```html
<template>
  <div>
    <div
      id="on"
      :class="{active: value}"
      @click="switched(true)"
    >On</div>
    <div 
      id="off"
      @click="switched(false)"
      :class="{active: !value}"
    >Off</div>
  </div>
</template>


<script>
export default {
  props: ["value"],
  methods: {
    switched(isOn) {
      // the event has to have the name 'input`
      // because the `v-model` is waiting for it
      this.$emit("input", isOn);
    }
  }
};
</script>


<style scoped>
#on,
#off {
  width: 40px;
  height: 20px;
  background-color: lightgray;
  padding: 2px;
  display: inline-block;
  margin: 10px -2px;
  box-sizing: content-box;
  cursor: pointer;
  text-align: center;
}

#on:hover,
#on.active {
  background-color: lightgreen;
}

#off:hover,
#off.active {
  background-color: lightcoral;
}
</style>
```

</details>

<br>


## Creating a custom control (input)

* Create a two-way binding between the parent and the child.


<details>

<summary>AppSwitch.vue</summary>

<br>

```html
<template>
  <div class="toggle-container">
  
    <div id="on"
      :class="{active: value}"
      @click="switched(true)"
    >
      ON
    </div>

    <div id="off"
      :class="{active: !value}"
      @click="switched(false)"      
    >
    OFF</div>

  </div>
</template>


<script>
export default {
  props: ["value"],
  methods: {
    switched(isOn) {
      this.$emit("input", isOn);
    }
  }
};
</script>


<style scoped>
#on,
#off {
  height: 30px;
  /* line-height:  */
  /* to align the text inside the div or a button */
  line-height: 30px;
  width: 50px;
  display: inline-block;
  margin: 0;
  padding: 4px;
  background-color: lightgray;
  text-align: center;
  box-sizing: content-box;
  cursor: pointer;
}

#on:hover,
#on.active {
  background-color: lightgreen;
}

#off:hover,
#off.active {
  background-color: red;
}
</style>
```

</details>


<br>

* you have to `$emit` the `input` event to the `v-model`. 

<br>
<details>

<summary>MyApp.vue</summary>

<br>


```html
<template>
  <div>
    <app-switch v-model="dataToggle"></app-switch>
  </div>
</template>


<script>
import AppSwitch from "./AppSwitch";
export default {
  components: {
    AppSwitch
  },
  data() {
    return {
      name: "mayk",
      dataToggle: true
    };
  }
};
</script>
```

</details>


## Submitting a form

Let's implement the `submit` action to the submit button. When the form is submitted we will show the `Your Data` panel.

<details>

<summary>App.vue</summary>

<br>

```html
<button
        class="btn btn-primary"
        @click.prevent="submitted"
        >Submit!
        <!-- We don't want to submit the form with SUBMIT action
        so that we use '.prevent' method. -->
</button>
...
<div class="row" v-if="isSubmitted">
  <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <div class="panel panel-default">
          <div class="panel-heading">
              <h4>Your Data</h4>
          </div>
...
<script>
import Switch from "./Switch";
export default {
  data() {
    return {
      // omitted
      isSubmitted: false
    };
  },
  methods: {
    submitted() {
      this.isSubmitted = true;
    }
  },
   // omitted
};
</script>

```

</details>
<br>

## Assignment-9: Forms

* Create the form with `v-model` binding.

<br>

<details>

<summary>App.vue</summary>
<br>

```html
<template>
  <div class="container">
    <form>
      <div class="row" v-if="!isSubmitted">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <!-- Exercise 1 -->
          <!-- Create a Signup Form where you retrieve the following Information -->
          <!-- Full Name (First Name + Last Name) -->
          <!-- Mail -->
          <!-- Password -->
          <!-- Store Data? Yes/No -->

          <nameForm v-model="fullName"/>

          <div class="form-group">
            <label for="email">email</label>
            <input type="email"
                   id="email"
                   class="form-control"
                   :class="{errorPlaceholder: hasError}"
                   v-model.lazy.trim="userData.email"
                   :placeholder="placeHolderValue"
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password"
                   id="password"
                   class="form-control"
                   v-model.lazy.trim="userData.password"
            >
          </div>
          <label for="yes">
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="storeData"
            >Yes
          </label>
          <label for="no">
            <input
              type="radio"
              id="no"
              value="no"
              v-model="storeData"
            >No
          </label>
          <br>

          <button
            class="btn btn-primary"
            @click.prevent="submitted"
          >Submit!
            <!-- We don't want to submit the form with SUBMIT action
            so that we use '.prevent' method. -->
          </button>

          <!-- Exercise 2 -->
          <!-- Only display the Form if it has NOT been submitted -->
          <!-- Display the Data Summary ONCE the Form HAS been submitted -->

          <!-- Exercise 3 -->
          <!-- Edit the Example from above and create a custom "Full Name" Control -->
          <!-- which still holds the First Name and Last Name Input Field -->
        </div>
      </div>
    </form>
    <hr>
    <div class="row" v-if="isSubmitted">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>Your Data</h4>
          </div>
          <div class="panel-body">
            <p>Full Name: {{ fullName }}</p>
            <p>Mail: {{ userData.email }}</p>
            <p>Password: {{ userData.password }}</p>
            <p>Store in Database?: {{ storeData }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NameForm from './components/NameForm'
  export default {
    components: {
      nameForm: NameForm
    },
    data() {
      return {
        fullName: "Mayk Jony",
        userData: {
          email: '',
          password: ''
        },
        storeData: 'yes',
        isSubmitted: false,
        placeHolderValue: 'yourmail@',
        hasError: false
      }
    },
    methods: {
      submitted() {
        if (this.userData.email === '' || this.userData.password === '') {
          this.hasError = true;
          this.placeHolderValue = 'this area is required';
          return
        }
        this.isSubmitted = true
      }
    }
  }
</script>
```

</details>

<br>

* Use `:value` to bind attribute. 

`value` which is passed as `props` passed automatically by Vuejs when using `input` element.

* Listen to change on input with `@input` 

<details>

<summary>NameForm.vue</summary>
<br>

```html
<template>
    <div class="form-container">
      <div class="form-group">
        <label for="firstName">First name</label>
        <input type="text"
               id="firstName"
               class="form-control"
               :value="firstName"
               @input="nameChanged(true, $event)"
        >
      </div>

      <div class="form-group">
        <label for="lastName">Last name</label>
        <input type="text"
               id="lastName"
               class="form-control"
               :value="lastName"
               @input="nameChanged(false, $event)"

        >
      </div>
    </div>
</template>

<script>
    export default {
      // When you enter 'value' as a prop, vuejs knows that it should
      // get the value of the input
      props: ['value'],
      methods: {
        nameChanged(isFirst, event) {
          let name = '';
          if (isFirst) {
            name = event.target.value + ' ' + this.lastName
          } else {
            name = this.firstName + ' ' + event.target.value
          }
          // update the value of the property otherwise
          // computed properties does not function correctly
          this.value = name;
          // You have to emit as 'input'
          this.$emit('input', this.value)
        }
      },
      computed: {
        firstName() {
          return this.value.split(" ")[0]
        },
        lastName() {
          return this.value.split(" ")[1]
        }
      }

    }
</script>

```

</details>

<br>

**Useful Links:**

Official Docs - Forms: [http://vuejs.org/guide/forms.html](http://vuejs.org/guide/forms.html)