<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </div>
  </header> -->

  <router-view />
</template>

<style >
/* @import '@/assets/base.css'; */
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@700&display=swap');

#app {
  margin: 0;
  display: flex;
    flex-direction: column;
    width: 100%;
  font-weight: 700;
}

h1{
    font-size: 48px;
}

h2{
    font-size: 32 px;
}

h3{
  font-size: 20px;
}

h4{
    font-size: 18px;
}



</style>
