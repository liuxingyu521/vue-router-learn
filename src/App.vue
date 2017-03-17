<template>
  <div class="container">
    <my-head></my-head>
    <!-- <my-body></my-body> -->
    <!-- <my-footer></my-footer> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHead from './layout/head.vue';
  // import MyBody from './layout/body.vue';
  // import MyFooter from './layout/footer.vue';

  export default {
    data (){
      return {
        msg: 'app.vue'
      }
    },
    components: {
      MyHead: MyHead,
      // MyBody: MyBody,
      // MyFooter: MyFooter
    }
  }
</script>

<style>
  .container{
    margin: 0;
    padding: 0;
  }
  .router-link-active{
    color: red !important;
  }
</style>
