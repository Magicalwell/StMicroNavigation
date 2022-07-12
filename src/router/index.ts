import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { basicRoutes } from './routes'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: basicRoutes as unknown as RouteRecordRaw[]
})

export function setupRouter(app: App) {
  app.use(router)
}
