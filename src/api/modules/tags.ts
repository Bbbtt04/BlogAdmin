import request from '@/utils/server'

export function getTagList() {
  return request({
    url: '/tag',
    method: 'get',
  })
}

export function getTag(id: number) {
  return request({
    url: `/tag/${id}`,
    method: 'get',
  })
}

export function updateTag(data: any) {
  const { id } = data

  return request({
    url: `/tag/${id}`,
    method: 'patch',
    data,
  })
}

export function createTag(data: { name: string }) {
  return request({
    url: '/tag',
    method: 'post',
    data,
  })
}

export function deleteTag(data: any) {
  return request({
    url: `/tag/${data.id}`,
    method: 'delete',
  })
}

export function getRelation() {
  return request({
    url: '/tag/relation',
    method: 'get'
  })
}
