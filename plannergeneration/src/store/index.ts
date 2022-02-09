import { createStore } from 'vuex'

export default createStore({
  state: {
    textContainer: [
      {
        component: 'a-textarea',
        label: '请输入内容',
        Value: '这是一段测试的文本'
      }
    ],
    componentsList: [
      {
        component: 'a-textarea',
        label: '请输入内容',
        propValue: '双击编辑文字'
      }
    ],
    defaultComponents: {
      'a-textarea': {
        component: 'a-textarea',
        label: '请输入内容',
        propValue: '双击编辑文字'
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
