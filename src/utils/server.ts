import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.success) {
      //  ElMessage.success(data.message)
    }
    else { ElMessage.error(data.message) }

    return data
  },
  (error) => {
    const { response } = error
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = response?.status
    switch (status) {
      case 401:
        message = '权限不足，无法访问此操作！！'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    ElMessage({
      message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default request
