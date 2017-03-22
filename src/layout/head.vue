<template>
  <div class="header">
    <ul class="nav">
      <li><router-link to='/' exact>首页</router-link></li>
      <li><router-link to='/article'>文章</router-link></li>
      <li><router-link to='/about'>关于</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'lala'
      }
    }
  }
</script>

<style>
  .header{
    padding: 5px 10px;
    background-color: #81d0c1;
  }
  ul.nav li{
    list-style: none;
    display: inline-block;
  }
  ul.nav li a{
    padding: 3px 5px;
    border: 1px solid #66bd95;
    border-radius: 5px;
    color: #653a2c;
  }

</style>