<template>
  <div class="app">
    <my-head>标题</my-head>
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHead from './layout/head.vue'
  // import MyHead from './components/x-header.vue'
  
  export default {
    components: {
      MyHead
    }
  }
</script>

<style>
  .router-link-active{
    color: red !important;
  }
</style>
