import { createStore } from 'vuex'

export default createStore({
  state: {
    textContainer: [
      {
        component: 'a-textarea',
        placeholder: '请输入内容',
        value: '这是一段测试的文本',
        propValue: { 'auto-size': true },
        id: 1
      },
      {
        component: 'a-textarea',
        placeholder: '请输入内容',
        value: '这是一段测试的文本2',
        propValue: { 'auto-size': true },
        id: 2
      },
      {
        component: 'a-textarea',
        placeholder: '请输入内容',
        value: '这是一段测试的文本3',
        propValue: { 'auto-size': true },
        id: 3
      }
    ],
    defaultComponents: {
      'a-textarea': {
        component: 'a-textarea',
        placeholder: '请输入内容',
        propValue: { 'auto-size': true },
        value: '',
        title: '输入框'
      },
      'a-collapse': {
        component: 'a-collapse',
        placeholder: '请输入内容',
        propValue: { bordered: false },
        value: '',
        title: '折叠面板',
        children: [
          {
            component: 'a-collapse-panel',
            placeholder: '请输入内容',
            propValue: { bordered: false },
            value: '',
            title: '折叠面板',
            children: [
              {
                component: 'a-textarea',
                placeholder: '请输入内容',
                propValue: { 'auto-size': true },
                value: '',
                title: '输入框'
              },
              {
                component: 'a-textarea',
                placeholder: '请输入内容',
                propValue: { 'auto-size': true },
                value: '',
                title: '输入框'
              },
              {
                component: 'a-collapse',
                placeholder: '请输入内容',
                propValue: { bordered: false },
                value: '',
                title: '折叠面板',
                children: [
                  {
                    component: 'a-collapse-panel',
                    placeholder: '请输入内容',
                    propValue: { 'auto-size': true },
                    value: '',
                    title: '输入框',
                    children: [
                      {
                        component: 'a-textarea',
                        placeholder: '请输入内容',
                        propValue: { 'auto-size': true },
                        value: '',
                        title: '输入框'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            component: 'a-collapse-panel',
            placeholder: '请输入内容',
            propValue: { bordered: false },
            value: '',
            title: '折叠面板'
          }
        ]
      }
    },
    dargActiveItem: { type: '' }
  },
  mutations: {
    ADD_NEW_DEFAULT_INPUT(state) {
      state.textContainer.push({
        ...state.defaultComponents['a-textarea'],
        id: state.textContainer.length + 1
      })
    },
    ADD_DARGACTIVEITEM(state, val) {
      console.log(val)
      state.dargActiveItem.type = val.type
      console.log(state.dargActiveItem)
    }
  },
  getters: {
    returnComponentType: (state) => {
      return state.dargActiveItem
    },
    addComponentInfo: (state) => {
      return state.defaultComponents
    },
    componentsValueList: (state) => {
      return Object.values(state.defaultComponents)
    }
  },
  actions: {},
  modules: {}
})
