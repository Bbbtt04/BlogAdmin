import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import createRouterGuard from './router-guard'
import { constantRoutes } from './routes'
import NProgress from '@/config/nprogress'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

export function setupRouter(app: App<Element>) {
  app.use(router)
  // 创建路由守卫
  createRouterGuard(router)
}

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

export default router
