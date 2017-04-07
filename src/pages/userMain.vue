<template>
  <div class="userPage">
    <z-head :showUser="showUser">账单管家</z-head>
    <router-view></router-view>
    <z-footer :showFooter="showFooter">
    </z-footer>
  </div>
</template>

<script>
  import ZHead from '../layout/Head.vue';
  import ZFooter from '../layout/Foot.vue';

  export default {
    data: function(){
      return {
        showUser: true,
        showFooter: true
      };
    },
    components: {
      ZHead: ZHead,
      ZFooter: ZFooter
    },
    created: function(){
      var _this = this;
      _this.$emit('loading', {
        isLoading: true,
        loadingText: '正在初始化数据..'
      });


      setTimeout(function(){
        _this.$emit('loading', { isLoading: false });
      }, 2000);
    }
  }
</script>

