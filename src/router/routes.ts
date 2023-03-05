import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: '注册',
      hidden: true,
    },
  },
]
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * @param meta.alwaysShow 是否显示跟路由
 * @param hidden 是否在菜单显示
 * */

const Layout = () => import('@/layout/index.vue')
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'House',
      sort: 1,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '控制台' },
      },
    ],
  },
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'Memo',
    },
    children: [
      {
        path: '/article/list',
        name: 'ArticleList',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章列表',
        },
      },
      {
        path: '/article/action',
        name: 'ArticleAction',
        component: () => import('@/views/article/action/action.vue'),
        meta: {
          title: '文章编辑',
          hidden: true,
          keepAlive:true
        },
      },
      {
        path: '/tag/list',
        name: 'TagList',
        component: () => import('@/views/article/tag/tag.vue'),
        meta: {
          title: '标签列表',
          keepAlive:true
        },
      },
      {
        path: '/category/list',
        name: 'CategoryList',
        component: () => import('@/views/article/category/category.vue'),
        meta: {
          title: '分类列表',
          keepAlive:true
        },
      },
    ],
  },
  {
    path: '/links',
    component: Layout,
    meta: {
      title: '友链管理',
      icon: 'Link',
      keepAlive:true
    },
    children: [
      {
        path: '/links',
        name: 'LinksList',
        component: () => import('@/views/links/index.vue'),
      },
    ],
  },
  {
    path: '/logs',
    component: Layout,
    meta: {
      title: '日志管理',
      icon: 'Calendar',
      keepAlive:true
    },
    children: [
      {
        path: '/logs',
        name: 'LogsList',
        component: () => import('@/views/logs/index.vue'),
      },
    ],
  },
  {
    path: '/comments',
    component: Layout,
    meta: {
      title: '评论管理',
      icon: 'Comment',
      keepAlive:true
    },
    children: [
      {
        path: '/comments',
        name: 'commentList',
        component: () => import('@/views/comments/index.vue'),
      },
    ],
  },
  {
    path: '/page',
    component: Layout,
    meta: {
      title: '页面管理',
      icon: 'Tickets',
      keepAlive:true
    },
    children: [
      {
        path: '/page',
        name: 'pageList',
        component: () => import('@/views/page/index.vue'),
      },
    ],
  },
  {
    path: '/page/action',
    component: Layout,
    meta: {
      title: '页面编辑',
      icon: 'Tickets',
      hidden: true,
      keepAlive:true
    },
    children: [
      {
        path: '/page/action',
        name: 'pageAction',
        component: () => import('@/views/page/action.vue'),
      },
    ],
  },
]
