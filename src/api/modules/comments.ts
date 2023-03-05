import request from "@/utils/server";

export function createComment(data: any) {
  return request({
    url: '/comments',
    method: 'post',
    data,
  })
}

export function getcomments(params?: any) {
  return request({
    url: '/comments',
    method: 'get',
    params,
  })
}

export function deleteComment(id: string) {
  return request({
    url: `/comments/${id}`,
    method: 'delete',
  })
}

export function updateComment(data: any) {
  return request({
    url: `/comments/${data.id}`,
    method: 'patch',
    data,
  })
}

export function getCommentDetail(id: string) {
  return request({
    url: `/comments/${id}`,
    method: 'get',
  })
}
