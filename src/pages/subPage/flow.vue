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
      <timeline>
        <timeline-item>
            <p class="recent">收入：3000￥</p>
            <p class="recent">支出：3211￥</p>
        </timeline-item>
        <timeline-item>
            <h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
            <p>2016-04-16 10:23:00</p>
        </timeline-item>
        <timeline-item>
            <h4> 商家正在通知快递公司揽件</h4>
            <p>2016-04-15 9:00:00</p>
        </timeline-item>
      </timeline>
    </div>
    <date-selector v-model="showDate"
    title="请选择日期"
    @on-confirm="setFlowDate"
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
  import Timeline from '../../components/timeline.vue';
  import TimelineItem from '../../components/timeline-item.vue';

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
        expend: '122,200',
        income: '1,121,200',
        showDate: false
      }
    },
    components: {
      DateSelector: DateSelector,
      Timeline: Timeline,
      TimelineItem: TimelineItem
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
        }
      },
      flowDate: function(val){

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
    text-indent: 2.5rem;
    height: 4rem;
  }
  .container .calendar span.c-day b:after{
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 3rem;
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
  .container .display .display-title .flow-date{
    width: 6rem;
    padding: 0 .5rem;
    font-size: 1.2rem;
    line-height: 2.3rem;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 6px 4px rgba(226, 110, 27, 0.2);
    border: 1px dashed #e26e1b;
  }
  .container .display .display-content [class$='wrap']{
    height: 4rem;
    padding-right: .6rem;
    line-height: 4rem;
    text-indent: 1.2rem;
    font-family: "Microsoft YaHei";
    font-size: 1.1rem;
    color: #636363;
  }
  .container .display .display-content span.expend,
  .container .display .display-content span.income{
    font-size: 1.3rem;
    display: inline-block;
    width: 7rem;
    text-align: right;
    text-indent: 0;
  }
  .container .display .display-content span.expend b{
    color: red;
  }
  .container .display .display-content span.income b{
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
</style>