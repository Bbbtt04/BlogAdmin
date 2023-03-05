import { ElMessageBox } from 'element-plus'

export const useHandleData = (
  api: (params: any, other?: any) => Promise<any>,
  message: string,
  params?: any,
) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }).then(async () => {
      const res = await api(params)

      if (!res.success)
        return reject()
      ElMessage({
        message: `${message}成功`,
        type: 'success',
      })
      resolve(true)
    }).catch(() => {
      return reject()
    })
  })
}
