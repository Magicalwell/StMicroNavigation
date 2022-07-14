import { loginApi, getUserInfo } from '../../api/user'
export default {
  namespaced: true,
  state: {
    userInfo: null,
    // token
    token: undefined,
    // 角色列表
    roleList: [],
    // 字典
    dictItems: [],
    // session过期时间
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // 登录返回信息
    loginInfo: null
  },
  mutations: {
    SET_TOKEN(state, info) {
      state.token = info || '' // for null or undefined value
      //   setAuthCache(TOKEN_KEY, info)
    }
  },
  getters: {
    getToken(state): string {
      return state.token
    }
  },
  actions: {
    async login({ commit, dispatch }, params) {
      try {
        const { goHome = true, ...loginParams } = params
        const { data } = await loginApi(loginParams)
        const { token } = data
        // save token
        commit('SET_TOKEN', token)
        return dispatch('afterLoginAction', { goHome, data })
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(
      { getters, dispatch },
      goHome?: boolean,
      data?: any
    ) {
      console.log(goHome, data)

      if (!getters.getToken) return null
      // 获取用户信息
      const userInfo = await dispatch('getUserInfoAction')
      console.log(userInfo, 'userInfouserInfo')

      //   const sessionTimeout = this.sessionTimeout
      //   if (sessionTimeout) {
      //     this.setSessionTimeout(false)
      //   } else {
      //     const permissionStore = usePermissionStore()
      //     if (!permissionStore.isDynamicAddedRoute) {
      //       const routes = await permissionStore.buildRoutesAction()
      //       routes.forEach((route) => {
      //         router.addRoute(route as unknown as RouteRecordRaw)
      //       })
      //       router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
      //       permissionStore.setDynamicAddedRoute(true)
      //     }
      //     await this.setLoginInfo({ ...data, isLogin: true })
      //     localStorage.setItem(
      //       JDragConfigEnum.DRAG_BASE_URL,
      //       useGlobSetting().domainUrl
      //     )
      //     goHome &&
      //       (await router.replace(
      //         (userInfo && userInfo.homePath) || PageEnum.BASE_HOME
      //       ))
      //   }
      return data
    },
    async getUserInfoAction({ getters }) {
      if (!getters.getToken) {
        return null
      }
      const { userInfo, sysAllDictItems } = await getUserInfo()
      if (userInfo) {
        const { roles = [] } = userInfo
        if (Array.isArray(roles)) {
          const roleList = roles.map((item) => item.value)
          //   this.setRoleList(roleList)
        } else {
          userInfo.roles = []
          //   this.setRoleList([])
        }
        // this.setUserInfo(userInfo)
      }
      if (sysAllDictItems) {
        // this.setAllDictItems(sysAllDictItems)
      }
      return userInfo
    }
  }
}
