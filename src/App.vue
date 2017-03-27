<template>
  <div class="app">
    <my-head>标题</my-head>
    <transition name='index-com'>
      <router-view class='child-page'></router-view>
    </transition>
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

<style lang='less'>
  @import './styles/reset.less';
  .index-com-enter-active, .index-com-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .index-com-enter, .index-com-leave-active {
    opacity: 0
  }
  .router-link-active{
    color: red !important;
  }
</style>
