import { createStore } from 'vuex'
import type { App } from 'vue'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})

export function setCreatStore(app: App) {
  app.use(store)
}
export default store
