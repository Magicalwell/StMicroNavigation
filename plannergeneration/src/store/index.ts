import { createStore } from 'vuex'
import { generatePage, generateBlockType } from '../utils/generateBlock'
import { guid } from '../utils'
export default createStore({
  state: {
    textContainer: [
      {
        object: 'block',
        id: '9bc30ad4-9373-46a5-84ab-0a7845ee52e6',
        created_time: '111',
        created_by: {
          object: 'user',
          id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
        },
        last_edited_time: '2021-03-16T16:32:00.000Z',
        last_edited_by: {
          object: 'user',
          id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
        },
        has_children: false,
        type: 'paragraph',
        archived: false,
        paragraph: {
          rich_text: 'Lacinato kale',
          checked: false,
          color: 'default'
        }
      },
      {
        object: 'block',
        id: '9bc30ad4-9373-46a5-84ab-0a7845ee52e6',
        created_time: '2021-03-16T16:31:00.000Z',
        created_by: {
          object: 'user',
          id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
        },
        last_edited_time: '2021-03-16T16:32:00.000Z',
        last_edited_by: {
          object: 'user',
          id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
        },
        has_children: false,
        type: 'paragraph',
        archived: false,
        paragraph: {
          // rich_text: [
          //   {
          //     type: 'text',
          //     text: {
          //       content: 'Lacinato kale',
          //       link: null
          //     },
          //     annotations: {
          //       bold: false,
          //       italic: false,
          //       strikethrough: false,
          //       underline: false,
          //       code: false,
          //       color: 'default'
          //     },
          //     plain_text: 'Lacinato kale',
          //     href: null
          //   }
          // ],
          rich_text: 'Lacinato kale',
          checked: false,
          color: 'default'
        }
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
      'st-collapse': {
        component: 'st-collapse',
        placeholder: '请输入内容',
        propValue: { ghost: true },
        value: '',
        title: '折叠面板',
        children: [
          {
            component: 'st-collapse-panel',
            propValue: {},
            value: '',
            slot: {
              type: 'header',
              component: 'a-textarea',
              placeholder: '请输入内容',
              propValue: { 'auto-size': true },
              value: '',
              title: '输入框'
            },
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
                component: 'st-collapse',
                propValue: { ghost: true },
                value: '',
                title: '折叠面板',
                children: [
                  {
                    component: 'st-collapse-panel',
                    propValue: {},
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
            component: 'st-collapse-panel',
            placeholder: '请输入内容',
            propValue: {},
            value: '',
            title: '折叠面板'
          }
        ]
      }
    },
    dargActiveItem: {},
    blockItem: {
      object: 'block',
      id: '9bc30ad4-9373-46a5-84ab-0a7845ee52e6',
      created_time: '2021-03-16T16:31:00.000Z',
      created_by: {
        object: 'user',
        id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
      },
      last_edited_time: '2021-03-16T16:32:00.000Z',
      last_edited_by: {
        object: 'user',
        id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
      },
      has_children: false,
      type: 'to_do',
      archived: false,
      to_do: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Lacinato kale',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Lacinato kale',
            href: null
          }
        ],
        checked: false,
        color: 'default'
      }
    },
    userGlobalOptions: {
      paragraph: {}
    },
    pageBox: {}
  },
  mutations: {
    ADD_NEW_DEFAULT_INPUT(state: any, data) {
      if (!data) {
        state.pageBox.children.push({
          object: 'block',
          id: guid(),
          created_time: new Date().valueOf(),
          created_by: {
            object: 'user',
            id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
          },
          last_edited_time: new Date().valueOf(),
          last_edited_by: {
            object: 'user',
            id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
          },
          has_children: false,
          type: 'paragraph',
          archived: false,
          paragraph: {
            rich_text: '',
            checked: false,
            color: 'default'
          }
        })
      } else {
        state.pageBox.children.push(generateBlockType(data))
      }
    },
    ADD_DARGACTIVEITEM(state: any, val: any) {
      state.dargActiveItem = val
    },
    SET_DEFAULT_PAGE(state) {
      state.pageBox = generatePage()
    }
  },
  getters: {
    returnComponentType: (state: any) => {
      return state.dargActiveItem
    },
    addComponentInfo: (state: any) => {
      return state.defaultComponents
    },
    componentsValueList: (state: any) => {
      return Object.values(state.defaultComponents)
    }
  },
  actions: {},
  modules: {}
})
