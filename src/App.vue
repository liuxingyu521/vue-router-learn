<template>
  <div class="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        title: '账单管家',
        transitionName: ''
      }
    },
    watch: {
      $route: function(to, from){
        console.log(from.name);
        if(from.name == 'register'){
          this.transitionName = 'slide-right';
        }else{
          this.transitionName = 'slide-left';
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
    transition: opacity .1s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .child-view {
    position: absolute;
    width: 100%;
    transition: all 1s cubic-bezier(.55,0,.1,1);
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
