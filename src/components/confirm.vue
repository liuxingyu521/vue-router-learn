<template>
  <x-dialog
  v-model="showValue"
  :mask-transition="maskTransition"
  :dialog-transition="dialogTransition"
  :hide-on-blur="hideOnBlur"
  @on-hide="$emit('on-hide')"
  @on-show="$emit('on-show')">
    <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
    <div class="weui-dialog__bd"><slot></slot></div>
    <div class="weui-dialog__ft">
      <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="onCancel">{{cancelText || '取消'}}</a>
      <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="onConfirm">{{confirmText || '确认'}}</a>
    </div>
  </x-dialog>
</template>

<script>
import XDialog from './x-dialog.vue'
export default {
  components: {
    XDialog: XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    title: String,
    confirmText: String,
    cancelText: String,
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  created: function() {
    this.showValue = this.show
    if (this.value) {
      this.showValue = this.value
    }
  },
  watch: {
    value: function(val) {
      this.showValue = val
    },
    showValue: function(val) {
      this.$emit('input', val)
    }
  },
  data: function() {
    return {
      showValue: false
    }
  },
  methods: {
    onConfirm: function() {
      this.showValue = false
      this.$emit('on-confirm')
    },
    onCancel: function() {
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>

