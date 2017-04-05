<template>
  <div class="app">
    <transition :name="transitionName">
      <router-view class="child-view" v-on:loading="loading"></router-view>
    </transition>
    <loading v-model="isLoading" :text="loadingText"></loading>
  </div>
</template>

<script>
  import Loading from './components/loading.vue';

  export default {
    data: function() {
      return {
        title: '账单管家',
        transitionName: 'fade',
        isLoading: false,
        loadingText: '登录成功，初始化数据中...'
      }
    },
    components: {
      Loading: Loading
    },
    methods: {
      loading: function(data){
        console.log(data);
        this.loadingText = data.loadingText;
        this.isLoading = data.isLoading;
      }
    },
    watch: {
      $route: function(to, from){
        if(from.name == 'register' || to.name == 'login'){
          this.transitionName = 'slide-right';
        }
        else if((from.name == 'login') && (to.name == 'register')){
          this.transitionName = 'slide-left';
        }
        else{
          this.transitionName = 'fade';
        }
      }
    }
  }
</script>

<style lang='less'>
  @import './assets/css/reset.less';
  .app{
    width: 100%;
    position: relative;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .child-view {
    position: absolute;
    width: 100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
