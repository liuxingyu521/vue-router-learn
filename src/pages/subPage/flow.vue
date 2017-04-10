<template>
  <div class="container">
    flow
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      bill: {
        type: Object,
        default: {}
      }
    }
    // created: function(){
    //   var _this = this;
    //   axios.post('/users/id/bill')
    //     .then(function(response){
    //       if(response.data.stateCode == '1'){
    //         _this.$emit('sessionFail',{
    //           isToast: true,
    //           toastMessage: '会话失败，请重新登录'
    //         })
    //         _this.$router.push('/login');
    //       }
    //       else{
    //         console.log(response.data.userBill);
    //       }
    //     })
    //     .catch(function(error){
    //       console.log(error);
    //     })
    // }
  }
</script>

<style>
  .userPage .container{
    margin-top: 3.5rem;
  }
</style>