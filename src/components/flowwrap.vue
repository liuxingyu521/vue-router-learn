<template>
  <div class="flow-wrap">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    
  }
}
</script>

<style lang='less'>
  @import '../assets/css/variable.less';

  .flow-wrap {
    padding: 0rem 1rem 6rem 1.5rem;
    height: 12rem;
    overflow-y: auto;
  }

  .flow-wrap ul li {
    list-style: none;
  }

  .flow-item {
    position:relative;
    box-sizing: border-box;
    font-size: .8rem; 
    border-width: 1px 1px 0 0;
    border-style: solid;
    border-color: @timeline-item-bg-color;
    background-color: #e4eff1;
  }

  .flow-item ul{
    display: none;
  }

  .flow-item .flow-item{
    border-right: none;
    background-color: #f7f7f7;
  }

  .flow-item-content {
    padding: 0.3rem 0.3rem 0.3rem 2.5rem;
  }

  .flow-item-day .flow-item-content{
    padding: 0 0 0 2rem;
  }

  .flow-item-head{
    position:absolute;
    text-align: center;
    z-index: 1;
  }

  .flow-item-month .flow-item-head{
    top: 0.8rem;
    left: -1.3rem;
    border-radius: 0.2rem;
    width: 3rem;
    height: 2.1rem;
    line-height: 2.2rem;
    font-size: 1.3rem;
    color: #3143e2;
    background-color: #fbb93f;
  }

  .flow-item-day .flow-item-head{
    width: 2rem;
    height: 2rem;
    left: -1rem;
    top: 0.5rem;  
    line-height: 2.2rem;
    font-size: 1.2rem;
    border-radius: 50%;
    color: white;
    background-color: @timeline-item-bg-color;
  }

  .flow-item-tail {
    position:absolute;
    content:'';
    height:100%;
    width:2px;
    left:0px;
    top:0px;
    background-color: @timeline-item-bg-color;
  }
  .flow-item.flow-item-last{
    border-bottom: 1px solid @timeline-item-bg-color;
  }

  .flow-item-content .remain{
    position: absolute;
    right: 0.5rem;
    top: 2rem;
    transform: translateY(-0.8rem);
    font-size: 1.1rem;
  }
  .flow-item-content .money{
    position: absolute;
    right: 0.5rem;
    top: 1.7rem;
    transform: translateY(-0.8rem);
    font-size: 1rem;
  }
  .flow-item-content .bill-item{
    position: relative;
  }
  .flow-item-content .bill-item:after{
    content: '';
    position: absolute;
    right: 0;
    height: 1px;
    width: 20.9rem;
    background: #04be02;
  }
</style>
