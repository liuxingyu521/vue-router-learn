<template>
  <div class="page">
    <header>账单管家</header>
    <form id="loginForm">
      <div class="form-item">
        <i class="iconfont icon-yonghuming"></i> 
        <input type="text" class="input-username" placeholder="请输入账户名" v-model="username" @focus="focus" @blur="blur">
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima"></i>
        <input type="password" class="input-password" placeholder="请输入密码" v-model="password" @focus="focus" @blur="blur">
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima"></i>
        <input type="password" class="input-password" placeholder="请再次输入密码" v-model="password2" @focus="focus" @blur="blur">
      </div>
      <div class="form-item submit">
        <button class="register" @click="register">立即注册</button>
        <button @click="login">返回登录</button>
      </div>
    </form>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    data: function(){
      return {
        username: '',
        password: '',
        password2: ''
      }
    },
    methods: {
      login: function(){
        this.$router.push('login');
      },
      register: function(){

      },
      focus: function (e) {
        $(e.target).parent().addClass('isFocus');
        $(e.target).prev().addClass('focus');
      },
      blur: function (e) {
        $(e.target).parent().removeClass('isFocus');
        $(e.target).prev().removeClass('focus');
      }
    }
  }
</script>

<style scoped>
  
</style>












