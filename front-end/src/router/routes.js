import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import UserInvite from '../components/UserInvite.vue'
import ListUserRoles from '../components/ListUserRoles.vue'

import Login from '../components/Login'
import auth from '../auth/AuthService.js'
import LoginCallback from '../components/LoginCallback'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login-callback',
      name: 'LoginCallback',
      component: LoginCallback,
      meta: { requiresAuth: false }
    },
    {
      path: '/user-invite',
      name: 'UserInvite',
      component: UserInvite
    },
    {
      path: '/list-user-roles',
      name: 'ListUserRoles',
      component: ListUserRoles
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // always defaults to true except when to.meta.requiresAuth is explicitly false
  const requiresAuth = to.meta.requiresAuth !== false

  if (requiresAuth) {
    if (auth.isAuthenticated()) {
      next()
    } else {
      const redirect = to.meta.redirect || '/login'
      next(redirect)
    }
  } else {
    next()
  }
})

export default router
