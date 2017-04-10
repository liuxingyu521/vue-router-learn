<template>
  <div class="container">
    <div class="totalDisplay">
      <div class="calendar">
        <span class="static">today</span>
        <span class="c-month">{{ date.c_month }}月</span>
        <span class="c-day">{{ date.c_day }}</span>
      </div>
      <div class="display">
        <span>年流水</span>
        <span>2017年</span>
      </div>
    </div>
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
    },
    data: function(){
      return {
        date: {
          c_year: '2017',
          c_month: '4',
          c_day: '10'
        }
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
    position: relative;
  }
  .container .calendar{
    position: absolute;
    top: .5rem;
    left: 1rem;
    border: 1px solid #aaa;
  }
  .container .display{
    padding-left: 40%;
  }
  .container .calendar span{
    display: block;
    line-height: 3.5rem;
  }
  .container .calendar span.static{
    text-align: bottom;
    font-family: "comic sans MS";
  }
</style>