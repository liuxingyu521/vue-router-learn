<template>
  <li :class="['flow-item', {'flow-item-last': isLast}]">
    <div :class="['flow-item-head', {'flow-item-month': isMonthItem}, {'flow-item-day': isDayItem}]" >
      <span >{{ headNumber }}</span>
    </div>
    <div class="flow-item-tail"></div>
    <div class="flow-item-content">
      <slot></slot>
    </div>
    <slot name="dayFlow"></slot>
  </li>
</template>

<script>

export default {
  props: ['isMonthItem', 'isDayItem', 'headNumber', 'isLast'],
  data () {
    return {

    }
  }
}
</script>

