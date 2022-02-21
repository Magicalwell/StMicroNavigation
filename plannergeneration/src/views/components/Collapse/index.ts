/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 20:26:04
 * @LastEditors: 卜启缘
 * @Description: 表单项类型 - 复选框
 * @FilePath: \vite-vue3-lowcode\src\packages\base-widgets\checkbox\index.tsx
 */
export default {
  key: 'checkbox',
  moduleName: 'baseWidgets',
  label: '表单项类型 - 复选框',
  render: () => {
    console.log(111)
  },
  props: {},
  events: [
    { label: '当绑定值变化时触发的事件', value: 'change' },
    { label: '点击复选框时触发', value: 'click' }
  ],
  resize: {
    width: true
  },
  model: {
    default: '绑定字段'
  }
}
