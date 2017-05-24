<template>
  <div class="userPage">
    <z-head :showUser="showUser">账单管家</z-head>
    <router-view @sessionFail="sessionFail" :bill="bill" @onlyKeepAccount="changeFoot"></router-view>
    <z-footer :onlyKeepAccount="onlyKeepAccount" @changeFoot="changeFoot"></z-footer>
  </div>
</template>

<script>
  import ZHead from '../layout/Head.vue';
  import ZFooter from '../layout/Foot.vue';
  import axios from 'axios';

  export default {
    data: function(){
      return {
        showUser: true,
        onlyKeepAccount: false,
        bill: {}
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

      // 请求用户bill数据
      axios.post('/users/id/bill')
        .then(function(response){
          if(response.data.stateCode == '1'){
            _this.$emit('loading', { isLoading: false});
            _this.$emit('toast',{
              isToast: true,
              toastMessage: '会话失败，请重新登录'
            })
            _this.$router.push('/login');
          }
          else{
            _this.$emit('loading', { isLoading: false});
            _this.bill = response.data.userBill;
          }
        })
        .catch(function(error){
          console.log(error);
        })
    },
    methods: {
      sessionFail: function(data){
        this.$emit('toast', data);
      },
      changeFoot: function(o){
        this.onlyKeepAccount = o.onlyKeepAccount;
      }
    }
  }
</script>

