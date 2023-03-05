import request from '@/utils/server'

export function getCategoryList() {
  return request({
    url: '/category',
    method: 'get',
  })
}

export function getCategory(id: number) {
  return request({
    url: `/category/${id}`,
    method: 'get',
  })
}

export function updateCategory(data: any) {
  const { id } = data

  return request({
    url: `/category/${id}`,
    method: 'patch',
    data,
  })
}

export function createCategory(data: { name: string }) {
  return request({
    url: '/category',
    method: 'post',
    data,
  })
}

export function deleteCategory(data: any) {
  return request({
    url: `/category/${data.id}`,
    method: 'delete',
  })
}
