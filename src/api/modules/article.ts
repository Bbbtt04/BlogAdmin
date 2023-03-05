import request from '@/utils/server'
import { LocationQueryValue } from 'vue-router';

/**
 * @description: 获取文章列表
 */
export function getArticleList(params?: any) {
  return request({
    url: '/article',
    method: 'get',
    params,
  })
}

/* 删除文章 */
export function deleteArticle(id: String) {
  return request({
    url: `/article/${id}`,
    method: 'delete',
  })
}

/* 获取文章详情 */
export function getArticleDetail(id: String | String[] | LocationQueryValue[]) {
  return request({
    url: `/article/${id}`,
    method: 'get',
  })
}

/* 新增文章 */
export function addArticle(data: any) {
  return request({
    url: '/article',
    method: 'post',
    data,
  })
}

/* 编辑文章 */
export function updateArticle(data: any) {
  return request({
    url: `/article/${data.id}`,
    method: 'patch',
    data,
  })
}
