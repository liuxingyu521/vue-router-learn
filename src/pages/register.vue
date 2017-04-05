<template>
  <div class="page">
    <header>账单管家</header>
    <form id="loginForm">
      <div class="form-item">
        <i class="iconfont icon-yonghuming"></i> 
        <input type="text" class="input-username" placeholder="请输入账户名" v-model="username" @focus="focus" @blur="blur">
        <span class="err-tip" v-if="nameIsEmpty">用户名不能为空</span>
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima"></i>
        <input type="password" class="input-password" placeholder="请输入密码" v-model="password" @focus="focus" @blur="blur">
        <span class="err-tip" v-if="pwdIsEmpty">密码不能为空</span>
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima"></i>
        <input type="password" class="input-password" placeholder="请再次输入密码" v-model="password2" @focus="focus" @blur="blur">
        <span class="err-tip" v-if="errTip">密码输入不一致，请重试</span>
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
  import axios from 'axios';

  export default {
    data: function(){
      return {
        username: '',
        password: '',
        password2: '',
        errTip: false,
        nameIsEmpty: false,
        pwdIsEmpty: false
      }
    },
    methods: {
      login: function(e){
        e.preventDefault();
        this.$router.push('/login');
      },
      register: function(e){
        e.preventDefault();
        // 表单为空，错误提示，不提交表单
        this.nameIsEmpty = !this.username ? true : false;
        this.pwdIsEmpty = !this.password ? true : false;
        if(this.errTip){
          return;
        }else{
          this.errTip = (!this.password2 && this.password) ? true : false;
        }
        if(!this.username || !this.password || !this.password2 || (this.password !== this.password2)){
          return;
        }

        axios.post('/users/register',{
          username: this.username,
          password: this.password
        })
        .then(function(res){

        })
        .catch(function(err){
          console.log(err);
        })

        // this.$router.push('/login');
      },
      focus: function (e) {
        $(e.target).parent().addClass('isFocus');
        $(e.target).prev().addClass('focus');

      },
      blur: function (e) {
        $(e.target).parent().removeClass('isFocus');
        $(e.target).prev().removeClass('focus');

        // (非空判断加tip标志)对用户名做处理，...只允许数字字母下划线(后期优化在加吧，要加tip条)
        if($(e.target).hasClass('input-username')){
          this.nameIsEmpty = !this.username ? true : false;
        }else if($(e.target).hasClass('input-password')){
          this.pwdIsEmpty = !this.password ? true : false;
        }

        if(this.password && this.password2 && (this.password !== this.password2)){
          this.errTip = true;
        }else{
          this.errTip = false;
        }

      }
    }
  }
</script>

<style>
  .form-item .err-tip {
    position: absolute;
    top: 100%;
    right: 0;
    font-size: .7rem;
    color: red; 
  }
</style>












