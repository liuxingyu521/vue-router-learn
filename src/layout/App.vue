<template>
  <div class='container'>
    <h3>vue-router 2.x</h3>
    <p>{{ msg }}</p>
    <ul>
      <li>
        <router-link to='/home'>/home</router-link>
      </li>
      <li>
        <router-link to='/about'>/about</router-link>
      </li>
      <li>
        <router-link to='/user/lily'>/user/lily</router-link>
      </li>
      <li>
        <router-link to='/user/bob'>/user/bob</router-link>
      </li>
    </ul>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        msg: 'app.vue'
      }
    }
  }
</script>

<style>
  .router-link-active{
    color: red;
  }
</style>
