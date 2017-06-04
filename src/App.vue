<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" v-on:loading="loading" v-on:toast="toast"></router-view>
    </transition>
    <loading v-model="isLoading" :text="loadingText"></loading>
    <toast v-model="showPositionValue" type="text" :time="1500" isShowMask width="auto" :position="toastPos">{{ toastMessage }}</toast>
  </div>
</template>

<script>
  import Loading from './components/loading.vue';
  import Toast from './components/toast.vue';

  export default {
    data: function() {
      return {
        title: '账单管家',
        transitionName: 'fade',
        isLoading: false,
        loadingText: '',
        showPositionValue: false,
        toastMessage: '',
        toastPos: 'bottom'
      }
    },
    components: {
      Loading: Loading,
      Toast: Toast
    },
    methods: {
      // 遮罩层事件
      loading: function(data){
        this.loadingText = data.loadingText;
        this.isLoading = data.isLoading;
      },
      // 提示文案事件
      toast: function(data){
        this.toastMessage = data.toastMessage;
        this.showPositionValue = data.isToast;
        this.toastPos = data.position ? data.position : 'bottom';
      }
    },
    watch: {
      $route: function(to, from){
        if(from.name == 'register' || to.name == 'login'){
          this.transitionName = 'slide-right';
        }
        else if((from.name == 'login') && (to.name == 'register')){
          this.transitionName = 'slide-left';
          console.log(from);
        }
        else{
          this.transitionName = 'fade';
        }
        if((from.name == 'register') && (to.name == 'login')){
          console.log(from);
        }
      }
    }
  }
</script>

<style lang='less'>
  @import './assets/css/reset.less';
  #app{
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #eee;
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
    height: 100%;
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
