export default {
  namespaced: true,
  state: {
    canvasModel: 'none', // 当前canvas是否处于绘画模式
    saveFlag: {
      // 导出图片的类型和触发器
      saveType: null,
      saveStatus: false
    },
    addImageData: {
      // 图片数据，后续需要改成数组
      data: '',
      flag: false
    },
    canvasStyleData: {
      // 画布数据
      planerWidth: 595,
      planerHeight: 842
    },
    rightMenu: {
      menuTop: 0, // 右击菜单定位数据
      menuLeft: 0,
      menuShow: false
    },
    canvasEvent: {
      // 右击菜单选中的类型
      type: null
    },
    toolBox: {
      // 工具栏目前选中的工具类型
      currentType: ''
    },
    layoutContainer: [], // 图层容器
    layoutId: null, // 当前选中的图层id
    layoutDragData: {}, // 图层管理器拖拽层级后的前后层级位置
    canvasHistory: [], // 历史记录
    canvasForwordHistory: [], // 前进记录
    toolsFeature: {
      'pencil-input': { size: 15 }
    } // 工具属性对象
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
    },
    pushHistory(state, data) {
      if (data) {
        state.canvasHistory.push(data)
      } else {
        state.canvasForwordHistory.push(state.canvasHistory.pop())
      }
      // state.layoutContainer = state.canvasHistory
      // commit.synchronizationLayout()
    },
    popHistory(state, data) {
      if (state.canvasForwordHistory.length > 0) {
        state.canvasHistory.push(state.canvasForwordHistory.pop())
        // state.layoutContainer = state.canvasHistory
      }
    }
  },
  actions: {}
}
