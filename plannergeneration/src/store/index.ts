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
    pageBox: {
      object: 'page', // 固定为page，里面的子组件为children数组
      id: guid(),
      created_time: '2020-03-17T19:10:04.968Z',
      last_edited_time: '2020-03-17T21:49:37.913Z',
      created_by: {
        object: 'user',
        id: guid() // 暂时不做改动
      },
      last_edited_by: {
        object: 'user',
        id: guid() // 暂时不做改动
      },
      // parent: {
      //   // 暂时不清楚该字段的用处，推测是区分page的归属
      //   type: 'database_id',
      //   database_id: '48f8fee9-cd79-4180-bc2f-ec0398253067'
      // },
      archived: false, // 页面是否在编辑
      url: 'https://www.notion.so/Avocado-b55c9c91384d452b81dbd1ef79372b75', // 页面的url
      icon: {
        type: 'emoji',
        emoji: '🎉'
      },
      cover: {
        type: 'external',
        external: {
          url: 'https://website.domain/images/image.png'
        }
      },
      children: [
        {
          object: 'block',
          id: guid(),
          created_time: '12321312312',
          created_by: {
            object: 'user'
            // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
          },
          last_edited_time: '12321312312',
          last_edited_by: {
            object: 'user'
            // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
          },
          has_children: false,
          type: 'paragraph',
          archived: false,
          paragraph: {
            rich_text: 'Lacinato kal2312321312e',
            checked: false,
            color: 'default'
          }
        }
      ]
    }
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
