import request from "@/utils/server";

/**
 * @description: 获取友联列表
 * @param {any} params
 * @return {*}
 */
export const getLinkList = (params?: any) => {
  return request({
    url: '/links',
    method: 'get',
    params,
  })
}
/**
 * @description: 删除友联
 * @return {*}
 */
export const deleteLink = (id: string) => {
  return request({
    url:`/links/${id}`,
    method:'delete'
  })
}

/**
 * @description: 更新友联
 * @param {string} id
 * @param {any} data
 * @return {*}
 */
export const updateLink = (id: string , data: any) => {
  return request({
    url: `/links/${id}`,
    method:'patch',
    data
  })
}

export const createLink = (data: any) => {
  return request({
    url: `/links`,
    method:'post',
    data
  })
}

export const getLink = (id: string) => {
  return request({
    url:`/links/${id}`,
    method: 'get',
  })
}
