<template>
  <div class="footer">
    <div class="f-item" v-show="!onlyKeepAccount">
      <router-link to="flow" active-class="f-active">
        <i class="iconfont icon-liushui"></i>
        <p>流水</p>
      </router-link>
    </div>
    <div class="f-item keepAccount" v-show="!onlyKeepAccount">
      <router-link to="keepAccount" active-class="f-active">
        <span ><i class="iconfont icon-jiahao"></i></span>
        <p>记账</p>
      </router-link>
    </div>
    <div class="f-item keepAccount onlyKeepAccount" v-show="onlyKeepAccount">
      <a href="javascript:void(0)" @click="changeFoot">
        <span ><i class="iconfont icon-jiahao"></i></span>
        <p>记账</p>
      </a>
    </div>
    <div class="f-item" v-show='!onlyKeepAccount'>
      <router-link to="statistics" active-class="f-active">
        <i class="iconfont icon-charts"></i>
        <p >图表</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      onlyKeepAccount: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      changeFoot: function(){
        this.$emit('changeFoot',{
          onlyKeepAccount: false
        });
        this.$router.push('flow');
      }
    }
  }
</script>

<style>
  .footer{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    background-color: rgb(214, 213, 213);
    border-top: 1px solid #ccc;
    z-index: 10;
  }
  .footer .f-item{
    flex: 1;
    text-align: center;
  }
  .footer .f-item a{
    display: inline-block;
    width: 100%;
    line-height: 2rem;
  }
  .footer .f-item a.f-active{
    color: #ff6600;
  }
  .footer .f-item a .icon-liushui{
    position: relative;
    top: .6rem;
    font-size: 2.2rem;
  }
  .footer .f-item a .icon-charts{
    position: relative;
    top: .45rem;
    font-size: 2.5rem;
  }
  .footer .f-item a p{
    position: relative;
    font-size: .8rem;
  }
  .footer .f-item a .icon-charts + p{
    bottom: .08rem;
  }
  .footer .f-item.keepAccount span{
    position: relative;
    display: inline-block;
    top: -1.5rem;
    background-color: #ff8737;
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    border-radius: 50%;
    font-size: 3rem;
    color: #f3f3f3;
  }
  .footer .f-item.onlyKeepAccount span{
    transform: rotate(45deg);
  }
  .footer .f-item.onlyKeepAccount span + p{
    color: #ff6600;
  }
  .footer .f-item.keepAccount span .iconfont{ 
    font-size: 2rem;
    position: relative;
    top: -0.5rem;
  }
  .footer .f-item.keepAccount span + p{
    bottom: 1.6rem;
  }
</style>