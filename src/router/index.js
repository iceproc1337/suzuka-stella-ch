let { createRouter, createWebHistory } = VueRouter;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeViewEn.vue')
    },
    {
      path: '/en',
      name: 'home-en',
      component: () => import('../views/HomeViewEn.vue')
    },
    {
      path: '/ja',
      name: 'home-ja',
      component: () => import('../views/HomeViewJa.vue')
    },
    {
      path: '/live',
      name: 'live',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LiveView.vue')
    }
  ]
})

export default router
