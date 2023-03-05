import type { App } from 'vue'

const store = createPinia()

export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () => ({
    themeConfig: {
      // 黑夜模式
      isDark: false,
      // 折叠菜单
      isCollapse: false,
      // 默认主题色
      primary: '#009688',
    },
  }),
  actions: {
    setThemeConfig(themeConfig: any) {
      this.themeConfig = themeConfig
    },
  },
})

export function setupStore(app: App) {
  app.use(store)
}

export { store }
