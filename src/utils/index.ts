import dayjs from 'dayjs'
import router from '@/router'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

// 路由跳转
export const go = (path: string) => {
  router.replace({ path })
}
/* time */
export function formatTime(time: any) {
  return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
}
