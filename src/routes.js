export default [
    { path: '/', redirect: '/login' },
    {
      path: '/user/:id', component: require('./pages/userMain.vue'),
      children: [
          { path: 'flow', name: 'flow', component: require('./pages/subPage/flow.vue')},
          { path: 'statistics', name: 'statistics', component: require('./pages/subPage/statistics.vue')},
          { path: 'keepAccount', name: 'keepAccount', component: require('./pages/subPage/keepAccount.vue')},
          { path: 'homepage', name: 'homepage', component: require('./pages/subPage/homepage.vue')},
          { path: 'editProfile', name: 'editProfile', component: require('./pages/subPage/editProfile.vue')}
      ]
    },
    { path: '/login', name: 'login', component: require('./pages/login.vue')},
    { path: '/register', name: 'register', component: require('./pages/register.vue')},
    { path: '*', name: '404NotFound', component: require('./pages/404.vue')}
]