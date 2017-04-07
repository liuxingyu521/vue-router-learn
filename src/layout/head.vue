<template>
  <div class="header">
    <slot></slot>
    <span class="userPic" v-if="showUser">
      <router-link to="homepage"><img src="../assets/img/avatar.jpg" alt="用户头像" ></router-link>
    </span>
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
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.8rem;
    color: #ff8737;
    background-color: #28394a;
  } 
  .header .userPic{
    position: absolute;
    top: 50%;
    right: .5rem;
    transform: translate(0, -1.25rem);
    line-height: 1.3rem;
    display: block;
  }
  .header .userPic a{
    display: inline-block;
  }
  .header .userPic img{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
</style>