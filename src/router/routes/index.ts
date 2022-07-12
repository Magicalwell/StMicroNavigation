import type { AppRouteModule } from '@/router/types'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '../../views/layout/index.vue'
const routeModuleList: AppRouteModule[] = []
const tempObjList: Array<RouteRecordRaw> = []
export const asyncRoutesList = [...routeModuleList]
export const RootRoute = {
  path: '/',
  name: 'layout',
  redirect: '/home',
  component: Layout,
  meta: { title: '首页' },
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../../views/Home.vue'),
      meta: { title: '主控台', fixed: true, canDelete: false, showTag: true }
    },
    {
      path: '/blogcontrol/:*',
      name: 'blog-control',
      component: () => import('../../views/jumpLink/toBlogControl.vue')
    },

    {
      path: '/plannergeneration/:*',
      name: 'planner-generation',
      component: () => import('../../views/jumpLink/toPlannerGeneration.vue')
    },
    {
      path: '/heartofstone/:*',
      name: 'heart-of-stone',
      component: () => import('../../views/jumpLink/toHeartOfStone.vue')
    }
  ]
}
const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  redirect: '/home',
  hidden: true
}
export const basicRoutes = [
  //   LoginRoute,
  RootRoute,
  ...tempObjList,
  //   ...mainOutRoutes,
  //   REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
