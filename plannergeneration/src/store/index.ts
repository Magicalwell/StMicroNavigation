import { createStore } from 'vuex'

export default createStore({
  state: {
    textContainer: [
      {
        component: 'a-textarea',
        label: '请输入内容',
        value: '这是一段测试的文本',
        id: 1
      },
      {
        component: 'a-textarea',
        label: '请输入内容',
        value: '这是一段测试的文本2',
        id: 2
      },
      {
        component: 'a-textarea',
        label: '请输入内容',
        value: '这是一段测试的文本3',
        id: 3
      }
    ],
    componentsList: [
      {
        component: 'a-textarea',
        label: '请输入内容',
        propValue: '双击编辑文字',
        id: 4
      }
    ],
    defaultComponents: {
      'a-textarea': {
        component: 'a-textarea',
        label: '请输入内容',
        propValue: '双击编辑文字',
        value: '',
        id: 5
      }
    }
  },
  mutations: {
    ADD_NEW_DEFAULT_INPUT (state) {
      state.textContainer.push({
        ...state.defaultComponents['a-textarea'],
        id: state.textContainer.length + 1
      })
    }
  },
  actions: {},
  modules: {}
})
