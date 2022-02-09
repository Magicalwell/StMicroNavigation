import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: layout,
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: '主控台', fixed: true, canDelete: false, showTag: true }
      },
      {
        path: '/app-vue3',
        name: 'app-vue3',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/blogcontrol/:*',
        name: 'blog-control',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/jumpLink/toBlogControl.vue'
          )
      },
      {
        path: '/plannergeneration/:*',
        name: 'planner-generation',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/jumpLink/toPlannerGeneration.vue'
          )
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
