<template>
  <div class="container">
    welcome to user space!
  </div>
</template>

<script>
  export default {
    data: function(){
      return {};
    },
    created: function(){
      this.$emit('loading', {
        isLoading: true,
        loadingText: '正在初始化数据..'
      });
    }
  }
</script>