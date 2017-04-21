<template>
  <li :class="['flow-item', {'flow-item-month': isMonthItem}, {'flow-item-day': !isMonthItem}, {'flow-item-last': isLast}]"
  @click.native="clickMonth"
  >
    <div :class="['flow-item-head']" >
      <span >{{ headText }}</span>
    </div>
    <div class="flow-item-tail"></div>
    <div class="flow-item-content" @click="clickMonth">
      <slot></slot>
    </div>
    <slot name="dayFlow"></slot>
  </li>
</template>

<script>
import $ from 'jquery';

export default {
  props: ['isMonthItem', 'headText', 'isLast'],
  data: function() {
    return {

    }
  },
  methods: {
    clickMonth: function(e){
      if($(e.target).parent().hasClass('flow-item-month')){
        this.$emit("slideUl", $(e.target).parent());
      }
      else if($(e.target).parent().parent().hasClass('flow-item-month')){
        this.$emit("slideUl", $(e.target).parent().parent());
      }
    }
  }
}
</script>

