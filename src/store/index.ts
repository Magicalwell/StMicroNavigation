import { createStore, Module } from 'vuex'
import type { App } from 'vue'
import user from './modules/user'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { user }
})

export function setCreatStore(app: App) {
  app.use(store)
}
export { store }
