export default [
    { path: '/', component: require('./pages/index.vue') },
    { path: '/about', component: require('./pages/About.vue') },
    { path: '/article', 
      component: require('./pages/Article.vue'),
      children: [
        { path: 'list/:num',component: require('./pages/List.vue')}
      ]
    }
]
