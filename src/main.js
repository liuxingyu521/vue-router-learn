import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App.vue'


// 加载router插件
Vue.use(VueRouter);

// new 一个router实例
var router = new VueRouter({
    routes: routes,
    mode: 'hash'
});

// 将配置好的router实例装在vue实例中
var app = new Vue({
  router,
  el: '#app',
  render: h => h(App)
});










