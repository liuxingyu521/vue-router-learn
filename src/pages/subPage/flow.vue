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
            <option value="年" selected="selected">年流水</option>
            <option value="月">月流水</option>
          </select>
          <div class="flow-date" @click="showDate=true">{{ flowDate | formatFlowDate(flowType) }}</div>
        </div>
        <div class="display-content">
          <div class="expend-wrap">
            <span class="text">本{{ flowType }}支出:</span>
            <span class="expend"><b>{{ expend }}</b>￥</span>
          </div>
          <div class="income-wrap">
            <span class="text">本{{ flowType }}收入:</span>
            <span class="income"><b>{{ income }}</b>￥</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flowDisplay">
      <div class="lastFlow">
        最新流水
        <span class="lastFlowDate">3月20日</span>
        <span class="lastFlowType">支:</span>
        <span class="lastFlowMoney">33￥</span>
      </div>
      <flow-wrap>
        <flow-item v-for="(monthItem, index) in flowBill" 
        :isMonthItem="true" 
        :isLast="(index == flowBill.length-1) ? true : false"
        :headText="monthItem.month+'月'"
        @slideUl="slideUl"
        >
            <p>收入：{{ monthItem.totalIncome }}￥</p>
            <p>支出：{{ monthItem.totalExpend }}￥</p>
            <span class="remain">结余：{{ monthItem.remain}}￥</span>
            <ul slot="dayFlow">
              <flow-item v-for="(dayItem, index) in monthItem.days"
              :isMonthItem="false"
              :headText="dayItem.day"
              >
                <p>{{ dayItem.bill[0].type == "" ? "没有记录" : dayItem.bill[0].type }}</p>
                <p class="comment">{{ dayItem.bill[0].comment }}</p>
                <span class="money">{{ dayItem.bill[0].money == "0" ? "0" : ("支："+ dayItem.bill[0].money)}}￥</span>
              </flow-item>
            </ul>
        </flow-item>     
      </flow-wrap>
    </div>
    <date-selector v-model="showDate"
    title="请选择日期"
    @on-confirm="setFlowDate"
    @on-cancel="setFlowYearMonth"
    >
      <div class="year-month-wrap">
        <div class="year-selector">
          <span class="sub" @click="flowYear = (flowYear == 1990) ? 2050 : flowYear-1">-</span>
          <p v-html="flowYear+'年'"></p>
          <span class="add" @click="flowYear = (flowYear == 2050) ? 1990 : flowYear+1">+</span>
        </div>
        <div class="month-selector" v-show="flowType=='年' ? false : true">
          <span class="sub" @click="flowMonth = (flowMonth == 1) ? 12 : flowMonth-1">-</span>
          <p v-html="flowMonth+'月'"></p>
          <span class="add" @click="flowMonth = (flowMonth == 12) ? 1 : flowMonth+1">+</span>
        </div>
      </div>
    </date-selector>
  </div>
</template>

<script>
  import DateSelector from '../../components/confirm.vue';
  import FlowWrap from '../../components/flowwrap.vue';
  import FlowItem from '../../components/flowitem.vue';
  import Util from '../../js/util.js';
  import $ from 'jquery';

  export default {
    props: {
      bill: {
        type: Object,
        default: {}
      }
    },
    data: function(){
      var cur_date = new Date();

      return {
        date: {
          c_year: cur_date.getFullYear(),
          c_month: cur_date.getMonth()+1,
          c_day: cur_date.getDate()
        },
        flowType: '年',
        flowDate: cur_date.getFullYear(),
        flowYear: cur_date.getFullYear(),
        flowMonth: cur_date.getMonth()+1,
        flowBill: {}, // 控制渲染列表的数据
        expend: '122,200',
        income: '1,121,200',
        showDate: false
      }
    },
    components: {
      DateSelector: DateSelector,
      FlowWrap: FlowWrap,
      FlowItem: FlowItem
    },
    mounted: function(){
      // console.log(this.bill);
    },
    filters: {
      formatFlowDate: function(text, type){
        if(type == '年'){
          return text+'年';
        }
        else{
          return text;
        }
      }
    },
    watch: {
      flowType: function(val){
        if(val == '年'){
          this.flowDate = this.flowYear = this.date.c_year;
        }
        else{
          this.flowDate = this.date.c_year + '-' + this.date.c_month;
          this.flowMonth = this.date.c_month;
          this.flowYear = this.date.c_year;
        }
      },
      flowDate: function(val){

      },
      bill: function(){
        this.filterBill();
      }
    },
    methods: {
      setFlowDate: function(){
        if(this.flowType == '年'){
          this.flowDate = this.flowYear;
        }
        else{
          this.flowDate = this.flowYear + '-' + this.flowMonth;
        }
      },
      setFlowYearMonth: function(){
        if(this.flowType == '年'){
          this.flowYear = this.flowDate;
        }
        else{
          this.flowYear =  Number(this.flowDate.split('-')[0]);
          this.flowMonth = Number(this.flowDate.split('-')[1]);
        }
      },
      filterBill: function(){
        var _this = this;

        var yearBill, monthes, monthBill; 

        // 有某些年账单数据
        if(!!_this.bill.years){
          // 找到和选择的年份吻合的年账单
          yearBill = _this.bill.years.filter(function(val, index, arr){
            return val.year == _this.flowYear;
          });

          // 年账单存在
          if(yearBill.length > 0){
        
            _this.flowBill = Util.fillYear(_this.flowYear, yearBill);
            console.log(_this.flowBill);
          }
          // 年账单不存在，构造整年
          else{
            yearBill = Util.fillYear(_this.flowYear);
            _this.flowBill = yearBill.monthes;
            console.log(_this.flowBill);
          }
        }
        // 空用户，无账单数据
        else{
          yearBill = Util.fillYear(_this.flowYear);
          _this.flowBill = yearBill.monthes;
          console.log(_this.flowBill);
        }
      },
      slideUl: function($itemMonth){
        $itemMonth.find('ul').toggle();
      }
    }
    
  }
</script>

<style>
  .userPage .container{
    margin-top: 3.5rem;
    position: relative;
  }
  .container .totalDisplay{
    height: 12rem;
    border-bottom: 1px solid #888;
    background-color: #fbf0d3;
  }
  .totalDisplay .calendar{
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
  .totalDisplay .display{
    padding-left: 40%;
  }
  .totalDisplay .calendar span{
    display: block;
    line-height: 3.5rem;
  }
  .totalDisplay .calendar span.static{
    font-family: "comic sans MS";
    font-size: 2.5rem;
    text-align: center;
    height: 2.8rem;
    color: #fd5757;
  }
  .totalDisplay .calendar span.c-month{
    font-size: 1.9rem;
    text-indent: 1rem;
    height: 3.2rem;
  }
  .totalDisplay .calendar span.c-day{
    font-size: 3.5rem;
    text-indent: 2.5rem;
    height: 4rem;
  }
  .totalDisplay .calendar span.c-day b:after{
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 3rem;
    width: 3.5rem;
    border-bottom: 2px solid #505050;
  }
  .totalDisplay .display .display-title{
    height: 2.5rem;
    padding: .8rem .3rem;
  }
  .totalDisplay .display .display-title [class^='flow']{
    display: inline-block;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .totalDisplay .display .display-title select.flow-type{
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
  .totalDisplay .display .display-title select.flow-type:focus{
    outline: none;
  }
  .totalDisplay .display .display-title .flow-date{
    width: 6rem;
    padding: 0 .5rem;
    font-size: 1.2rem;
    line-height: 2.3rem;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 6px 4px rgba(226, 110, 27, 0.2);
    border: 1px dashed #e26e1b;
  }
  .totalDisplay .display .display-content [class$='wrap']{
    height: 4rem;
    padding-right: .6rem;
    line-height: 4rem;
    text-indent: 1.2rem;
    font-family: "Microsoft YaHei";
    font-size: 1.1rem;
    color: #636363;
  }
  .totalDisplay .display .display-content span.expend,
  .totalDisplay .display .display-content span.income{
    font-size: 1.3rem;
    display: inline-block;
    width: 7rem;
    text-align: right;
    text-indent: 0;
  }
  .totalDisplay .display .display-content span.expend b{
    color: red;
  }
  .totalDisplay .display .display-content span.income b{
    color: #11bb11;
  }
  /* 日期选择窗 */
  .container .year-month-wrap{
    display: flex;
  }
  .container .year-month-wrap span{
    font-size: 2rem;
    display: inline-block;
    width: 3.5rem;
  }
  .container .year-month-wrap .year-selector,
  .container .year-month-wrap .month-selector{
    flex: 1;
  }
  .container .year-month-wrap .year-selector p,
  .container .year-month-wrap .month-selector p{
    display: inline-block;
    width: 8rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1.1rem;
    color: black;
  }
  .flowDisplay .lastFlow{
    background: rgb(225, 245, 232);
    height: 3.5rem;
    position: relative;
    margin: .5rem 1.5rem 0.5rem 3rem;
    padding-left: 2rem;
    line-height: 3.5rem;
    /*text-align: center;*/
    border: 1px dashed #04BE02;
    border-radius: 50%;
  }
  .flowDisplay .lastFlow:before {
    content: '';
    width: 2px;
    height: 100%;
    position: absolute;
    top: 45%;
    left: -1.59rem;
    background-color: #04BE02;
  }
  .flowDisplay .lastFlow:after {
    content: '';
    width: 0.7rem;
    height: 0.7rem;
    position: absolute;
    top: 31%;
    left: -1.8rem;
    background: #04BE02;
    border-radius: 50%;
  }
  .flowDisplay .lastFlow .lastFlowDate{
    padding: 0 1.5rem;
  }
</style>