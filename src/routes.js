export default [
    { path: '/', component: require('./pages/login.vue'), redirect: '/login' },
    { path: '/user/:id', component: require('./pages/userMain.vue'),
      children: [
        { path: 'flow', name: 'flow', component: require('./pages/subPage/flow.vue')},
        { path: 'statistics', name: 'statistics', component: require('./pages/subPage/statistics.vue'), redirect: 'pieChart'}
      ]
    }
]
