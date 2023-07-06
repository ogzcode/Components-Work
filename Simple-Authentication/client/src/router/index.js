import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      name: 'Home',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      name: 'Login',
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import('@/views/NotFound.vue'),
      name: 'NotFound',
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.verifyAuth()

  if (to.meta.requiresAuth && authStore.isAuthenticated) {
    next();
  }
  else if (!to.meta.requiresAuth && authStore.isAuthenticated) {
    if (to.path === "/login") {
      next({ name: 'Home' })
    }
  }
  else {
    if (to.path !== "/login") {
      next({ name: 'Login' })
    }
    else {
      next()
    }
  }
})

export { router }
