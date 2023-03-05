import request from "@/utils/server";

/**
 * @description: 获取日志列表
 * @param {any} params
 * @return {*}
 */
export const getLogList = (params?: any) => {
  return request({
    url: '/logs',
    method: 'get',
    params,
  })
}
/**
 * @description: 删除日志
 * @return {*}
 */
export const deleteLog = (id: string) => {
  return request({
    url:`/logs/${id}`,
    method:'delete'
  })
}

/**
 * @description: 更新日志
 * @param {string} id
 * @param {any} data
 * @return {*}
 */
export const updateLog = (id: string , data: any) => {
  return request({
    url: `/logs/${id}`,
    method:'patch',
    data
  })
}

export const getLog = (id: string) => {
  return request({
    url:`/logs/${id}`,
    method:'get'
  })
}

export const createLog = (data: any) => {
  return request({
    url:'/logs',
    method:'post',
    data
  })
}
