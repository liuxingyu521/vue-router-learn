<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '账单管家'
      }
    }
  }
</script>

<style lang='less'>
  @import './assets/css/reset.less';
  .app{
    width: 100%;
  }
</style>
