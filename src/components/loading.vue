<template>
  <div class="weui-loading_toast" v-show="show">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast" :style="{ position: position }">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">{{ text || 'loading' }}<slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: String,
    position: String
  },
  created: function() {
    this.show = this.value
  },
  data: function() {
    return {
      show: false
    }
  },
  watch: {
    value: function(val) {
      this.show = val
    },
    show: function(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/weui/widget/weui_tips/weui_mask';
@import '../assets/css/weui/widget/weui_tips/weui_toast';
@import '../assets/css/weui/widget/weui-loading/weui-loading.less';

.weui-icon_toast.weui-loading {
  margin: 30px 0 0;
  width: 38px;
  height: 38px;
  vertical-align: baseline;
  display: inline-block;
}
.weui-loading_toast .weui-mask_transparent{
  background-color: #da9136;
  opacity: .1;
}
.weui-loading_toast .weui-toast{
  padding: .6rem;
}
</style>
