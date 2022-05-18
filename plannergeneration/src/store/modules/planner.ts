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
    }
  },
  actions: {}
}
