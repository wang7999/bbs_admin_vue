import { RouteRecordRaw } from 'vue-router'
import router from './router'
import store from './store'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token

  if (token) {
    console.log(to)
    if (to.path === '/login') {
      next('/')
    } else {
      if (store.getters.menu.length === 0) {
        try {
          await store.dispatch('getUserInfo')
          const _routes = await store.dispatch('getPermissions')
          // 动态添加可访问路由
          _routes.forEach((route: any) => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          // hack方法 确保addRoutes已完成 ,设置replace: true，以便导航不会留下历史记录
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
