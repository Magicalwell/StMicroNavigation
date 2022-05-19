export default {
  namespaced: true,
  state: {
    saveFlag: {
      saveType: null,
      saveStatus: false
    },
    addImageData: {
      data: '',
      flag: false
    },
    canvasStyleData: {
      planerWidth: 595,
      planerHeight: 842
    },
    rightMenu: {
      menuTop: 0, // 右击菜单数据
      menuLeft: 0,
      menuShow: false
    }
  },
  mutations: {
    changeSaveFlag(state, data): void {
      state.saveFlag.saveStatus = true
      state.saveFlag.saveType = data
    },
    resetSaveFlag(state): void {
      state.saveFlag = {
        saveType: null,
        saveStatus: false
      }
    },
    changeImgFlag(state, data): void {
      if (data) {
        state.addImageData.data = data
      } else {
        state.addImageData.flag = true
        console.log(state.addImageData.flag)
      }
    },
    resetImgFlag(state): void {
      state.addImageData = {
        data: '',
        flag: false
      }
    },
    updatePlannerSize(state, data) {
      state.planerWidth = data.planerWidth
      state.planerHeight = data.planerHeight
    },
    showContextMenu(state, { top, left }) {
      state.rightMenu.menuShow = true
      state.rightMenu.menuTop = top
      state.rightMenu.menuLeft = left
    },

    hideContextMenu(state) {
      state.rightMenu.menuShow = false
    }
  },
  actions: {}
}
