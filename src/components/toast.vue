<template>
  <div class="vux-toast">
    <div class="weui-mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="currentTransition">
      <div class="weui-toast" :style="{width: width}" :class="toastClass" v-show="show">
        <i class="weui-icon-success-no-circle weui-icon_toast" v-show="type !== 'text'"></i>
        <p class="weui-toast__content" v-if="text" :style="style" v-html="text"></p>
        <p class="weui-toast__content" v-else :style="style"><slot></slot></p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'success'
    },
    transition: String,
    width: {
      type: String,
      default: '7.6em'
    },
    isShowMask: {
      type: Boolean,
      default: false
    },
    text: String,
    position: String
  },
  data: function() {
    return {
      show: false
    }
  },
  created: function() {
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    currentTransition: function() {
      if (this.transition) {
        return this.transition
      }
      if (this.position === 'top') {
        return 'vux-slide-from-top'
      }
      if (this.position === 'bottom') {
        return 'vux-slide-from-bottom'
      }
      return 'vux-fade'
    },
    toastClass: function() {
      return {
        'weui-toast_forbidden': this.type === 'warn',
        'weui-toast_cancel': this.type === 'cancel',
        'weui-toast_success': this.type === 'success',
        'weui-toast_text': this.type === 'text',
        'vux-toast-top': this.position === 'top',
        'vux-toast-bottom': this.position === 'bottom',
        'vux-toast-middle': this.position === 'middle'
      }
    },
    style: function() {
      if (this.type === 'text' && this.width === 'auto') {
        return { padding: '10px' }
      }
    }
  },
  watch: {
    show: function(val) {
      if (val) {
        var _this = this;
        _this.$emit('input', true)
        _this.$emit('on-show')
        clearTimeout(_this.timeout)
        this.timeout = setTimeout(function(){
          _this.show = false
          _this.$emit('input', false)
          _this.$emit('on-hide')
        }, _this.time)
      }
    },
    value: function(val) {
      this.show = val
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/transition.less';
@import '../assets/css/weui/icon/weui_icon_font';

.weui-toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.weui-toast_forbidden {
  color: #F76260;
}
.weui-toast.weui-toast_text{
  min-height: 0;
}
.weui-toast.vux-toast-top {
  top: 2rem;
}
.weui-toast.vux-toast-bottom {
  top: auto;
  bottom: 2rem;
  transform: translateX(-50%);
}
.weui-toast.vux-toast-middle {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.vux-slide-from-top-enter, .vux-slide-from-top-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%)!important;
}
.vux-slide-from-bottom-enter, .vux-slide-from-bottom-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(100%)!important;
}
.vux-slide-from-top-enter-active,
.vux-slide-from-top-leave-active,
.vux-slide-from-bottom-enter-active,
.vux-slide-from-bottom-leave-active {
  transition: all 400ms cubic-bezier(.36,.66,.04,1);
}
.weui-toast_text .weui-toast__content {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
}
.weui-loading_toast .weui-toast__content {
  margin-top: 0;
}
.weui-toast_success .weui-icon_toast:before {
  content: "\EA08";
}
.weui-toast_cancel .weui-icon_toast:before {
  content: "\EA0D";
}
.weui-toast_forbidden .weui-icon_toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
