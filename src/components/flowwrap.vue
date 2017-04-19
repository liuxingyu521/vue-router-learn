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

<style lang="less">
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


.flow-item-content {
  padding: 0.3rem 0.3rem 0.3rem 2rem;
}

.flow-item-head{
  position:absolute;
  content:'';
  // z-index:99;
  border-radius:99px;
  background-color: @timeline-item-bg-color;
}

.flow-wrap > ul > li.flow-item > .flow-item-head {
  width: 2.7rem;
  height: 2.7rem;
  left: -1.3rem;
  top: 0.6rem;
  text-align: center;
  line-height: 2.7rem;
  font-size: 1.5rem;
  z-index: 1;
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


.flow-item-color {
  background-color: @timeline-item-bg-color;
}
</style>
