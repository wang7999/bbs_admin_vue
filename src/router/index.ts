import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login/index.vue') // 建议进行路由懒加载，优化访问性能
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
