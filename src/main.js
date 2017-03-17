import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './layout/App.vue';

// 加载router插件
Vue.use(VueRouter);

// 定义静态组件
const Home = { template: '<div>Welcome to home page.</div>' };
const About = { template: '<div>this is about page.</div>' };
const User = { template: '<div>username is {{ $route.params.username }}</div>'}

// 路由实例配置信息
var routes = [
    { path: '/home', component: Home },
    { path: '/about', component: About },
    { path: '/user/:username', component: User }
]

var router = new VueRouter({
    routes: routes
});

var app = new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})
