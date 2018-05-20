---
title: 'Day 1'
sidebarDepth: 3
---

# Day 1


## Credits

## Content

[[toc]]

## Turn on/off the lights

```html
<template>
  <div class="main-container">
    <div class="home__container">
      <button @click="isOn = !isOn">turn on/off</button>
      <div class="home"></div>
      <div class="cati"></div>
      <div class="window" :class="{ ison: isOn }"></div>
      <div class="door"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayOne',
  data () {
    return {
      isOn: false
    }
  }
}
</script>

<style scoped>
  .main-container {
    width: 100vw;
    height: 100vh;
    background-color: cyan;
    margin: 0;
    padding: 0;
  }
  svg > path {
    color: red;
  }
  .home__container {
    position: absolute;
    width: 360px;
    height: 400px;
  }
  button {
    margin: 0 auto;
  }
  .home {
    height: 200px;
    width: 200px;
    position: absolute;
    bottom: 0;
    left: 200px;
    background-color: brown;
  }
  .cati {
    width: 0;
    height: 0;
    position: absolute;
    bottom: 200px;
    left: 200px;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 100px solid orange;
  }
  .door {
    position: absolute;
    left: 320px;
    height: 140px;
    width: 60px;
    bottom: 0;
    background-color: green;
  }
  .window {
    background-color: black;
    height: 60px;
    width: 50px;
    position: absolute;
    bottom: 80px;
    left: 220px;
  }
  .ison {
    background-color: yellow;
  }
</style>
```