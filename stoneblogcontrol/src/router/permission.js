import router from "./index.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/index.js";
import store from "../store/index.js";
const whiteList = ["/login", "/auth-redirect"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = getToken();
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const navlist =
        store.getters.menuList && store.getters.menuList.length > 0;
      if (navlist) {
        next();
      } else {
        try {
          const { data } = await store.dispatch("getUserInfo");
          const accessRoutes = await store.dispatch("generateRoutes");
          console.log(data);
          // if (data.op === 'all') {}
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("resetToken");
          next("/login");
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
