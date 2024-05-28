<script setup lang="ts">
import HelloWorld from './components/HelloWorld.tsx'
</script>

<template>
  <div>
    <div style="width: 100%; height: 50px; background-color: red"></div>
    <div style='width: 100%;
    height: 100px; 
    background-color: yellow'></div>
    <div :style="{
      width: '375px',


      fontSize: '32px',


      
      height: '100px',
      backgroundColor: 'blue'
    }">

    </div>
  </div>
  <HelloWorld msg="tsx" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
