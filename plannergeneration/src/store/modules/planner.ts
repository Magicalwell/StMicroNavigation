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
    },
    canvasEvent: {
      type: null
    },
    toolBox: {
      currentType: ''
    },
    layoutContainer: [],
    layoutId: null,
    layoutDragData: {}
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
    },
    emitCanvasEvent(state, data) {
      state.canvasEvent.type = data
    },
    resetCanvasEvent(state) {
      state.canvasEvent.type = null
    },
    changeToolCurrentType(state, data) {
      state.toolBox.currentType = data
    },
    changeLayoutContainerArr(state, data) {
      state.layoutContainer = data
    },
    addLayoutContainerArr(state, data) {
      data.id = state.layoutContainer.length
      data.layoutName = `图层${state.layoutContainer.length}`
      state.layoutContainer.unshift(data)
      console.log(state.layoutContainer)

      // state.layoutContainer.push({
      //   ...data,
      //   id: state.layoutContainer.length,
      //   layoutName: `图层${state.layoutContainer.length}`
      // })
      // tempList.forEach((element, index) => {
      //   element.id = index
      //   element.layoutName = `图层${index}`
      // })
    },
    changeLayoutId(state, data) {
      state.layoutId = data
    },
    layoutDrag(state, data) {
      state.layoutDragData = data
    },
    removeDragList(state, data) {
      state.layoutContainer = state.layoutContainer.filter(
        (item) => item.id !== data
      )
    }
  },
  actions: {}
}
