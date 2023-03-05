import type { RouteRecordRaw } from 'vue-router'
import { store } from '..'
import { asyncRoutes } from '@/router/routes'

function filterRoutes(roles: string[], routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children)
        tmp.children = filterRoutes(roles, tmp.children)
      res.push(tmp)
    }
  })
  return res
}

function hasPermission(roles: string[], route: any): boolean {
  if (!route?.meta?.roles)
    return true
  const res = route.meta.roles.some((role: string) => roles.includes(role))
  if (res)
    return true
  return false
}

export const useAsyncRoute = defineStore('asyncRoute', {
  state: () => ({
    addRouters: [] as RouteRecordRaw[], // 动态路由
    dynamicAddedFlag: false, // 是否已经添加过动态路由
  }),
  getters: {
    getAddRouters(): RouteRecordRaw[] {
      return this.addRouters
    },
  },
  actions: {
    setAddRouters(routers: RouteRecordRaw[]): void {
      this.addRouters = routers
    },
    setDynamicAddedFlag(flag: boolean): void {
      this.dynamicAddedFlag = flag
    },
    GenerateRoutes(data: any): RouteRecordRaw[] {
      let accessedRoutes: RouteRecordRaw[] = []
      // 从后端获取路由
      accessedRoutes = filterRoutes(data.roles, asyncRoutes)
      console.log('accessedRoutes', accessedRoutes)

      return accessedRoutes
    },
  },
})

export function useAsyncRouteWithOut() {
  return useAsyncRoute(store)
}
