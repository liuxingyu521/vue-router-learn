<template>
	<div class="container">
		<div class="header">
			<span>记一笔</span>
			<button>保存</button>
		</div>
		<div class="form">
			<div class="formItem">
				<input type="radio" name="billType" value="expend" id="expend-input" v-model="billType">
				<label for="expend-input">支出</label>
				<input type="radio" name="billType" value="income" id="income-input" v-model="billType">
				<label for="income-input">收入</label>
				<!-- 金额 -->
				<input type="number" v-model="billMoney">
			</div>
			<div class="formItem"></div>
			<div class="formItem"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				billType: 'expend',
				billMoney: ''
			}
		},
		mounted: function(){
			this.$emit('onlyKeepAccount',{
				onlyKeepAccount: true
			})
		}
	}
</script>

<style scoped>
	.container{
		color: #676767;
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
	.formItem{
		font-size: 1.2rem;
		padding: 1.2rem 1rem;
		position: relative;
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
</style>