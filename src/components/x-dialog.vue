<template>
  <div class="vux-x-dialog fix_ios_fixed" @touchmove="onTouchMove">
    <transition :name="maskTransition">
      <div class="weui-mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
    </transition>
    <input style="display:none" v-model="currentValue">
    <transition :name="dialogTransition">
      <div class="weui-dialog" v-show="currentValue" >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-mask'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    hideOnBlur: Boolean,
    scroll: {
      type: Boolean,
      default: true
    }
  },
  created: function() {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
  },
  watch: {
    value: function(val) {
      this.currentValue = val
    },
    currentValue: function(val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    }
  },
  data: function() {
    return {
      currentValue: false
    }
  },
  methods: {
    onTouchMove: function (event) {
      !this.scroll && event.preventDefault()
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/transition.less';
@import '../assets/css/weui/widget/weui_tips/weui_mask';
@import '../assets/css/weui/widget/weui_tips/weui_dialog';
</style>
