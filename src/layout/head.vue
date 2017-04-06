<template>
  <div class="header">
    <slot></slot>
    <span class="userPic" v-if="showUser"></span>
  </div>
</template>

<script>
  export default {
    props: {
      showUser: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    
    height: 3rem;
    line-height: 3rem;
    text-align: center;
  } 
</style>