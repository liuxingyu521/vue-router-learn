<template>
	<div class="notfound">
		<span @click="goBack"></span>
	</div>
</template>

<script>
	export default {
		methods: {
			goBack: function(){
				this.$router.push('flow');
			}
		}
	}
</script>

<style>
	.notfound{
		background-image: url('../assets/img/404.png');
		background-size: contain;
	}
	.notfound span{
    display: block;
    width: 9.7rem;
    height: 2.2rem;
    position: absolute;
    top: 23.8rem;
    left: 6.9rem;
    border-radius: 3rem;
	}
</style>