<template>
  <div class="page">
    <header>账单管家</header>
    <form id="loginForm">
      <div class="form-item" :class="{ isFocus: isFocus}">
        <input type="text" class="input-username" placeholder="请输入账户名" v-model="username" @focus="focus" @blur="blur">
      </div>
      <div class="form-item" :class="{ isFocus: isFocus}">
        <input type="password" class="input-password" placeholder="请输入密码" v-model="password" @focus="focus" @blur="blur">
      </div>
      <div class="form-item submit">
        <button class="login" @click="login">确认登录</button>
        <br>
        <router-link to="/register" >没有账号？点击注册</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        username: '',
        password: '',
        isFocus: false
      }
    },
    methods: {
      login: function(){

      },
      focus: function () {
        this.isFocus = true;
      },
      blur: function () {
        this.isFocus = false;
      }
    }
  }
</script>

<style scoped>
  .page {
    background-image: url('../assets/img/loginBg.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 2rem;
    padding-bottom: 11rem;
  }
  header {
    height: 10rem;
    text-align: center;
    line-height: 10rem;
    font-size: 2.5rem;
  }
  #loginForm {
    width: 15rem;
    margin: 0 auto;
    text-align: center;
  }
  .form-item {
    margin-top: 1rem;
    position: relative;
  }
  .form-item:not(.submit):before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;  
    width: 1px;
    height: .5rem;
    background: #777;
  }
  .form-item:not(.submit):after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;  
    width: 1px;
    height: .5rem;
    background: #777;
  }
  .form-item.isFocus:before, .form-item.isFocus:after {
    background-color: #ff8737;
  }
  .form-item input:focus {
    outline: none;
    border-bottom: 1px solid #ff8737;
  }
  .form-item.submit {
    margin-top: 2rem;
  }
  .form-item.submit a{
    display: inline-block;
    margin-top: .5rem;
    font-size: .7rem;
    border-bottom: 1px solid #ccc;
  }
  .form-item.submit a:link {
    color: #666;
  }
  .input-username, .input-password {
    width: 100%;
    height: 2rem;
    background: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px solid #777;
    text-indent: 2rem;
    font-size: .8rem;
    box-sizing: border-box;
  }
  button.login {
    width: 90%;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1rem;
    color: white;
    border: 1px solid rgba(255,255,255,0);
    background: #ff8737;
    border-radius: 1.3rem;
  }
</style>















