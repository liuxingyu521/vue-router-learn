import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// import App from './App.vue';


// 加载router插件
Vue.use(VueRouter);

// new 一个router实例
// var router = new VueRouter({
//     routes: routes,
//     mode: 'hash'
// });

// 将配置好的router实例装在vue实例中
// var app = new Vue({
//   router,
//   el: '#app',
//   render: h => h(App)
// });

const Home = {
  template: `
    <div class="home">
      <h2>Home</h2>
      <p>hello</p>
    </div>
  `
}

const Parent = {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  template: `
    <div class='parent'>
      <h2>Parent</h2>
      <transition :name='transitionName'>
        <router-view class='child-view'></router-view>
      </transition>
    </div>
  `
}

const Default = { template: '<div class="default">default</div>'};
const Foo = { template: '<div class="foo">foo</div>'};
const Bar = { template: '<div class="bar">bar</div>'};

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', component: Home},
    {
      path: '/parent', component: Parent,
      children: [
        { path: '', component: Default},
        { path: 'foo', component: Foo},
        { path: 'bar', component: Bar}
      ]
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Transitions</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  `
}).$mount('#app');








