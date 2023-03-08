export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    themeConfig: {
      // 黑夜模式
      isDark: false,
      // 默认主题色
      primary: '#009688',
    },
  }),
  getters: {
    getThemeConfig(state:any):ThemeConfig {
      return state.themeConfig
    }
  },
  actions: {
    setThemeConfig(themeConfig: any) {
      this.themeConfig = themeConfig
    },
  },
})

export interface ThemeConfig {
  isDark: boolean
  primary: string
}

