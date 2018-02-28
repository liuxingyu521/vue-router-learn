<template>
	<div class="container">
		<div class="header">
			<span>记一笔</span>
			<button @click="sendBill">保存</button>
		</div>
		<div class="form">
			<div class="formItem">
				<input type="radio" name="billType" value="expend" id="expend-input" v-model="billType">
				<label for="expend-input">支出</label>
				<input type="radio" name="billType" value="income" id="income-input" v-model="billType">
				<label for="income-input">收入</label>
				<!-- 金额 -->
				<input type="number" v-model="billMoney" v-on:focus="keyboardPop" v-on:blur="keyboardLost" class="input-money">
				<span>¥</span>
			</div>
			<div class="formItem">
				<span class="head">分类:</span>
				<div class="select-class" @click="showClassSelector=true">{{ billClassDisplay }}</div>
			</div>
			<div class="formItem">
				<span class="head">时间:</span>
				<div class="select-class" @click="showDate=true">{{ billDate | dateDisplay }}</div>
			</div>
			<div class="formItem">
				<span class="head">备注:</span>
				<input type="text" class="input-comment" placeholder="...(20字以内)" v-model="billComment">
			</div>
		</div>
		<p class="tip">:）好的习惯，从记账开始哦～</p>
		<class-selector
		v-model="showClassSelector"
		:noHead="true"
		@on-confirm="changeClass"
		>
			<picker
			v-model="billClassArr"
			:data="classDatalist"
			:columns="2"
			></picker>
		</class-selector>
		<date-selector v-model="showDate"
    title="请选择日期"
		@on-confirm="setBilldate"
    >
      <div class="year-month-wrap">
        <div class="year-selector">
          <span class="sub" @click="date.year = (date.year == 1990) ? 2050 : date.year-1">-</span>
          <p v-html="date.year+'年'"></p>
          <span class="add" @click="date.year = (date.year == 2050) ? 1990 : date.year+1">+</span>
        </div>
        <div class="month-selector">
          <span class="sub" @click="date.month = (date.month == 1) ? 12 : date.month-1">-</span>
          <p v-html="date.month+'月'"></p>
          <span class="add" @click="date.month = (date.month == 12) ? 1 : date.month+1">+</span>
        </div>
        <div class="day-selector">
          <span class="sub" @click="date.day = (date.day == 1) ? dateUtil.daysInMonth(date.year, date.month) : date.day-1">-</span>
          <p v-html="date.day+'日'"></p>
          <span class="add" @click="date.day = (date.day == dateUtil.daysInMonth(date.year, date.month)) ? 1 : date.day+1">+</span>
        </div>
      </div>
    </date-selector>
	</div>
</template>

<script>
	import $ from 'jquery';
	import ClassSelector from '../../components/confirm.vue';
	import DateSelector from '../../components/confirm.vue';
	import Picker from '../../components/picker/index.vue';
	import axios from 'axios';
	var dateUtil = require('../../js/date.js');


	var dateTmp = new Date();

	export default {
		data: function(){
			return {
				date: {
					year: dateTmp.getFullYear(),
					month: dateTmp.getMonth() + 1,
					day: dateTmp.getDate()
				},
				billType: 'expend',
				billMoney: '',
				billClass: '',
				billClassName: '',
				billClassArr: [],
				billClassDisplay: '食品酒水 > 早中晚饭',
				billComment: '',
				billDate: dateTmp.getFullYear()+''+dateUtil.fillZero(dateTmp.getMonth() + 1)+''+dateUtil.fillZero(dateTmp.getDate())+''+dateUtil.fillZero(dateTmp.getHours())+''+dateUtil.fillZero(dateTmp.getMinutes())+''+dateUtil.fillZero(dateTmp.getSeconds()),
				showClassSelector: false,
				showDate: false,
				expendClassDatalist: [
					{
						name: '食品酒水',
						value: '10',
						parent: 0
					},
					{
						name: '早午晚餐',
						value: '100',
						parent: '10'
					},
					{
						name: '烟酒茶',
						value: '101',
						parent: '10'
					},
					{
						name: '水果零食',
						value: '102',
						parent: '10'
					},
					{
						name: '衣服饰品',
						value: '11',
						parent: 0
					},
					{
						name: '衣服裤子',
						value: '110',
						parent: '11'
					},
					{
						name: '鞋帽包包',
						value: '111',
						parent: '11'
					},
					{
						name: '化妆饰品',
						value: '112',
						parent: '11'
					},
					{
						name: '居家物业',
						value: '12',
						parent: 0
					},
					{
						name: '日常用品',
						value: '120',
						parent: '12'
					},
					{
						name: '水电煤气',
						value: '121',
						parent: '12'
					},
					{
						name: '房租',
						value: '122',
						parent: '12'
					},
					{
						name: '物业管理',
						value: '123',
						parent: '12'
					},
					{
						name: '行车交通',
						value: '13',
						parent: 0
					},
					{
						name: '公共交通',
						value: '130',
						parent: '13'
					},
					{
						name: '打车租车',
						value: '131',
						parent: '13'
					},
					{
						name: '私家车费用',
						value: '132',
						parent: '13'
					},
					{
						name: '交流通讯',
						value: '14',
						parent: 0
					},
					{
						name: '手机费',
						value: '140',
						parent: '14'
					},
					{
						name: '上网费',
						value: '141',
						parent: '14'
					},
					{
						name: '邮寄费',
						value: '142',
						parent: '14'
					},
					{
						name: '休闲娱乐',
						value: '15',
						parent: 0
					},
					{
						name: '运动健身',
						value: '150',
						parent: '15'
					},
					{
						name: '休闲玩乐',
						value: '151',
						parent: '15'
					},
					{
						name: '学习进修',
						value: '16',
						parent: 0
					},
					{
						name: '书报杂志',
						value: '160',
						parent: '16'
					},
					{
						name: '培训进修',
						value: '161',
						parent: '16'
					},
					{
						name: '数码装备',
						value: '162',
						parent: '16'
					},
					{
						name: '医疗保健',
						value: '17',
						parent: 0
					},
					{
						name: '药品费',
						value: '170',
						parent: '17'
					},
					{
						name: '美容费',
						value: '171',
						parent: '17'
					},
					{
						name: '金融保险',
						value: '18',
						parent: 0
					},
					{
						name: '投资亏损',
						value: '180',
						parent: '18'
					},
					{
						name: '税收',
						value: '181',
						parent: '18'
					},
					{
						name: '罚款',
						value: '182',
						parent: '18'
					},
					{
						name: '其他杂项',
						value: '19',
						parent: 0
					},
					{
						name: '其他支出',
						value: '190',
						parent: '19'
					},
				],
				incomeClassDatalist: [
					{
						name: '职业收入',
						value: '20',
						parent: 0
					},
					{
						name: '工资收入',
						value: '200',
						parent: '20'
					},
					{
						name: '利息收入',
						value: '201',
						parent: '20'
					},
					{
						name: '加班收入',
						value: '202',
						parent: '20'
					},
					{
						name: '奖金收入',
						value: '203',
						parent: '20'
					},
					{
						name: '投资收入',
						value: '204',
						parent: '20'
					},
					{
						name: '兼职收入',
						value: '205',
						parent: '20'
					},
					{
						name: '其他收入',
						value: '21',
						parent: 0
					},
					{
						name: '礼金收入',
						value: '210',
						parent: '21'
					},
					{
						name: '中奖收入',
						value: '211',
						parent: '21'
					},
					{
						name: '意外来钱',
						value: '212',
						parent: '21'
					},
					{
						name: '经营所得',
						value: '213',
						parent: '21'
					}
				],
				classDatalist: [],
				dateUtil: dateUtil
			}
		},
		mounted: function(){
			this.$emit('onlyKeepAccount',{
				onlyKeepAccount: true
			});
			this.billClassArr = ['10', '100'];
			this.billClass = '100';
			this.billClassName = '食品酒水';
			this.classDatalist = this.expendClassDatalist;
		},
		components: {
			ClassSelector: ClassSelector,
			Picker: Picker,
			DateSelector: DateSelector
		},
		methods: {
			keyboardPop: function(){
				// $('.footer').css('position', 'static');
			},
			keyboardLost: function(){
				// $('.footer').css('position', 'fixed');
			},
			changeClass: function(){
				var _this = this;
				var classStr = '',
						arrTmp = [];
				if(this.billType == 'expend'){
					arrTmp = _this.expendClassDatalist.filter(function(val, index, arr){
						return (val.value == _this.billClassArr[0] || val.value == _this.billClassArr[1])
					});

					if(arrTmp[0].parent == '0'){
						_this.billClassName = arrTmp[0].name;
						_this.billClass = arrTmp[1].value;
						classStr = arrTmp[0].name + ' > ' + arrTmp[1].name;
					}
					else{
						_this.billClassName = arrTmp[1].name;
						_this.billClass = arrTmp[0].value;
						classStr = arrTmp[1].name + ' > ' + arrTmp[0].name;
					}
					this.billClassDisplay = classStr;
				}
				else{
					arrTmp = _this.incomeClassDatalist.filter(function(val, index, arr){
						return (val.value == _this.billClassArr[0] || val.value == _this.billClassArr[1])
					});

					if(arrTmp[0].parent == '0'){
						_this.billClassName = arrTmp[0].name;
						_this.billClass = arrTmp[1].value;
						classStr = arrTmp[0].name + ' > ' + arrTmp[1].name;
					}
					else{
						_this.billClassName = arrTmp[1].name;
						_this.billClass = arrTmp[0].value;
						classStr = arrTmp[1].name + ' > ' + arrTmp[0].name;
					}
					this.billClassDisplay = classStr;
				}
			},
			setBilldate: function(){
				var dateTmp = new Date();
				this.billDate = this.date.year
												+''+dateUtil.fillZero(this.date.month)
												+''+dateUtil.fillZero(this.date.day)
												+''+dateUtil.fillZero(dateTmp.getHours())
							          +''+dateUtil.fillZero(dateTmp.getMinutes())
							          +''+dateUtil.fillZero(dateTmp.getSeconds());
				console.log(this.billDate);
			},
			sendBill: function(){
				var _this = this;
				if(this.billMoney == ''){
					this.$emit('toastMessage', {
						toastMessage: '请输入账单金额',
						isToast: true,
						position: 'center'
					});
				}
				else{
					var billObj = {};

					// 点击保存时， 更新时间
					var dateTmp = new Date();
					this.billDate = this.date.year
												+''+dateUtil.fillZero(this.date.month)
												+''+dateUtil.fillZero(this.date.day)
												+''+dateUtil.fillZero(dateTmp.getHours())
							          +''+dateUtil.fillZero(dateTmp.getMinutes())
							          +''+dateUtil.fillZero(dateTmp.getSeconds());

					billObj.id = this.billDate;
					billObj.type = this.billType;
					billObj.class = this.billClass;
					billObj.className = this.billClassName;
					billObj.money = this.billMoney;
					billObj.comment = this.billComment;

					var url = '/user/' + this.$router.currentRoute.params.id + '/storeBill';
					axios.post(url, billObj)
					.then(function(response){
						if(response.data.stateCode == '0'){
							_this.$emit('toastMessage', {
								toastMessage: response.data.stateDisc,
								isToast: true,
								position: 'center'
							});

							_this.$emit('onlyKeepAccount',{
			          onlyKeepAccount: false
			        });
			        _this.$emit('refreshBill');
							_this.$router.push('flow');
						}
						else{
							_this.$emit('toastMessage', {
								toastMessage: '保存失败，请稍后再试',
								isToast: true,
								position: 'center'
							})
						}
					})
					.catch(function(error){
	          console.log(error);
	        })
				}
			}
		},
		watch: {
			billType: function(type){
				if(type == 'expend'){
					this.classDatalist = this.expendClassDatalist;
					this.billClassArr = ['10', '100'];
					this.changeClass();
				}
				else{
					this.classDatalist = this.incomeClassDatalist;
					this.billClassArr = ['20', '200'];
					this.changeClass();
				}
			},
			// 解决日期错误显示
			date: {
				handler: function(newDate){
					if(newDate.month == 2 && (this.date.day > 29)){
						this.date.day = 1;
					}
				},
				deep: true
			}
		},
		filters: {
			dateDisplay: function(date){
				var year = date.slice(0,4),
						month = date.slice(4,6),
						day = date.slice(6,8);
				return year+'年'+month+'月'+day+'日';
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		color: #676767;
		background: #ffffda;
	}
	.container .header{
		padding: 1.2rem 1rem;
		position: relative;
		font-size: 1.5rem;
	}
	.header button{
    position: absolute;
    right: 0.8rem;
    top: 0.7rem;
    width: 3.4rem;
    height: 2.1rem;
    line-height: 2.1rem;
    border-radius: 0.2rem;
    border: 1px solid #a9a4a4;
    background: #ff8737;
    font-size: 1.1rem;
    color: white;
	}
	.container p.tip{
		padding: 2rem 5rem;
    color: #5866e4;
    font-family: cursive;
	}
	.formItem{
		font-size: 1.2rem;
		padding: 0.9rem 1rem;
		position: relative;
		height: 3.2rem;
		line-height: 3.2rem;
	}
	.formItem:last-child{
		padding-bottom: .5rem;
	}
	.formItem:after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 1rem;
		height: 2px;
		width: 90%;
		background: #bbb;
	}
	.formItem label{
		margin-right: 1.5rem;
	}
	.formItem span.head{
    display: inline-block;
    position: absolute;
    top: 0.4rem;
    left: 1.5rem;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 0.9rem;
	}
	.formItem .input-money{
    width: 5rem;
    height: 2.9rem;
    padding-right: 0.4rem;
    position: absolute;
    right: 3rem;
    top: 0.8rem;
    font-size: 2rem;
    text-align: right;
    border-radius: 0.2rem;
    border: none;
	}
	.formItem .input-money:focus,
	.formItem .input-comment:focus{
		outline: none;
	}
	.formItem .input-money + span{
		position: absolute;
    right: 1.7rem;
    top: 0.9rem;
    font-size: 1.7rem;
	}
	.formItem .input-comment{
    width: 97%;
    height: 100%;
    padding: 1.5rem 0 0 0.5rem;
    box-sizing: border-box;
    font-size: 1.2rem;
    background: #ffffda;
    border: none;
	}
	/*placeholder颜色设置*/
	.formItem input::-webkit-input-placeholder{
		color: #949494;
	}
	.formItem input::-moz-input-placeholder{
		color: #949494;
	}
	.formItem input:-moz-input-placeholder{
		color: #949494;
	}
	.formItem input:-ms-input-placeholder{
		color: #949494;
	}
	.formItem div{
		padding: 1rem 0 0 .5rem;
	}
</style>