<template>
  <div class="container">
    <div class="header">
	    统计数据
	    <!-- <div class="show-type">
	    	<input type="radio" value="pie" name="showType" id="pieInput" v-model="showType"><label for="pieInput" :class="{'active': showType == 'pie'? true:false}">饼图</label><input type="radio" value="bar" name="showType" id="barInput" v-model="showType"><label for="barInput" :class="{'active': showType == 'pie'? false:true}">条形图</label>
	    </div> -->
    </div>
    <div class="condition">
    	<select class="bill-type" v-model="billType">
        <option value="expend" selected="selected">支出</option>
        <option value="income">收入</option>
      </select>
      <select class="bill-year-month" v-model="billYearMonth">
        <option value="年" selected="selected">年</option>
        <option value="月">月</option>
      </select>
      <div class="show-date" @click="showDateSelect=true">{{ showDate | formatShowDate(billYearMonth) }}</div>
    </div>
    <div id="echartBox">
    	
    </div>
    <date-selector v-model="showDateSelect"
    title="请选择要统计的日期"
    @on-confirm="setShowDate"
    @on-cancel="setShowYearMonth"
    >
      <div class="year-month-wrap">
        <div class="year-selector">
          <span class="sub" @click="showYear = (showYear == 1990) ? 2050 : showYear-1">-</span>
          <p v-html="showYear+'年'"></p>
          <span class="add" @click="showYear = (showYear == 2050) ? 1990 : showYear+1">+</span>
        </div>
        <div class="month-selector" v-show="billYearMonth=='年' ? false : true">
          <span class="sub" @click="showMonth = (showMonth == 1) ? 12 : showMonth-1">-</span>
          <p v-html="showMonth+'月'"></p>
          <span class="add" @click="showMonth = (showMonth == 12) ? 1 : showMonth+1">+</span>
        </div>
      </div>
    </date-selector>
  </div>
</template>

<script>
	import DateSelector from '../../components/confirm.vue';
	import Util from '../../js/util.js';

	var echarts = require('echarts/lib/echarts');
	// 引入饼图
	require('echarts/lib/chart/pie');
	require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/tooltip');
	

	export default {
		data: function(){
			var cur_date = new Date();

			return {
				date: {
          c_year: cur_date.getFullYear(),
          c_month: cur_date.getMonth()+1,
          c_day: cur_date.getDate()
        },
				showType: 'pie',
				billType: "expend",
				billYearMonth: "年",
				showDate: cur_date.getFullYear(),
        showYear: cur_date.getFullYear(),
        showMonth: cur_date.getMonth()+1,
        showDateSelect: false
			}
		},
		props: {
			bill: {
        type: Object,
        default: {}
      }
		},
		components: {
			DateSelector: DateSelector
		},
		mounted: function(){
			var _this = this;
			var echarBox = document.getElementById('echartBox');
			// 设置echartBox的宽高
			echartBox.style.width = window.innerWidth + 'px';
			echartBox.style.height = window.innerHeight * 3 / 5 + 'px';
			// 基于准备好的dom，初始化echarts实例
			_this.myChart = echarts.init(echarBox);
			_this.myChart.setOption({
				title: {
					text: _this.showYear + '年支出情况',
					left: 'center'
				},
				tooltip: {
					formatter: '{b}:{d}%',
				},
				legend: {
					top: 30,
					left: 'left',
					selectedMode: false,
					// data: ['食品酒水','衣服服饰','居家物业','行车交通','交流通讯','休闲娱乐','学习进修','医疗保健','金融保险','其他杂项']
				},
		    series: [{
		        name: 'pie',
		        type: 'pie',
		        show: false,
		        zLevel: 0,
		        radius: [0, '60%'],
		        center: ['50%','60%'],
		        hoverAnimation: false,
		        startAngle: 35,
		        label: {
		        	normal: {
		        		show: true,
		        		position: 'outside',
		        		formatter: '{b}:{c}¥'
		        	}
		        },
		        labelLine: {
		        	normal: {
		        		length: 4,
		        		length2: 6
		        	}
		        },
		        data: [
		        	{ 
		        		value: 1,
		        		itemStyle: {
		        			normal: {
		        				color: 'rgba(255, 135, 55, 0.8)'
		        			}
		        		},
		        		labelLine: {
				        	normal: {
				        		show: false
				        	}
				        },
				        label: {
				        	normal: {
				        		show: false
				        	}
				        }
		        	}
		        ]
		    }]
			});

			this.setEchart();
			
		},
		filters: {
			formatShowDate: function(text, type){
        if(type == '年'){
          return text+'年';
        }
        else{
          return text;
        }
      }
		},
		watch: {
			billYearMonth: function(val){
				if(val == '年'){
					this.showDate = this.showYear = this.date.c_year;
					this.setEchart();
				}
				else{
					this.showDate = this.date.c_year + '-' + this.date.c_month;
          this.showMonth = this.date.c_month;
          this.showYear = this.date.c_year;
          this.setEchart();
				}
			},
			bill: function(){
				this.setEchart();
			},
			billType: function(){
				this.setEchart();
			}
		},
		methods: {
			setShowDate: function(){
        if(this.billYearMonth == '年'){
          this.showDate = this.showYear;
          this.setEchart();
        }
        else{
          this.showDate = this.showYear + '-' + this.showMonth;
          this.setEchart();
        }
      },
      setShowYearMonth: function(){
        if(this.billYearMonth == '年'){
          this.showYear = this.showDate;
        }
        else{
          this.showYear =  Number(this.showDate.split('-')[0]);
          this.showMonth = Number(this.showDate.split('-')[1]);
        }
      },
      setEchart: function(){
      	var _this = this;
      	// 整理数据，填充到echarts中
				var eachClassNum = {
					'10':0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0,
					'16':0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0
				}
				var titleText;
				var seriesData = [],
						legendData = [];
				var seriesExpendData = [
          	{ value: 0, name: '食品酒水'},
          	{ value: 0, name: '衣服服饰'},
          	{ value: 0, name: '行车交通'},
          	{ value: 0, name: '居家物业'},
          	{ value: 0, name: '交流通讯'},
          	{ value: 0, name: '休闲娱乐'},
          	{ value: 0, name: '学习进修'},
          	{ value: 0, name: '医疗保健'},
          	{ value: 0, name: '金融保险'},
          	{ value: 0, name: '其他杂项'}
          ];
	      var seriesIncomeData = [
	      	{ value: 0, name: '职业收入'},
	      	{ value: 0, name: '其他收入'}
	      ]
	      var legendExpendData = ['食品酒水','衣服服饰','居家物业','行车交通','交流通讯','休闲娱乐','学习进修','医疗保健','金融保险','其他杂项'];
	      var legendIncomeData = ['职业收入', '其他收入'];
				// 有某些年账单数据
        if(!!_this.bill.years){
          // 找到和选择的年份吻合的年账单
          var yearBill = _this.bill.years.filter(function(val, index, arr){
            return val.year == _this.showYear;
          });
          // 年账单存在
          if(yearBill.length > 0){
            // 流水账单的展示类型
            if(_this.billYearMonth == '年'){
              Util.fillYear(_this.showYear, yearBill[0]).monthes.forEach(function(el, ind, ar){
								el.days.forEach(function(e, i, a){
									e.bills.forEach(function(item){
										switch(item.class.slice(0, 2)){
											case '10':
												eachClassNum['10'] = Number(eachClassNum['10']) + Number(item.money);
												break;
											case '11':
												eachClassNum['11'] = Number(eachClassNum['11']) + Number(item.money);
												break;
											case '12':
												eachClassNum['12'] = Number(eachClassNum['12']) + Number(item.money);
												break;
											case '13':
												eachClassNum['13'] = Number(eachClassNum['13']) + Number(item.money);
												break;
										  case '14':
												eachClassNum['14'] = Number(eachClassNum['14']) + Number(item.money);
												break;
											case '15':
												eachClassNum['15'] = Number(eachClassNum['15']) + Number(item.money);
												break;
											case '16':
												eachClassNum['16'] = Number(eachClassNum['16']) + Number(item.money);
												break;
											case '17':
												eachClassNum['17'] = Number(eachClassNum['17']) + Number(item.money);
												break;
											case '18':
												eachClassNum['18'] = Number(eachClassNum['18']) + Number(item.money);
												break;
											case '19':
												eachClassNum['19'] = Number(eachClassNum['19']) + Number(item.money);
												break;
											case '20':
												eachClassNum['20'] = Number(eachClassNum['20']) + Number(item.money);
												break;
											case '21':
												eachClassNum['21'] = Number(eachClassNum['21']) + Number(item.money);
												break;
											default:
												break;
										}
									})
								})
							});
            }
            else{
              Util.fillYear(_this.showYear, yearBill[0]).monthes.map(function(el, ind, ar){
              	if(el.month == _this.showMonth){
									el.days.forEach(function(e, i, a){
										e.bills.forEach(function(item){
											switch(item.class.slice(0, 2)){
												case '10':
													eachClassNum['10'] = Number(eachClassNum['10']) + Number(item.money);
													break;
												case '11':
													eachClassNum['11'] = Number(eachClassNum['11']) + Number(item.money);
													break;
												case '12':
													eachClassNum['12'] = Number(eachClassNum['12']) + Number(item.money);
													break;
												case '13':
													eachClassNum['13'] = Number(eachClassNum['13']) + Number(item.money);
													break;
											  case '14':
													eachClassNum['14'] = Number(eachClassNum['14']) + Number(item.money);
													break;
												case '15':
													eachClassNum['15'] = Number(eachClassNum['15']) + Number(item.money);
													break;
												case '16':
													eachClassNum['16'] = Number(eachClassNum['16']) + Number(item.money);
													break;
												case '17':
													eachClassNum['17'] = Number(eachClassNum['17']) + Number(item.money);
													break;
												case '18':
													eachClassNum['18'] = Number(eachClassNum['18']) + Number(item.money);
													break;
												case '19':
													eachClassNum['19'] = Number(eachClassNum['19']) + Number(item.money);
													break;
												case '20':
													eachClassNum['20'] = Number(eachClassNum['20']) + Number(item.money);
													break;
												case '21':
													eachClassNum['21'] = Number(eachClassNum['21']) + Number(item.money);
													break;
												default:
													break;
											}
										})
									})
              	}
							});
            }
          }
        }
        for(var i in eachClassNum){
        	switch(i){
        		case '10':
        			seriesExpendData.map(function(e){
        				if(e.name == '食品酒水'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '11':
        			seriesExpendData.map(function(e){
        				if(e.name == '衣服服饰'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '12':
        			seriesExpendData.map(function(e){
        				if(e.name == '居家物业'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '13':
        			seriesExpendData.map(function(e){
        				if(e.name == '行车交通'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '14':
        			seriesExpendData.map(function(e){
        				if(e.name == '交流通讯'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '15':
        			seriesExpendData.map(function(e){
        				if(e.name == '休闲娱乐'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '16':
        			seriesExpendData.map(function(e){
        				if(e.name == '学习进修'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '17':
        			seriesExpendData.map(function(e){
        				if(e.name == '医疗保健'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '18':
        			seriesExpendData.map(function(e){
        				if(e.name == '金融保险'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '19':
        			seriesExpendData.map(function(e){
        				if(e.name == '其他杂项'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '20':
        			seriesIncomeData.map(function(e){
        				if(e.name == '职业收入'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		case '21':
        			seriesIncomeData.map(function(e){
        				if(e.name == '其他收入'){
        					e.value = eachClassNum[i];
        				}
        			});
        			break;
        		default:
        			break;
        	}
        }
        // 隐藏数据为0的项
        seriesExpendData.forEach(function(e){
        	if(e.value == 0){
        		e.label = {
        			normal: {
        				show: false
        			}
        		};
        		e.labelLine = {
        			normal: {
        				show: false
        			}
        		};
        	}
        })
        seriesIncomeData.forEach(function(e){
        	if(e.value == 0){
        		e.label = {
        			normal: {
        				show: false
        			}
        		};
        		e.labelLine = {
        			normal: {
        				show: false
        			}
        		};
        	}
        })

        if(_this.billType == 'expend'){
        	seriesData = seriesExpendData;
        	legendData = legendExpendData;
        	if(_this.billYearMonth == '年'){
        		titleText = _this.showYear + '年支出情况'
        	}else{
        		titleText = _this.showYear + '年' + _this.showMonth + '月支出情况';
        	}
        }
        else{
        	seriesData = seriesIncomeData;
        	legendData = legendIncomeData;
        	if(_this.billYearMonth == '年'){
        		titleText = _this.showYear + '年收入情况'
        	}else{
        		titleText = _this.showYear + '年' + _this.showMonth + '月收入情况';
        	}
        }

        _this.myChart.setOption({
        	title: {
						text: titleText
					},
        	legend:{
						data: legendData
					},
        	series: [
        		{
        			name: 'pie',
        			data: seriesData
        		}
        	]
        })
      }
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		color: #676767;
		background: #ecf3ff;
	}
	.container .header{
		padding: 1.2rem 1rem;
		position: relative;
		font-size: 1.5rem;
	}
	.container .header:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #676767;
	}
	.container .header .show-type{
		display: inline-block;
    position: absolute;
    top: .9rem;
    right: 1.5rem;
    font-size: 1rem;
    padding: .2rem 0;
    border: 1px solid #676767;
    border-radius: 0.3rem;
	}
	.header .show-type:after{
    content: '';
    position: absolute;
    top: 0.3rem;
    left: 2.6rem;
    width: 1px;
    height: 78%;
    background: #676767;
	}
	.header .show-type input{
		display: none;
	}
	.header .show-type label{
		display: inline-block;
		padding: .2rem .3rem;
	}
	.header .show-type label.active{
		color: #ff8737;
	}
	.container .condition{
		padding: 1rem;
	}
	.condition select.bill-type,
	.condition select.bill-year-month{
		padding: 0.3rem 1rem 0.3rem .5rem;
	}
	.condition .show-date{
		display: inline-block;
		width: 6rem;
    padding: 0 .5rem;
    font-size: 1.2rem;
    height: 2.5rem;
    line-height: 2.5rem;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 6px 4px rgb(197, 219, 255);
    border: 1px dashed #4388ff;
    margin-left: 1rem;
	}
</style>