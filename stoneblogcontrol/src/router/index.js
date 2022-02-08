import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import layout from "@/views/layout";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: layout,
    meta: { title: "首页" },
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
        meta: { title: "主控台", fixed: true, canDelete: false, showTag: true },
      },
      {
        path: "/globelicon",
        name: "globelicon",
        component: () =>
          import("@/views/layout/components/workspace/globelIcon.vue"),
        meta: {
          title: "全局功能视图",
          fixed: true,
          canDelete: false,
          showTag: true,
        },
      },
    ],
  },
  { path: "/404", component: () => import("@/views/errorPage/error404.vue") },
];
export const asyncRoutes = [
  {
    path: "/document",
    name: "document",
    component: layout,
    redirect: "/document/manageDoc",
    meta: { title: "文件管理", icon: "el-icon-folder" },
    children: [
      {
        path: "/document/manageDoc",
        name: "manage",
        component: () => import("@/views/document/index.vue"),
        meta: { title: "管理文档", canDelete: true, showTag: true },
      },
      {
        path: "/document/addDoc",
        name: "addDoc",
        component: () => import("@/views/document/add/index.vue"),
        meta: { title: "新增文档", canDelete: true, showTag: true },
      },
    ],
  },
  {
    path: "/messageboard",
    name: "messageboard",
    component: layout,
    redirect: "/messageboard/manageMsg",
    meta: { title: "留言板", icon: "el-icon-document" },
    children: [
      {
        path: "/messageboard/manageMsg",
        name: "manageMsg",
        component: () => import("@/views/messageboard/messageboard.vue"),
        meta: { title: "留言板管理", canDelete: true, showTag: true },
      },
    ],
  },
  {
    path: "/project",
    name: "project",
    component: layout,
    redirect: "/project/projectshow",
    meta: { title: "项目管理", icon: "el-icon-document" },
    children: [
      {
        path: "/project/projectshow",
        name: "projectshow",
        component: () => import("@/views/project/showproject.vue"),
        meta: { title: "项目展示", canDelete: true, showTag: true },
      },
      {
        path: "/project/projectcontrol",
        name: "projectcontrol",
        component: () => import("@/views/project/projectcontrol/control.vue"),
        meta: { title: "项目管理", canDelete: true, showTag: true },
      },
    ],
  },
  {
    path: "/power",
    name: "power",
    component: layout,
    redirect: "/power/powerrole",
    meta: { title: "权限管理", icon: "el-icon-document" },
    children: [
      {
        path: "/power/powerrole",
        name: "powerrole",
        component: () => import("@/views/power/powerRole/role.vue"),
        meta: { title: "账号管理", canDelete: true, showTag: true },
      },
      {
        path: "/power/powerrole/details",
        name: "powerrole/details",
        component: () =>
          import("@/views/power/powerRole/components/details.vue"),
        meta: { title: "权限详情", canDelete: true, showTag: false },
      },
      {
        path: "/power/powerpage",
        name: "powerpage",
        component: () => import("@/views/power/powerPage/page.vue"),
        meta: { title: "角色管理", canDelete: true, showTag: true },
      },
      {
        path: "/power/powerrouter",
        name: "powerrouter",
        component: () => import("@/views/power/powerRouter/router.vue"),
        meta: { title: "路由管理", canDelete: true, showTag: true },
      },
    ],
  },
  {
    path: "/configuration",
    name: "configuration",
    component: layout,
    redirect: "/configuration/userconfig",
    meta: { title: "配置", icon: "el-icon-document" },
    children: [
      {
        path: "/configuration/userconfig",
        name: "userconfig",
        component: () => import("@/views/config/userconfig/userconfig.vue"),
        meta: { title: "个人中心", canDelete: true, showTag: true },
      },
    ],
  },
  {
    path: "/components",
    name: "components",
    component: layout,
    redirect: "/components/drag",
    meta: { title: "组件", icon: "el-icon-document" },
    children: [
      {
        path: "/components/drag",
        name: "drag",
        component: () => import("@/views/components/drag/drag.vue"),
        meta: { title: "自由拖拽", canDelete: true, showTag: true },
      },
      {
        path: "/components/timeline",
        name: "timeline",
        component: () => import("@/views/components/timeline/timeline.vue"),
        meta: { title: "自定义时间线", canDelete: true, showTag: true },
      },
      {
        path: "/components/todolist",
        name: "todolist",
        component: () => import("@/views/components/todolist/todolist.vue"),
        meta: { title: "待办清单", canDelete: true, showTag: true },
      },
      {
        path: "/components/workwave",
        name: "workwave",
        component: () => import("@/views/components/workwave/workwave.vue"),
        meta: { title: "待办清单", canDelete: true, showTag: true },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new VueRouter({
    routes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
