<template>
  <div class="vux-masker-box">
    <slot></slot>
    <div class="vux-masker" :style="style">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
function toRGB (color) {
  let num = parseInt(color, 16)
  return [num >> 16, num >> 8 & 255, num & 255]
}

function toHex (red, green, blue) {
  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1)
}

export default {
  props: {
    color: {
      type: String,
      default: '0, 0, 0'
    },
    opacity: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    style () {
      let color = /,/.test(this.color) ? this.color : toRGB(this.color.replace('#', '')).join(',')
      return {
        backgroundColor: `rgba(${color},${this.opacity})`
      }
    }
  }
}
</script>

<style>
.vux-masker-box {
  position: relative;
}
.vux-masker {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
}
</style>