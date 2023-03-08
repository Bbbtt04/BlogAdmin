import { ThemeConfig, useThemeStore } from '@/store/modules/theme'
import { getDarkColor, getLightColor } from '@/utils/theme/tool'

// 初始化 theme
export const useTheme = () => {
  const themeStore = useThemeStore()
  const themeConfig:ThemeConfig = themeStore.getThemeConfig

  const changePrimaryColor = (color: string) => {
    // 修改主题色
    themeStore.setThemeConfig({ ...themeConfig, primary: color })

    document.documentElement.style.setProperty(
      '--el-color-primary',
      color,
    )
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      themeConfig.isDark
        ? `${getLightColor(color, 0.2)}`
        : `${getDarkColor(color, 0.3)}`,
    )
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
          `--el-color-primary-light-${i}`,
          themeConfig.isDark
            ? `${getDarkColor(color, i / 10)}`
            : `${getLightColor(color, i / 10)}`,
      )
    }
  }

  const initTheme = () => {
    if(!themeConfig.primary) changePrimaryColor('#009688')
    changePrimaryColor(themeConfig.primary)
  }

  return {
    initTheme,
    changePrimaryColor,
  }
}

export default useTheme
