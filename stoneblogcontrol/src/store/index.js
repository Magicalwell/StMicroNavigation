import Vue from "vue";
import Vuex from "vuex";
import { login, getUserInfo } from "@/api/login.js";
import { setToken, getToken, removeToken } from "@/utils/index.js";
import * as router from "../router/index.js";
Vue.use(Vuex);
const modulesFiles = require.context("./components", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
export default new Vuex.Store({
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    oplist: [],
    menuList: [],
    routes: [],
    selectOptions: {
      articletTitle: [
        {
          label: "随笔",
          id: 1,
          cantDel: true,
        },
        {
          label: "HTML",
          id: 2,
          cantDel: true,
        },
        {
          label: "Javascript",
          id: 3,
          cantDel: true,
        },
        {
          label: "CSS",
          id: 4,
          cantDel: true,
        },
        {
          label: "Vue",
          id: 5,
          cantDel: true,
        },
      ],
      accountStatus: [
        {
          label: "在线",
          id: 1,
        },
        {
          label: "离线",
          id: 2,
        },
        {
          label: "禁用",
          id: 3,
        },
      ],
    },
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    },
    SET_NAVLIST: (state, data) => {
      state.menuList = data;
    },
    SET_OPLIST: (state, data) => {
      state.oplist = data;
    },
    SET_ROUTES: (state, data) => {
      state.routes = router.routes.concat(data);
    },
    ADD_DOC_SELECT_OPTIONS: (state, data) => {
      state.selectOptions.articletTitle.push({
        label: data,
        id: state.selectOptions.articletTitle.length + 1,
      });
    },
    DEL_DOC_SELECT_OPTIONS: (state, data) => {
      state.selectOptions.articletTitle.splice(data, 1);
    },
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((res) => {
            const { data } = res;
            setToken(data.token);
            commit("SET_TOKEN", data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.token);
        getUserInfo({ token: state.token })
          .then((res) => {
            console.log(res.data.op);
            commit("SET_NAVLIST", res.data.menu);
            commit("SET_OPLIST", res.data.op);
            // console.log(asyncRoutes);
            // router.default.addRoutes(router.asyncRoutes);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    generateRoutes({ commit }) {
      return new Promise((resolve) => {
        let accessedRoutes;
        accessedRoutes = router.asyncRoutes;
        commit("SET_ROUTES", accessedRoutes);
        // if (roles.includes("admin")) {
        //   accessedRoutes = asyncRoutes || [];
        // } else {
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        // }
        // commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    },
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_OPLIST", []);
        commit("SET_ROUTES", []);
        commit("SET_NAVLIST", []);
        removeToken();
        resolve();
      });
    },
    addDocSelectOptions({ commit, state }, data) {
      // console.log(state.selectOptions.articletTitle);
      return new Promise((resolve, reject) => {
        if (
          !state.selectOptions.articletTitle.some((item) => item.label == data)
        ) {
          // console.log("add");
          commit("ADD_DOC_SELECT_OPTIONS", data);
          resolve();
        } else {
          reject();
        }
      });
    },
    delDocSelectOptions({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        if (state.selectOptions.articletTitle[data].cantDel) {
          reject();
        } else {
          commit("DEL_DOC_SELECT_OPTIONS", data);
          resolve();
        }
      });
    },
  },
  getters: {
    opList: (state) => {
      return state.oplist;
    },
    menuList: (state) => {
      return state.menuList;
    },
    routes: (state) => {
      return state.routes;
    },
  },
  modules: modules,
});
