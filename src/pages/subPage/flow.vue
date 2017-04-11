<template>
  <div class="container">
    <div class="totalDisplay">
      <div class="calendar">
        <span class="static">today</span>
        <span class="c-month">{{ date.c_month }}月</span>
        <span class="c-day"><b>{{ date.c_day }}</b></span>
      </div>
      <div class="display">
        <div class="display-title">
          <select class="flow-type" v-model="flowType">
            <option value="year" selected="selected">年流水</option>
            <option value="month">月流水</option>
          </select>
          <div class="flow-date">{{ flowType }}</div>
        </div>
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
          c_day: '06'
        },
        flowType: 'year'
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
  .container .totalDisplay{
    height: 12rem;
    border-bottom: 1px solid blue;
    background-color: #fbf0d3;
  }
  .container .calendar{
    position: absolute;
    top: .7rem;
    left: .6rem;
    width: 33%;
    padding: 3px;
    border: 2px solid #ccc;
    border-radius: 2px;
    box-shadow: 1px 2px 1px 1px rgba(49, 45, 45, 0.52);
    background-color: white;
  }
  .container .display{
    padding-left: 40%;
  }
  .container .calendar span{
    display: block;
    line-height: 3.5rem;
  }
  .container .calendar span.static{
    font-family: "comic sans MS";
    font-size: 2.5rem;
    text-align: center;
    height: 2.8rem;
    color: #fd5757;
  }
  .container .calendar span.c-month{
    font-size: 1.9rem;
    text-indent: 1rem;
    height: 3.2rem;
  }
  .container .calendar span.c-day{
    font-size: 3.5rem;
    text-indent: 2rem;
    height: 4rem;
  }
  .container .calendar span.c-day b:after{
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 2.5rem;
    width: 3.5rem;
    border-bottom: 2px solid #505050;
  }
  .container .display .display-title{
    height: 2.5rem;
    padding: .8rem .3rem;
  }
  .container .display .display-title [class^='flow']{
    display: inline-block;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .container .display .display-title select.flow-type{
    margin: 0 .5rem 0 1rem;
    padding: 0 1rem 0 .5rem;
    box-shadow: inset -2px -3px 2px 0px rgba(204, 204, 204, .8);
    border-radius: .2rem;
    background-color: #eee;
    background: url('../../assets/img/arrow.png') no-repeat right center #eee;
    font-size: 1rem;
    /* 去除下拉框小三角 */
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
  }
  .container .display .display-title select.flow-type:focus{
    outline: none;
  }
</style>