---
title: 'Conditionals and Lists'
sidebarDepth: 3
---

# Conditionals and Lists


## Credits

The link of this course is [on here](https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5941322?start=0).

## Content

[[toc]]

<div>
    <video width="100%" height="100%" controls>
        <source src="../images/box-span-video.webm" type="video/webm">
    Your browser does not support the video tag.
    </video>
</div>


```html
<template>

    <div class="main-container">
      <div class="square square-red" :class="{ 'full-width': fullWidth }" @click="fullWidth = !fullWidth"></div>
      <div class="square square-green"></div>
      <div class="square square-blue"></div>
    </div>

</template>

<script>
export default {
    data () {
      return {
        fullWidth: false
      }
    }
}
</script>

<style scoped>
  .main-container {
    height: 100vh;
    width: 100vw;
    background-color: lightblue;
    position: absolute;
  }
  .square {
    width: 20%;
    height: calc(100vh / 3);
    transition: width ease-in-out 400ms;
  }

  .square-red {
    background-color: red;
  }

  .square-blue { background-color: blue; }
  .square-green { background-color: green; }

  .default-width {
    width: 20%;
  }

    .full-width {
      width: 100%;
    }
</style>
```


## Span Box on click

I created a project, in which you can decide how many boxes will be any their colors. When you click to a box it spans up to *view width*. 

Here is the project code.

**Root Vue Component**

```html
<template>
    <div class="main-container">
      <app-box v-for="color in colors"
               :key="color"
               :color="color"
               :colorsLength="colors.length"
      ></app-box>
    </div>
</template>

<script>
  import TheBox from '../components/TheBox'
export default {
    components: {
      'app-box': TheBox
    },
    data () {
      return {
        colors: [ 'red', 'yellow', 'blue', 'orange', 'purple' ]
      }
    }
}
</script>

<style scoped>
  .main-container {
    height: 100vh;
    width: 100vw;
    background-color: lightblue;
    position: absolute;
  }

</style>

```

And here is the sinle box component.

**TheBox.vue**

```html
<template>
  <div class="square"
       :style="[ { 'background-color': color }, { height: (100 / colorsLength) + 'vh' } ]"
      :class="{ 'full-width': isFullWidth }"
      @click="isFullWidth = !isFullWidth">

  </div>
</template>

<script>
  export default {
      props: ['color', 'colorsLength'],
      name: "TheBox",
      data() {
        return {
          isFullWidth: false
        }
      }
    }
</script>

<style scoped>
  .square {
    width: 20%;
    /*height: calc(100vh / 3);*/
    transition: width ease-in-out 400ms;
  }

  .full-width { width: 100%; }

</style>

```

Here is a video from the finished application.

<div>
    <video width="100%" height="100%" controls>
        <source src="../videos/spanning-box.webm" type="video/webm">
    Your browser does not support the video tag.
    </video>
</div>


## Box Resizing 2


<div>
    <video width="100%" height="100%" controls>
        <source src="../videos/avatar-spanning.webm" type="video/webm">
    Your browser does not support the video tag.
    </video>
</div>

Similar to previous example this time I used a rather complex structure. Now with one click that will be made on lightblue area, all the boxed will react to changes.

Here is the folder structure:

> This is the root component

**index.vue**

```html
<template>
  <div class="main-container">
    <user-header></user-header>
    <user-content></user-content>
  </div>
</template>

<script>
  import UserHeader from '../../components/UserComponents/UserHeader';
  import UserContent from '../../components/UserComponents/UserContent';
  export default {
    components: {
      UserHeader,
      UserContent
    }
  }

</script>

<style scoped>

  .main-container {
    height: 100vh;
    width: 100%;
    background-color: #7f828b;
  }

</style>
```

**UserContent.vue**

```html
<template>
  <div class="content-container"
       :class="{ 'full-height': isFullHeight }"
        @click="spanContent">

  </div>
</template>

<script>
  import { boxSizeBus} from "../../.nuxt/custom";

  export default {
        name: "UserContent",
        data () {
          return {
            isFullHeight: false
          }
        },
        methods: {
          spanContent() {
            this.isFullHeight = !this.isFullHeight;
            boxSizeBus.$emit('contentWasSpanned', this.isFullHeight)
          }
        }
    }
</script>

<style scoped>

  .content-container {
    height: 70vh;
    width: 100%;
    background-color: lightblue;
    transition: height 350ms ease-in-out;

  }

  .full-height {
    height: 90vh;
  }

</style>
```

**UserHeader.vue**

```html
<template>
    <div class="header-container"
          :class="{ 'small-height': isSmallHeight }">
        <user-info></user-info>
    </div>
</template>

<script>
    import { boxSizeBus} from "../../.nuxt/custom";
    import UserInfo from '../../components/UserComponents/UserInfo'

    export default {
        name: "UserHeader",
        components: {
          UserInfo
        },
        data () {
          return {
            isSmallHeight: false
          }
        },
        created() {
          boxSizeBus.$on('contentWasSpanned', (data) => {
            this.isSmallHeight = data;
          })
        }
    }
</script>

<style scoped>

  .header-container {
    height: 30vh;
    width: 100%;
    background-color: palevioletred;
    transition: height 350ms ease-in-out;
  }

  .small-height {
    height: 10vh;
  }

</style>

```

**UserInfo.vue**

```html
<template>
  <div class="info-container">

    <div v-if="isSmall"></div>

    <div class="user-info" v-else>
      <h3>Username: Mayk</h3>
      <h3>Age: 27</h3>
      <h3>Hobbies: running, cycling</h3>
      <h3>twitter, facebook</h3>
    </div>

    <div class="avatar-circle"
          :class="{ 'avatar-circle__small': isSmall }"
          >

    </div>
  </div>
</template>

<script>
  import { boxSizeBus} from "../../.nuxt/custom";

  export default {
        name: "UserInfo",
        data () {
          return {
            isSmall: false
          }
        },
        created () {
          boxSizeBus.$on('contentWasSpanned', (data) => {
            this.isSmall = data
          })
        }
    }
</script>

<style scoped>
  .info-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 12px;
  }

  .avatar-circle {
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    justify-self: flex-end;
    background-color: #7f828b;
    transition: all 350ms ease-in-out;
  }

  .avatar-circle__small {
    width: 3rem;
    height: 3rem;
  }

  .user-info {
    max-width: 60%;
    justify-self: flex-start;
    animation: fadeIn 900ms both;
  }

  .logo {
    justify-self: flex-start;
  }
  
</style>
```