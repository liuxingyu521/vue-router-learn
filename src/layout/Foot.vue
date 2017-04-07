<template>
  <div class="footer" v-if="showFooter">
    <div class="f-item">
      <router-link to="flow" active-class="f-active">
        <i class="iconfont icon-liushui"></i>
        <p>流水</p>
      </router-link>
    </div>
    <div class="f-item keepAccount">
      <router-link to="keepAccount" active-class="f-active">
        <span ><i class="iconfont icon-jiahao"></i></span>
        <p>记账</p>
      </router-link>
    </div>
    <div class="f-item">
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
      showFooter: {
        type: Boolean,
        default: true
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
    background-color: rgba(162, 162, 162, 0.25);
    border-top: 1px solid #ccc;
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
  .footer .f-item.keepAccount span .iconfont{ 
    font-size: 2rem;
    position: relative;
    top: -0.5rem;
  }
  .footer .f-item.keepAccount span + p{
    bottom: 1.6rem;
  }
</style>