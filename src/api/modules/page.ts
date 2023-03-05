import request from "@/utils/server"

export const createPage = (data: any) => {
  return request({
    url:'/page',
    method:'post',
    data
  })
}

export const getPageList = (query?:any) => {
  return request({
    url:'/page',
    method:'get',
    params:query
  })
}

export const getPage = (id: any) => {
  return request({
    url: `/page/${id}`,
    method:'get',
  })
}

export const updatePage = (data: any) => {
  return request({
    url: `/page/${data.id}`,
    method:'patch'
  })
}

export const deletePage = (id: string) => {
  return request({
    url: `/page/${id}`,
    method:'delete',
  })
}

export const updateView = (id: string) => {
  return request({
    url:`/page/${id}/views`,
    method: 'post'
  })
}
