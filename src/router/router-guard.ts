import type { Router } from 'vue-router'
import storage from '@/utils/storage'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useAsyncRouteWithOut } from '@/store/modules/asyncRoute'
import { ACCESS_TOKEN } from '@/utils/contants'

const WHITE_LIST = ['/login', '/register']

const userStore = useUserStoreWithOut()
const asyncRouteStore = useAsyncRouteWithOut()

const createRouterGuard = (router: Router) => {
  router.beforeEach((to) => {
    if (WHITE_LIST.includes(to.path))
      return true

    // 如果没有token，跳转到登录页
    const token = storage.get(ACCESS_TOKEN)

    if (!token) {
      return {
        path: '/login',
        query: {
          redirect: to.path,
        },
      }
    }

    if (asyncRouteStore.dynamicAddedFlag)
      return true

    const userInfo = userStore.GetInfo()
    const asyncRoutes = asyncRouteStore.GenerateRoutes(userInfo.roles)
    asyncRoutes.forEach((route) => {
      router.addRoute(route)
    })

    asyncRouteStore.setDynamicAddedFlag(true)
    return { ...to, replace: true }
  })
}

export default createRouterGuard
