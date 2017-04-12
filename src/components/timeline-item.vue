<template>
  <li class="vux-timeline-item">
    <div :class="['vux-timeline-item-color', {'vux-timeline-item-head': !isFirst,'vux-timeline-item-head-first': isFirst }]" :style="headStyle">
      <span >12</span>
    </div>
    <div class="vux-timeline-item-tail" :style="tailStyle"></div>
    <div class="vux-timeline-item-content">
      <slot></slot>
    </div>
  </li>
</template>

<script>

export default {
  data () {
    return {
      isLast: true,
      isFirst: true,
      headStyle: { backgroundColor: this.$parent.color }
    }
  },
  mounted () {
    this.$parent.setChildProps()
  },
  beforeDestroy () {
    // this will be null
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.setChildProps()
    })
  },
  computed: {
    tailStyle () {
      return this.isLast ? { display: 'block', backgroundColor: this.$parent.color } : { display: 'block', backgroundColor: this.$parent.color }
    }
  }
}
</script>

