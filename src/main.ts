import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setCreatStore } from './store'
import microApp from '@micro-zoe/micro-app'
async function bootstrap() {
  microApp.start()
  const app = createApp(App)
  setCreatStore(app)
  setupRouter(app)
  app.mount('#app')
}
bootstrap()
