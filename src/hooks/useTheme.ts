import { useThemeStore} from '@/store/modules/theme'
import { getDarkColor, getLightColor } from '@/utils/theme/tool'

// 初始化 theme
export const useTheme = () => {
  const globalStore = useThemeStore()
  const themeConfig = computed(() => globalStore.themeConfig)

  const changePrimaryColor = (color: string) => {
    // 修改主题色
    globalStore.setThemeConfig({ ...themeConfig, primary: color })

    document.documentElement.style.setProperty(
      '--el-color-primary',
      themeConfig.value.primary,
    )
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      themeConfig.value.isDark
        ? `${getLightColor(themeConfig.value.primary, 0.2)}`
        : `${getDarkColor(themeConfig.value.primary, 0.3)}`,
    )
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
          `--el-color-primary-light-${i}`,
          themeConfig.value.isDark
            ? `${getDarkColor(themeConfig.value.primary, i / 10)}`
            : `${getLightColor(themeConfig.value.primary, i / 10)}`,
      )
    }
  }

  const initTheme = () => {
    changePrimaryColor(themeConfig.value.primary)
  }

  return {
    initTheme,
    changePrimaryColor,
  }
}

export default useTheme
