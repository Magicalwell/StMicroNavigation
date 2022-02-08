import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/router/permission.js";
import mixin from "./mixin";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.mixin(mixin);
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
console.log('微应用child-vue2渲染了')
window.addEventListener("unmount", function () {
  app.$destroy();
  console.log("微应用child-vue2卸载了");
});
