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
      component: () => import('../../views/Home.vue')
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
    },
    {
      path: '/easePageCreator/:*',
      name: 'ease-page-creator',
      component: () => import('../../views/jumpLink/toEpc.vue')
    }
  ]
}
const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  redirect: '/home',
  hidden: true
}
const LoginRoute = {
  path: '/login',
  name: 'login',
  component: () => import('../../views/login/index.vue')
}
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...tempObjList,
  //   ...mainOutRoutes,
  //   REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
