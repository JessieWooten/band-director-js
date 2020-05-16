import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Session from './views/Session.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/session',
      name: 'session',
      component: Session
    },
    {
      path: '*',
      name: 'home',
      component: Home
    },
  ]
})
