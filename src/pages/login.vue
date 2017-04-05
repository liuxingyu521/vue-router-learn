<template>
  <div class="page">
    <header>账单管家</header>
    <form id="loginForm" >
      <div class="form-item">
        <i class="iconfont icon-yonghuming"></i> 
        <input type="text" class="input-username" placeholder="请输入账户名" v-model="username"  @focus="focus" @blur="blur">
        <span class="err-tip" v-if="nameIsEmpty">请输入用户名</span>
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima"></i>
        <input type="password" class="input-password" placeholder="请输入密码" v-model="password"  @focus="focus" @blur="blur">
        <span class="err-tip" v-if="pwdIsEmpty">请输入密码</span>
      </div>
      <div class="form-item submit">
        <button class="login" @click="login">确认登录</button>
        <br>
        <router-link to="/register" >没有账号？点击注册</router-link>
      </div>
    </form>
    <toast v-model="showPositionValue" type="text" :time="1200" is-show-mask >{{ toastMessage }}</toast>
  </div>
</template>

<script>
  import $ from 'jquery';
  import axios from 'axios';
  import Toast from '../components/toast.vue';

  export default {
    data: function(){
      return {
        username: '',
        password: '',
        nameIsEmpty: false,
        pwdIsEmpty: false,
        showPositionValue: false,
        toastMessage: ''
      }
    },
    components:{
      Toast: Toast
    },
    methods: {
      login: function(e){
        // 防止默认提交表单
        e.preventDefault();

        // 表单为空，错误提示，不提交表单
        this.nameIsEmpty = !this.username ? true : false;
        this.pwdIsEmpty = !this.password ? true : false;
        if(!this.username || !this.password){
          return;
        }

        // 登录处理
        var _this = this;
        axios.post('/users/login',{
          username: this.username,
          password: this.password
        })
        .then(function(response){
          console.log(response);
          if(response.data.stateCode == 0){
            _this.$router.push('/user/' + response.data.userId + '/flow');
          }else{
            _this.toastMessage = response.data.stateDisc;
            _this.showPositionValue = true;
          }
        })
        .catch(function(error){
          console.log(error);
        });
        // console.log(this.$route)

        // this.$router.push('/register');
      },
      focus: function (e) {
        $(e.target).parent().addClass('isFocus');
        $(e.target).prev().addClass('focus');
      },
      blur: function (e) {
        $(e.target).parent().removeClass('isFocus');
        $(e.target).prev().removeClass('focus');

        // (非空判断加tip标志)
        if($(e.target).hasClass('input-username')){
          this.nameIsEmpty = !this.username ? true : false;
        }else if($(e.target).hasClass('input-password')){
          this.pwdIsEmpty = !this.password ? true : false;
        }
      }
    }
  }
</script>

<style>
  @import '../assets/css/iconfont.css';
  .page {
    background-image: url('../assets/img/loginBg.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 2rem;
    padding-bottom: 11rem;
  }
  .page header {
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
    margin-top: 1.3rem;
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
    text-indent: 2.3rem;
    font-size: .8rem;
    box-sizing: border-box;
  }
  .form-item button {
    width: 90%;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1rem;  
    border: 1px solid rgba(255,255,255,0);
    border-radius: 1.3rem;
    margin-bottom: .5rem;
  }
  .form-item button.login, .form-item button.register {
    background: #ff8737;
    color: white;
  }
  /* 字体图标的设置 */
  .icon-yonghuming:before, .icon-mima:before, .icon-mima2:before { 
    position: absolute;
    left: .5rem;
    top: .2rem;
  }
  .icon-yonghuming, .icon-mima, .icon-mima2 {
    color: #777;
    font-size: 1rem;
  }
  .icon-yonghuming.focus, .icon-mima.focus, .icon-mima2.focus {
    color: #ff8737;
  }
</style>















