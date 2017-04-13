<template>
  <div class="vux-timeline">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    color: String,
    isShowIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setChildProps () {
      if (!this.$children) return
      const len = this.$children.length
      this.$children.forEach((child, index) => {
        child.isLast = index === len - 1
        child.isFirst = index === 0
      })
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/variable.less';

.vux-timeline {
  padding: 0rem 1rem 6rem 1.5rem;
  height: 12rem;
  overflow-y: auto;
}

.vux-timeline > ul > li {
  list-style: none;
}

.vux-timeline-item {
  position:relative;
  box-sizing: border-box;
  font-size: .8rem; 
  border-width: 1px 1px 0 0;
  border-style: solid;
  border-color: @timeline-item-bg-color;
}

.vux-timeline-item:last-child{
  border-bottom: 1px solid @timeline-item-bg-color;
}

.vux-timeline-item-content {
  padding: 0.5rem 0.3rem 0.5rem 2rem;
}

.vux-timeline-item-head,
.vux-timeline-item-head-first {
  position:absolute;
  content:'';
  // z-index:99;
  border-radius:99px;
}

.vux-timeline > ul > li.vux-timeline-item >.vux-timeline-item-head {
  width: 2.7rem;
  height: 2.7rem;
  left: -1.3rem;
  top: 0.6rem;
  text-align: center;
  line-height: 2.7rem;
  font-size: 1.5rem;
  z-index: 1;
}

.vux-timeline-item-head-first {
  width: 2.7rem;
  height: 2.7rem;
  left: -1.3rem;
  top: 0.6rem;
  text-align: center;
  line-height: 2.7rem;
  font-size: 1.5rem;
  z-index: 1;
}

.vux-timeline-item-tail {
  position:absolute;
  content:'';
  height:100%;
  width:2px;
  left:0px;
  top:0px;
  background-color: @timeline-item-bg-color;
}


.vux-timeline-item-color {
  background-color: @timeline-item-bg-color;
}
</style>
